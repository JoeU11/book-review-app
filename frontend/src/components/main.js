import Book from "./book.js"
import { useRef, useState } from 'react';

export default function Main(props) {
  const [filteredBooks, setFilteredBooks] = useState(props.books)
  const searchTitle = useRef('');

  const filterBooks = () => {
    var searchTerm = searchTitle.current.value
    if (searchTerm) {
      setFilteredBooks(props.books.filter(book => book.title.toLowerCase() === searchTerm.toLowerCase()))
    } else {
      setFilteredBooks(props.books)
    }
  }

  return (
    <div id="main">
      <div class="search-container">
        <input id="title-search" ref={searchTitle} placeholder="Enter a title" />
        <button class="filter-button" onClick={filterBooks}>Click here to filter results</button>
      </div>
      <div class="book-list">
        {filteredBooks.map((book) => (
          <Book {... { book }} />
        ))}
      </div>
    </div >
  )
}