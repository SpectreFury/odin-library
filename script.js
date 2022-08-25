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

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

addBooksBtn.addEventListener("click", () => {
  modal.classList.add("visible");
});

exitModalBtn.addEventListener("click", () => {
  modal.classList.remove("visible");
});

document.addEventListener("click", (e) => {
  if (e.target.matches("#modal")) {
    modal.classList.remove("visible");
  }
});

addToLibraryBtn.addEventListener("click", () => {
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
    }

    btnRemove.textContent = "Remove";

    textGroup.append(title, author, pages);
    buttonGroup.append(btnRead, btnRemove);
    cardContainer.append(card);
  });
}
