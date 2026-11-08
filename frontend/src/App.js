import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar.js"
import Main from "./components/main.js"
import LoginModal from "./components/loginModal.js"

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const getBooks = () => {
    console.log("getting books")
    axios.get("http://localhost:3001/books").then(response => {
      console.log(response.data)
      setBooks(response.data)
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleClose = () => {
    setShowLoginModal(false)
  }

  const login = () => {
    console.log("logging in")
    setShowLoginModal(false)
    setLoggedIn(true)
  }

  const handleLogOut = () => {
    setLoggedIn(false)
  }

  useEffect(getBooks, [])

  if (loading) return (
    <p>loading books</p>
  )
  else return (
    <div className="App">
      <Navbar {...{ setShowLoginModal, loggedIn, handleLogOut }} />
      <LoginModal show={showLoginModal} onClose={handleClose} login={login} />
      <Router>
        <Routes>
          <Route path="/" element={<Main {...{ books }} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
