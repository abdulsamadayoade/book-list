// BOOK CLASS
class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CLASS
class UI {
    addBookToList(book) {
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

    showAlert(message, className) {
        // CREATE DIV
        const div = document.createElement('div');

        // ADD CLASSES
        div.className = `alert ${className}`;

        // ADD TEXT
        div.appendChild(document.createTextNode(message));

        // GET PARENT
        const container = document.querySelector('.container');

        // GET FORM
        const form = document.querySelector('#book-form');

        // INSERT ALERT
        container.insertBefore(div, form);

        // TIMEOUT AFTER 3 SECONDS
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// LOCAL STORAGE CLASS
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            // ADD BOOK TO UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// EVENT LISTENER FOR ADD BOOK
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

    // VALIDATE UI
    if (title === '' || author === '' || isbn === '') {
        // ERROR ALERT
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // ADD BOOK TO LIST
        ui.addBookToList(book);

        // ADD BOOK TO LOCAL STORAGE
        Store.addBook(book);

        // SUCESS ALERT
        ui.showAlert('Book Added', 'success');

        // CLEAR FIELDS
        ui.clearFields();
    }

    e.preventDefault();
});

// EVENT LISTENER FOR DELETE BOOK
document.getElementById('book-list').addEventListener('click', function(e){
    // INSTANTIATE UI
    const ui = new UI();

    // DELETE BOOK
    ui.deleteBook(e.target);

    // REMOVE FROM LOCAL STORAGE
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // SHOW ALERT
    ui.showAlert('Book Deleted', 'success');


    e.preventDefault();
});