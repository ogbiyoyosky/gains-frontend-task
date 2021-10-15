import EmailList from "../../components/dashboard/EmailList/EmailList";

import React, { useState, useEffect } from "react";
import AddEmail from "../../components/dashboard/AddEmail/AddEmail";
import apiClient from "../../api-client";

function Dashboard(props) {
  const [listEmails, setListEmails] = useState([]);
  const [listActiveEmails, setListActiveEmails] = useState([]);
  const [listInActiveEmails, setListInActiveEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [showError] = useState(true);
  const [showErrorMsg, setshowErrorMsg] = useState("");
  const [showSuccessMsg, setshowSuccessMsg] = useState("");
  const [userVerified, setUserverified] = useState(false);

  useEffect(() => {
    fetchAllEmails();
    fetchAllEmails("inactive");
    fetchAllEmails("active");
  }, []);

  const fetchAllEmails = async (param = "") => {
    try {
      let result = await apiClient.get(`/emails?query=${param}`);

      if (param === "active") {
        setListActiveEmails(result.data.data);
      } else if (param === "inactive") {
        setListInActiveEmails(result.data.data);
      } else {
        setListEmails(result?.data?.data);
        setUserverified(result?.data?.data[0]?.user?.isVerifed);
      }

    } catch (error) {
      console.log("error >> ", error.response);
    }
  };

  const deleteItem = async (uuid) => {

    try {
      await apiClient.delete(`/emails/${uuid}`);

      setshowSuccessMsg(`email successfully deleted`);
      setNewEmail("");

      fetchAllEmails();
      fetchAllEmails("inactive");
      fetchAllEmails("active");
    } catch (error) {
      console.log("error >> ", error.response);
      setshowErrorMsg(error.response.data.message);
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    setshowSuccessMsg("");
    setshowErrorMsg("");

    try {
      let result = await apiClient.post("/add-email", {
        email: newEmail,
      });

      setshowSuccessMsg(result.data.message);
      setNewEmail("");

      fetchAllEmails();
      fetchAllEmails("inactive");
      fetchAllEmails("active");
    } catch (error) {
      console.log("error >> ", error.response);
      setshowErrorMsg(
        error.response.data.errors && error.response.data.errors[0]
          ? error.response.data.errors[0].message
          : error.response.data.message
      );
    }
  };
  const handleChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };

  return (
    <div className="Dashboard container my-5">
      {showSuccessMsg && (
        <div className="alert alert-success mb-4">{showSuccessMsg}</div>
      )}
      {showErrorMsg && (
        <div className="alert alert-danger mb-4">{showErrorMsg}</div>
      )}
      <div className="row">
        <div className="col-7">
          <EmailList
            list_data={listEmails}
            list_active_data={listActiveEmails}
            list_in_active_data={listInActiveEmails}
            deleteItem={(uuid) => deleteItem(uuid)}
          />
        </div>
        <div className="col-5">
          <AddEmail
            addEmail={handleAddEmail}
            changeEmail={handleChangeEmail}
            new_email={newEmail}
            showError={showError}
            userVerified={userVerified}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
