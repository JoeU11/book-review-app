export default function Navbar() {
  return (
    <nav>
      <h2 id="nav-title">BookRater</h2>
      <div id="nav-link-container">
        <a className="nav-link" href="/">Home</a>
        <a className="nav-link" href="/login">login</a>
        <a className="nav-link" href="/logout">logout</a>
      </div>
    </nav>
  )
}