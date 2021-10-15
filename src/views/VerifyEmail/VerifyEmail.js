import "./VerifyEmail.css";
import { withRouter } from "react-router";
import { useEffect } from "react";
import apiClient from "../../api-client";


function VerifyEmail(props) {

    const verifyEmail = async () => {
        const token = props.match.params.token;
    
        try {
          let result = await apiClient.get(`/emails/confirm/${token}`);
    
        } catch (error) {
          console.log("error >> ", error.response);
          props.history.push("/")
        }
      };
      useEffect( () => {
        verifyEmail()
      }, []);

  return (
    <div className="container my-5 c-placeholder">
      <div className="c-placeholder-header">
        Your email was successfully verified
      </div>
      <p>
        <span onClick={() => {props.history.push("/")}} className="c-placeholder-text">
          Go to Dashboard
        </span>
      </p>
    </div>
  );
}

export default withRouter(VerifyEmail);
