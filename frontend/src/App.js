import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar.js"
import Main from "./components/main.js"

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

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

  useEffect(getBooks, [])

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
