export default function Book(props) {

  return (
    <div class="book-card">
      <div class="book-cover">
        <img src={props.book.image_url} />
      </div>
      <div class="book-title">
        <h2>{props.book.title}, {props.book.name}</h2>
      </div>
      <div class="book-rating">
        5/5
      </div>
    </div>
  )
}