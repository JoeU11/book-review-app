import { useRef } from "react";

export default function Modal(props) {
  const name = useRef('');
  const password = useRef('');

  const handleLogin = () => {
    props.login(name.current.value, password.current.value)
  }

  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          <h3>Account Information</h3>
          <div class="login-info-row">
            <label>Username</label>
            <input class="login-field" id="name" ref={name} type="text" />
          </div>
          <div class="login-info-row">
            <label>Password</label>
            <input class="login-field" id="password" ref={password} type="password" />
          </div>
          <button onClick={handleLogin}>Log In</button>
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}