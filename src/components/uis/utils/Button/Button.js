function Button(props) {
  return (
    <input
      type="submit"
      disabled={!props.showError}
      className="c-btn"
      value={props.children}
    />
  );
}

export default Button;
