import { withRouter } from "react-router";
import { useEffect } from "react";
import apiClient from "../../api-client";

function Token(props) {
  const authenticateUser = async () => {
    const token = props.match.params.token;

    try {
      let result = await apiClient.get(`/login/tokens/${token}`);

        localStorage.setItem("Gain-Token", result.data.data.token);

        setTimeout(() => {
          props.history.push("/auth/dashboard");
        }, 0);
    } catch (error) {
      console.log("error >> ", error.response);
      props.history.push("/signin");
    }
  };
  useEffect( () => {
    authenticateUser()
  }, []);
  return <h6>verifying...</h6>;
}

export default withRouter(Token);
