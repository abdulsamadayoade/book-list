// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI() {}

// ADD BOOK TO LIST
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    // CREATE TR ELEMENT
    const row = document.createElement('tr');

    // INSERT COLUMNS
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// CLEAR FIELDS
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// EVENT LISTENERS
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function(e) {
    // GET FORM VALUES
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    // INSTANTIATE A BOOK 
    const book = new Book(title, author, isbn);

    // INSTANTIATE UI
    const ui = new UI();

    // ADD BOOK TO LIST
    ui.addBookToList(book);

    // CLEAR FIELDS
    ui.clearFields();


    e.preventDefault();
});