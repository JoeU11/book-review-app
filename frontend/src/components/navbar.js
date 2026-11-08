export default function Navbar(props) {
  return (
    <nav>
      <h2 id="nav-title">BookRater</h2>
      <div id="nav-link-container">
        {/* <a className="nav-link" href="/">Home</a> */}
        {props.loggedIn || <button className="nav-link" onClick={props.setShowLoginModal}>login</button>}
        {props.loggedIn && <button className="nav-link" onClick={props.handleLogOut}>logout</button>}
      </div>
    </nav>
  )
}