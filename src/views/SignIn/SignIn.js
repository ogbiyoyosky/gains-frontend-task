import React, { useState } from "react";
import "./SignIn.css";
import Avatar from "../../assets/img/avatar.svg";
import AuthBackground from "../../components/uis/AuthBackground/AuthBackground";
import { Link } from "react-router-dom";
import Button from "../../components/uis/utils/Button/Button";
import { Redirect, withRouter } from "react-router";
import apiClient from "../../api-client";

function SignIn(props) {
  const [loginStyle, setLoginStyle] = useState("credentials");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showErrorMsg, setshowErrorMsg] = useState("");
  const [showSuccessMsg, setshowSuccessMsg] = useState("");
  const [showError] = useState(true);

  const handleSwitchLoginStyle = () => {
    setLoginStyle(loginStyle === "credentials" ? "emails" : "credentials");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { history } = props;

    setshowSuccessMsg("");
    setshowErrorMsg("");
    setshowErrorMsg("");

    try {
      let login_data = {};

      if (loginStyle === "credentials") {
        login_data = {
          userName: username,
          password,
        };
      } else {
        login_data = {
          email,
        };
      }
      let result = await apiClient.post("/login", login_data);

      setshowSuccessMsg(result.data.message);
      setUsername("");
      setPassword("");
      setEmail("");


      if (loginStyle === "credentials") {
        localStorage.setItem("Gain-Token", result.data.data.token);

        setTimeout(() => {
          history.push("/auth/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log("error >> ", error.response);
      setshowErrorMsg(error.response.data.message);
    }
  };

  let login_content = null;

  if (loginStyle === "credentials") {
    login_content = (
      <>
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
      </>
    );
  } else {
    login_content = (
      <div className="input-div one">
        <div className="i">
          <i className="fal fa-envelope"></i>
        </div>
        <div className="div">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input"
            placeholder="Email"
          />
        </div>
      </div>
    );
  }

  return localStorage.getItem("Gain-Token") ? (
    <Redirect to="/" />
  ) : (
    <>
      <AuthBackground>
        <form onSubmit={handleLoginSubmit}>
          {showErrorMsg && (
            <div className="alert alert-danger">{showErrorMsg}</div>
          )}
          {showSuccessMsg && (
            <div className="alert alert-success">{showSuccessMsg}</div>
          )}
          <img src={Avatar} alt="alt-img" />
          <h3 className="title mb-4">Welcome Back!</h3>
          {login_content}
          <span className="switch-login-style" onClick={handleSwitchLoginStyle}>
            {loginStyle === "credentials" ? "Use Email" : "Use Credentials"}{" "}
            Instead
          </span>
          <Button showError={showError}>Login</Button>
          <div className="">
            Don't have an account
            <Link to="/signup" className="d-inline-block pl-2">
              signup
            </Link>
          </div>
        </form>
      </AuthBackground>
    </>
  );
}

export default withRouter(SignIn);
