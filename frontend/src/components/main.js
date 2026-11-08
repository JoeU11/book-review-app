import Book from "./book.js"

export default function Main(props) {
  console.log(props)

  return (
    <div id="main">
      <p>Welcome to main!</p>
      <div class="book-list">
        {props.books.map((book) => (
          <Book {... { book }} />
        ))}
      </div>
    </div>
  )
}