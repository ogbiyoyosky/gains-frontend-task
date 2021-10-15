import React, { useState } from "react";
import AuthBackground from "../../components/uis/AuthBackground/AuthBackground";
import "./SignUp.css";
import Avatar from "../../assets/img/avatar.svg";
import Button from "../../components/uis/utils/Button/Button";
import { Link } from "react-router-dom";
import { Redirect, withRouter } from "react-router";
import apiClient from "../../api-client";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setshowError] = useState(true)
  const [showErrorMsg, setshowErrorMsg] = useState("")
  const [showSuccessMsg, setshowSuccessMsg] = useState("")

  const check_signup_validation = (username, password1, password2) => {
    if (!username || !password1 || !password2) {
      setshowErrorMsg("Complete all field")
      return false
    }
    if (password1 !== password2) {
      setshowErrorMsg("Password Mis-Match")
      return false
    }
    setshowErrorMsg("")
    return true
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setshowSuccessMsg("")
    setshowErrorMsg("")
    const { history } = props;


    const check = check_signup_validation(username, password, confirmPassword)

    if (check) {
      setshowError(false)
    } else {
      return setshowError(true)
    }

    try {
      let result = await apiClient.post("/users", {
        userName: username, password
      });

      setshowSuccessMsg(result.data.message)
      setUsername("")
      setPassword("")
      setConfirmPassword("")

      setTimeout(() => {
        history.push("/signin");
      }, 2000);

    } catch (error) {
      console.log("error >> ", error.response);
      setshowErrorMsg(error.response.data.errors[0].message)
    }

  };

  return (
    localStorage.getItem("Gain-Token") ?
    <Redirect to="/" /> :
    <>
      <AuthBackground showErrorMsg={showErrorMsg}>
        <form onSubmit={handleSignUpSubmit}>
        {showErrorMsg && (
          <div className="alert alert-danger">{showErrorMsg}</div>
        )}
        {showSuccessMsg && (
          <div className="alert alert-success">{showSuccessMsg}</div>
        )}
          <img src={Avatar} alt="alt-img" />
          <h2 className="title">Register</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="input"
                placeholder="username"
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="password"
                className="input"
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="input"
                placeholder="confirm password"
              />
            </div>
          </div>
          <Button showError={showError}>Sign Up</Button>
          <div className="">
            Already have an account
            <Link to="/signin" className="d-inline-block pl-2">
              Login
            </Link>
          </div>
        </form>
      </AuthBackground>
    </>
  );
}

export default withRouter(SignUp);
