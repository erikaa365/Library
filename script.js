let myLibrary = [];

function Book(){

}

function addBookToLibrary(){

}


//Open 'Add book' form when user clicks on 'Add new book' button//
const addBookBtn = document.getElementById('addBook');
const addBookForm = document.getElementById('addBookForm');

addBookBtn.onclick = () => openForm();
function openForm(){
    addBookForm.removeAttribute('style');
    expandable.style.display = 'none';      //Do not show expandable part of form//
}

//Close 'Add book' form//
function closeForm(){
    addBookForm.style.display = 'none';
}
    //Close form when ESC is pressed//
window.onkeydown = function(event){
    if(event.keyCode == 27){
        closeForm();
    }
}

//Show 'About book' and 'Rating' when YES is checked//
const didRead = document.getElementById('didYouRead');
const expandable = document.getElementById('expandable');
const yes_radio = document.getElementById('yes');
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