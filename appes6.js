class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI{
  addbookToList(book){
    const list = document.getElementById('book-list');
    // create tr Element
    const row =  document.createElement('tr');
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">X</a></td>`
  
    list.appendChild(row);
  }

  showAlert(message, className){
  // create div 
  const div = document.createElement('div');
  // add className
  div.className = `alert ${className}`
  // Add Text
  div.appendChild(document.createTextNode(message));
  // get parent 
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // Inserting div
  container.insertBefore(div, form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000)
  }

  delteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFeilds(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }  
}

  // local Storage class
  class Store{
    static getBook(){
      let book;
      if(localStorage.getItem('books') === null){
        book = [];
      } else{
        book = JSON.parse(localStorage.getItem('books'));
      }

      return book
    }

    static displayBooks(){
      const books = Store.getBook();

      books.forEach(function(book){
        const ui = new UI();

        // Add book to UI 
        ui.addbookToList(book);
      })

    }

    static addBook(book){
      const books = Store.getBook();

      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
      const books = Store.getBook();
      books.forEach(function(book, index){
        if(book.isbn === isbn){
          books.splice(index,1);
        }
      })
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  // DomLoadeEvent 
  document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listners add book
document.getElementById('book-form').addEventListener('submit', function(e){

  // get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
 
  // instantie book
  const book = new Book(title,author,isbn);

  // Instantiate UI
  const ui = new UI();

  // validate
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all feilds', 'error')
  } else{
    ui.addbookToList(book);

    // add to ls 
    Store.addBook(book)

    // Show success
    ui.showAlert('Book Added', 'success');
  
    // clear feilds
    ui.clearFeilds();

  }

  e.preventDefault();
});

//Event Lisner for delte
document.getElementById('book-list').addEventListener('click',function(e){
  // Intantinate UI
  const ui = new UI();
  console.log(ui);

  ui.delteBook(e.target);

  // remove from ls 
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // Show Message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})
