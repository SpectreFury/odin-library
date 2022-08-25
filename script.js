const cardContainer = document.querySelector(".flex-container");
const addBooksBtn = document.querySelector(".btn-add-books");
const exitModalBtn = document.querySelector(".btn-exit");
const form = document.querySelector("form");
const modal = document.querySelector("#modal");
const addToLibraryBtn = document.querySelector("#addToLibrary");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("read");
const removeBtn = document.querySelector(".btn-remove");
const readBtn = document.querySelector(".btn-read");
const anchorTag = document.querySelector("a");

anchorTag.addEventListener("click", (e) => {
  // ABSOLUTELY 0 ZERO WHY THIS IS HAPPENING!

  e.preventDefault();
});

let myLibrary = [
  {
    title: "Harry Potter",
    author: "JK Rowling",
    pages: "500",
    isRead: true,
  },
  {
    title: "Sword Of Destiny",
    author: "Andrzej Sapkowski",
    pages: 384,
    isRead: false,
  },
];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function changeStatus(e) {
  const bookTitle =
    e.target.parentElement.parentElement.childNodes[0].childNodes[0]
      .textContent;

  if (e.target.textContent === "Read") {
    myLibrary.forEach((book) => {
      if (book.title === bookTitle) {
        book.isRead = !book.isRead;
      }
    });
    e.target.textContent = "Not Read";
    e.target.style.backgroundColor = "#ff0000";
  } else {
    // Make library entry to true
    myLibrary.forEach((book) => {
      if (book.title === bookTitle) {
        book.isRead = !book.isRead;
      }
    });
    e.target.textContent = "Read";
    e.target.style.backgroundColor = "#28a745";
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  newBook.display();
  myLibrary.push(newBook);
}

addBooksBtn.addEventListener("click", showModal);

function showModal() {
  modal.classList.add("visible");
}

exitModalBtn.addEventListener("click", removeModal);

function removeModal() {
  modal.classList.remove("visible");
}

function removeCard(e) {
  e.target.parentElement.parentElement.remove();
}

document.addEventListener("click", (e) => {
  if (e.target.matches("#modal")) {
    removeModal();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTitle = title.value.trim();
  const newAuthor = author.value.trim();
  const newPages = +pages.value;
  const newIsRead = isRead.checked ? true : false;

  addBookToLibrary(newTitle, newAuthor, newPages, newIsRead);

  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;
  modal.classList.remove("visible");
});

Book.prototype.display = function (e) {
  const card = document.createElement("div");
  const textGroup = document.createElement("div");
  const buttonGroup = document.createElement("div");

  card.classList.add("card");
  textGroup.classList.add("text-group");
  buttonGroup.classList.add("button-group");

  card.append(textGroup, buttonGroup);

  const title = document.createElement("div");
  title.classList.add("text-title");
  title.textContent = this.title;

  const author = document.createElement("div");
  author.classList.add("text-author");
  author.textContent = this.author;

  const pages = document.createElement("div");
  pages.classList.add("text-pages");
  pages.textContent = this.pages + " pages";

  const btnRead = document.createElement("button");
  const btnRemove = document.createElement("button");

  btnRead.classList.add("btn-read");
  btnRemove.classList.add("btn-remove");
  if (this.isRead) {
    btnRead.textContent = "Read";
  } else {
    btnRead.textContent = "Not Read";
    btnRead.style.backgroundColor = "#ff0000";
  }

  btnRemove.textContent = "Remove";

  textGroup.append(title, author, pages);
  buttonGroup.append(btnRead, btnRemove);
  cardContainer.append(card);

  btnRemove.onclick = removeCard;
  btnRead.onclick = changeStatus;
};

function displayBooks() {
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    const textGroup = document.createElement("div");
    const buttonGroup = document.createElement("div");

    card.classList.add("card");
    textGroup.classList.add("text-group");
    buttonGroup.classList.add("button-group");

    card.append(textGroup, buttonGroup);

    const title = document.createElement("div");
    title.classList.add("text-title");
    title.textContent = book.title;

    const author = document.createElement("div");
    author.classList.add("text-author");
    author.textContent = book.author;

    const pages = document.createElement("div");
    pages.classList.add("text-pages");
    pages.textContent = book.pages + " pages";

    const btnRead = document.createElement("button");
    const btnRemove = document.createElement("button");

    btnRead.classList.add("btn-read");
    btnRemove.classList.add("btn-remove");

    if (book.isRead) {
      btnRead.textContent = "Read";
    } else {
      btnRead.textContent = "Not Read";
      btnRead.style.backgroundColor = "#ff0000";
    }

    btnRemove.textContent = "Remove";

    textGroup.append(title, author, pages);
    buttonGroup.append(btnRead, btnRemove);
    cardContainer.append(card);

    btnRemove.onclick = removeCard;
    btnRead.onclick = changeStatus;
  });
}

displayBooks();
