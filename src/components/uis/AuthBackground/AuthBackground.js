import BG from "../../../assets/img/bg.svg";
import Wave from "../../../assets/img/wave.png";

function AuthBackground(props) {
  return (
    <>
      <img className="wave" src={Wave} alt="alt-img" />
      <div className="c-container">
       
        <div className="img">
          <img src={BG} alt="alt-img" />
        </div>
        
        <div className="login-content">{props.children}</div>
      </div>
    </>
  );
}

export default AuthBackground;
