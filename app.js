// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI() {}

// EVENT LISTENERS
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    

    console.log(title, author, isbn);
    e.preventDefault();
});