let timer;
let deleteFirst;
/* async ger oss tillåtelse att arbeta med promise. Await är vårt keyword som gör så att hundlistan hämtas innan något annat körs.
Den här delen hämtar hundlistan via API
det är egentligen bara två olika sätt att göra samma sak på "bakom kulisserna" fungerar det likadant, men man kan antingen använda sig av .then() eller async och await, men det är fortfarande promises som körs i bakgrunden*/
async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  createBreedList(data.message); // message innehåller listan
}

start();
// skapar listan av hundar
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange ="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList)
              .map(function (breed) {
                return `<option>${breed}<option/>`;
              })
              .join("")} 
        </select>
        `;
}

async function loadByBreed(breed) {
  if (breed !== "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentImage = 0;
  clearInterval(timer);
  clearTimeout(deleteFirst);
  document.getElementById(
    "slideshow"
  ).innerHTML = `<div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `;
  currentImage += 2;
  timer = setInterval(nextSlide, 3000);

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentImage]}')"></div>`
      );
    deleteFirst = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentImage + 1 >= images.length) {
      currentImage = 0;
    } else {
      currentImage++;
    }
  }
}
// Selectors // här kopplar vi classerna i html till JS, de får ny namn
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listers
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterTodo.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault(); //hindrar sidan att laddas om
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //check mark button

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class= "fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // trash button

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);

  //clear input valu ( gör så att lägga till raden blir tom efter varje nytt objekt som läggs till i listan)
  todoInput.value = "";
}

//deletefunktionen

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add(
      "fall"
    ); /* skapar en ny class som heter fall som ska bli en amination! 
    Efter att jag skapat classen här går jag till css och plockar upp den där!*/
    todo.addEventListener("transitionend", function () {
      todo.remove();
    }); // Jag lägger till den här sista delen för att ta bort produktera från minnet
  }
  //checkmark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
