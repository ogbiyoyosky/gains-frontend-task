import Avatar from "../../../assets/img/avatar.svg";
import Button from "../../uis/utils/Button/Button";
import "./AddEmail.css";

function AddEmail({
  addEmail,
  new_email,
  changeEmail,
  showError,
  userVerified,
}) {
  return (
    <div className="card px-4 py-5 login-content add-email">
      {userVerified ? (
        <span className="verified-span success">verified account</span>
      ) : (
        <span className="verified-span danger">unverified account</span>
      )}
      <form onSubmit={addEmail}>
        <img src={Avatar} alt="alt-img" />
        <h3 className="title mb-4">Add New Email</h3>
        <div className="input-div one">
          <div className="i">
            <i className="fal fa-envelope"></i>
          </div>
          <div className="div">
            {/* <h5>Email</h5> */}
            <input
              type="email"
              className="input"
              onChange={changeEmail}
              value={new_email}
              placeholder="Email"
            />
          </div>
        </div>
        <Button showError={showError}>Add Email</Button>
      </form>
    </div>
  );
}

export default AddEmail;
