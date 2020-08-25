// Book contructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



// UI Contructors 
function UI(){};

// Add Book to List
UI.prototype.addbookToList = function(book){
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

// show Alert 
UI.prototype.showAlert = function(message, className){
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

// Delte Book 
UI.prototype.delteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// UI Clear Feilds
UI.prototype.clearFeilds = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

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

  ui.delteBook(e.target);

  // Show Message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})
