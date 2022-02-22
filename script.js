//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos); //this function runs when everything is done loading up.
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();

  //TODO div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  //check mark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append todo to the todo list
  todoList.appendChild(todoDiv);

  //clear input value after submitting
  todoInput.value = "";
}

//deleting a task or completing it
function deleteCheck(e) {
  //get info of what is being clicked on.
  const item = e.target;

  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    todo.classList.add("fall");
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //complete todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// filter and save to local storage

//filter

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check if items are in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo); //adding todo to the array
  localStorage.setItem("todos", JSON.stringify(todos)); //setting the entire array/list to local storage
}

// return todos to screen
function getTodos() {
  let todos;

  //check if items are in local storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // paste in majority of functionality from from addTodo function

    //TODO div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //getting todo from local storage
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //remove save to local storage

    //check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append todo to the todo list
    todoList.appendChild(todoDiv);
  });
}

//removing todos from storage
function removeLocalTodos(todo) {
  //check if items are in local storage
  //paste in if/else
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //we have to remove the element from the array. 
  //we can do that by getting the index.
  const todoIndex = todo.children[0].innerText;
  // we can then remove it using the splice method. (first argument is checking the index of one Element, 2nd argument is how many to delete )
  todos.splice(todos.indexOf(todoIndex), 1); 
  //now set back local storage
  localStorage.setItem('todos', JSON.stringify(todos)); 
}
