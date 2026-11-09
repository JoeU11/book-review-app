export default function Modal(props) {
  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          <h3>Account Information</h3>
          <div class="login-info-row">
            <label>Username</label>
            <input class="login-field" id="name" type="text" />
          </div>
          <div class="login-info-row">
            <label>Password</label>
            <input class="login-field" id="password" type="password" />
          </div>
          <button onClick={props.login}>Log In</button>
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}