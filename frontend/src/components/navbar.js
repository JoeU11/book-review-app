export default function Navbar() {
  return (
    <nav>
      <h2 id="nav-title">Bookrater</h2>
      <div id="nav-link-container">
        <a className="nav-link" href="/">Home</a>
        <a className="nav-link" href="/cards">login</a>
        <a className="nav-link" href="/cards/new">logout</a>
      </div>
    </nav>
  )
}