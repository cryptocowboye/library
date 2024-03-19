const myLibrary = [] // The list where the objects are added

function Book(author, title, pages, read) {
    this.author = author
    this.title = title // The objects being created
    this.pages = pages
    this.read = read
}

function pushToLibrary(pushAuthor, pushTitle, pushPages, pushRead) {
    myLibrary.push([pushAuthor, pushTitle, pushPages, pushRead]);  
}

function createRemoveBtn (element) {
    let removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-buttons')
    removeBtn.textContent = 'Remove'
    removeBtn.addEventListener('click', () => {
        element.remove()
    })
    return removeBtn
}

function createToggleBtn (element) {
    let toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-buttons")
    toggleBtn.textContent = "Change Read Status"
    toggleBtn.addEventListener("click", () => {
        let spanRead = document.querySelector(`.${element.className} > .span-container > .span-style3`); // testing
        if (spanRead.textContent === 'read ') {
            spanRead.textContent = 'not read '
        } else {
            spanRead.textContent = 'read '
        }
    })
    return toggleBtn
}

function createSpanDiv () {
    let spanDiv = document.createElement("div")
    spanDiv.classList.add("span-container")
    return spanDiv
}

function createBtnDiv () {
    let btnDiv = document.createElement("div")
    btnDiv.classList.add("button-container")
    return btnDiv
}

function editSpanDiv (spanDiv, element) {
    spanDiv.appendChild(element)
    return spanDiv
}

function editBtnDiv (btnDiv, element) {
    btnDiv.appendChild(element)
    return btnDiv
}

function createSpan (counter) {
    let spanEl = document.createElement("span");
    spanEl.classList.add(`span-style${counter}`)
    return spanEl
}

function addElementToDocument(parentNode) {
    let lastIndex = myLibrary.length - 1
    let newElement = document.createElement("div")
    newElement.classList.add(`book-${lastIndex + 1}`)
    let createdSpanDiv = createSpanDiv()
    let createdBtnDiv = createBtnDiv()
    for (i = 0; i < myLibrary[lastIndex].length; i++) {
        let spanElement = createSpan(i)
        spanElement.textContent += `${myLibrary[lastIndex][i]} `
        newElement.appendChild(editSpanDiv(createdSpanDiv, spanElement))
    }
    myLibrary[myLibrary.length - 1].push(newElement.className)
    newElement.appendChild(editBtnDiv(createdBtnDiv, createToggleBtn(newElement)))
    newElement.appendChild(editBtnDiv(createdBtnDiv, createRemoveBtn(newElement)))
    parentNode.appendChild(newElement)
}

function addBookToLibrary(newBook, parentNode) {
    pushToLibrary(newBook.author, newBook.title, newBook.pages, newBook.read)
    addElementToDocument(parentNode)
}

let submission = document.querySelector('button[type=submit]')

const openModal = document.querySelector("#open-modal")
const closeModal = document.querySelector("#close-modal")
const dialog = document.querySelector("dialog")
const radios = document.querySelectorAll("input[name=read_state]")
let removeBtnsArray = document.querySelector(".remove-buttons")

let radioValue;
let counter = 1

radios.forEach((radioBtn) => {
    radioBtn.addEventListener('click', () => {
        radioValue = radioBtn.value
    })
})

openModal.addEventListener("click", () => {
    dialog.show()
})

closeModal.addEventListener("click", () => {
    dialog.close()
})

submission.addEventListener("click", (e) => {
    let authorName = document.querySelector('#author')
    let bookTitle = document.querySelector('#title')
    let numOfPages = document.querySelector('#num-of-pages')
    let removingContainer = document.querySelector(".removing-container")
    let book = new Book(authorName.value, bookTitle.value, (numOfPages.value + ' pages'), radioValue)
    addBookToLibrary(book, removingContainer)
    e.preventDefault()
})
