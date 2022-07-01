
//-------------------------------------FORM----------------------------------//

//----Make Arrays for books----//
let booksToRead = [];
let readBooks = [];

//--Hide 'ask for rating when book is marked as read'--//
let AskForRating = document.getElementById('markRead_askForRating');
AskForRating.style.display = 'none';


//-------------Get data & add new book------------//
const wrapper = document.querySelector('.wrapper');
const form = wrapper.querySelectorAll('.form');
const submitInput = form[0].querySelector('button[type="submit"]');

function getData(e){
    e.preventDefault();

    var formData = new FormData(form[0]);


//--Get data from form
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');

//--Make book object
    function Book(title, author, pages, rating){
        this.title = title;
        this.author = author; 
        this.pages = pages; 
        this.rating = rating; 
    }
    let newBook = new Book(title, author, pages, currentRating);

//--Add new book on list of 'Books to read' / 'Read books'
    if(no_radio.checked){
        booksToRead.push(newBook);
        makeBooksToReadTable();
    }
    else{
        readBooks.push(newBook);
        makeReadBooksTable();
    }


//--close and reset form at the end
    addBookForm.reset();
    addBookForm.style.display = 'none';
}
-
//-----Get data after clicking 'Submit'----//
document.addEventListener('DOMContentLoaded', function(){
    submitInput.addEventListener('click', getData, false);
}, false);


//-----Get rating
const rating = document.getElementById('rating');
let currentRating = 0;

rating.onchange = (e) => changeRating(e.target.value);
rating.onmousemove = (e) => updateRatingValue(e.target.value);


function changeRating(newRating){
    currentRating = newRating;    
    updateRatingValue(newRating);
}

//-----Change rating display
function updateRatingValue(newRating){
    currentRating = newRating;    
    document.getElementById('current_rating').textContent = currentRating + '/10';
}


//----------------------------------TABLES----------------------------------//

//-----------Make tables-----------//
let booksToReadTable = document.getElementById('booksToRead');
let readBooksTable = document.getElementById('readBooks');
const markReadButton = '<input type="button" value="Mark as read" id="markAsReadBtn" onclick="markAsRead(this)">';
const deleteButton = '<input type="button" value="Delete" id="deleteBtn" onclick="deleteRow(this)">';

function makeBooksToReadTable(){
        let currentBooksToRead = booksToRead;

        let book = booksToRead[currentBooksToRead.length-1];
        let row = booksToReadTable.insertRow(currentBooksToRead.length);

        let titleCell = row.insertCell(0);
        let authorCell = row.insertCell(1);
        let pagesCell = row.insertCell(2);
        let markReadCell = row.insertCell(3);
        let deleteCell = row.insertCell(4);

        titleCell.innerHTML = book['title'];
        authorCell.innerHTML = book['author'];
        pagesCell.innerHTML = book['pages'];
        markReadCell.innerHTML = markReadButton;
        deleteCell.innerHTML = deleteButton;
    }


function makeReadBooksTable(){
        let currentReadBooks = readBooks;

        let book = readBooks[currentReadBooks.length-1];
        let row = readBooksTable.insertRow(currentReadBooks.length);

        let titleCell = row.insertCell(0);
        let authorCell = row.insertCell(1);
        let pagesCell = row.insertCell(2);
        let ratingCell = row.insertCell(3);
        let deleteCell = row.insertCell(4);

        titleCell.innerHTML = book['title'];
        authorCell.innerHTML = book['author'];
        pagesCell.innerHTML = book['pages'];
        ratingCell.innerHTML = currentRating + '/10';
        deleteCell.innerHTML = deleteButton;
    }


//------Delete row & that book from Array------//
function deleteRow(o){
    var p = o.parentNode.parentNode;
    let rowIndex = p.rowIndex;
    let tableId = p.parentNode.parentNode.id;

    p.parentNode.removeChild(p);

    //--Check which table is the book in
    if(tableId == 'booksToRead'){
        booksToRead.splice(rowIndex-1, 1);
    }
    else{
        readBooks.splice(rowIndex-1, 1);
    }
}

//------Mark read------//
function markAsRead(o){

    //---Remove row and get it's index
    var p = o.parentNode.parentNode;
    let rowIndex = p.rowIndex;

    p.parentNode.removeChild(p);


    //---Display 'Ask for rating' 
    AskForRating.style.display = 'block'; 

    //---Get and display rating value
    const askRating = document.getElementById('askRating');
    const submit_askRating = document.getElementById('submit_askRating');

   // askRating.onchange = (e) => changeAskRating(e.target.value);
    askRating.onmousemove = (e) => updateAskRatingValue(e.target.value);


    //-----Change rating display
    function updateAskRatingValue(newRating){
        currentRating = newRating;    
        document.getElementById('current_askRating').textContent = currentRating + '/10';
    }
    

    //--Submit rating button (remove book from one list and add to other + make row in other table + remove container)
    submit_askRating.onclick = () => addReadBook();

    function addReadBook(){
        let bookMarkedAsRead = booksToRead[rowIndex-1];

        readBooks.push(bookMarkedAsRead);
        booksToRead.splice(rowIndex-1, 1);
            
        AskForRating.style.display = 'none'; 

        makeReadBooksTable();

        console.log(bookMarkedAsRead);
        
    }
}


//--------MAIN BUTTON FUNCTIONS  ('Add book',  'ESC',  'Form')--------//

//---Open 'Add book' form when user clicks on 'Add new book' button---//
const addBookBtn = document.getElementById('addBook');
const addBookForm = document.getElementById('addBookForm');

addBookBtn.onclick = () => openForm();
function openForm(){
    addBookForm.removeAttribute('style');
    expandable.style.display = 'none';      //--Do not show expandable part of form//
}

//----Close 'Add book' form----//
function closeForm(){
    addBookForm.style.display = 'none';
}
    //---Close form when ESC is pressed---//
window.onkeydown = function(event){
    if(event.keyCode == 27){
        closeForm();
    }
}

//----Show 'About book' and 'Rating' when YES is checked----//
const didRead = document.getElementById('didYouRead');
const expandable = document.getElementById('expandable');
const no_radio = document.getElementById('no')

didRead.onclick = () => expandForm();
function expandForm(){
    if(no_radio.checked){
        expandable.style.display = 'none';
    }
    else{
        expandable.style.display = 'block';
    }
}

