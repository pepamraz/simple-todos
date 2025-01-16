const todosList = document.getElementById("todos-list");

const createTodoName = document.getElementById("create-todo-name");
const createTodoButton = document.getElementById("create-todo-submit");
const downloadButton = document.getElementById("download-todos-json");

downloadButton.onclick = () => {
  const todosJson = JSON.stringify(todos, null, 2);
  const blob = new Blob([todosJson], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "todos.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const uploadInput = document.getElementById("todos-json");
const uploadButton = document.getElementById("upload-todos-json");

uploadButton.onclick = () => {
  const file = uploadInput.files[0];

  if (!file) {
    alert("No file selected!");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const uploadedTodos = JSON.parse(event.target.result);

      if (!Array.isArray(uploadedTodos)) {
        throw new Error("Invalid JSON format: Expected an array.");
      }

      todos = uploadedTodos;
      localStorage.setItem("todos", JSON.stringify(todos));
      initializeTodos();

      alert("Todos successfully uploaded and loaded!");
    } catch (error) {
      alert("Invalid JSON file: " + error.message);
    }
  };

  reader.readAsText(file);
};

const wipeTodosButton = document.getElementById("wipe-todos");
wipeTodosButton.onclick = () => {
    const confirmed = confirm("Are you sure about that?");
    if(confirmed){
        todos=[];
        initializeTodos();
    }
}

let wasInitialized = false;

createTodoButton.onclick = () => {
  const newTodoName = createTodoName.value;

  if (newTodoName == "") {
    alert("TODO name is not filled");
    return;
  }

  let newTodoId = 0;
  if (todos.length > 0) newTodoId = todos[todos.length - 1].id + 1;

  const newTodo = {
    id: newTodoId,
    name: newTodoName,
    completed: false,
  };

  addTodo(newTodo);

  createTodoName.value = "";
};

let todos = [];

initializeTodos();

function initializeTodos() {
  if (wasInitialized) {
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    try {
      todos = JSON.parse(localStorage.getItem("todos") || "[]");
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      todos = [];
    }
    wasInitialized = true;
  }
  todosList.innerHTML = "";

  todos.forEach((todo) => {
    const newTodo = createTodoElement(todo.id, todo.name, todo.completed);

    todosList.appendChild(newTodo);
  });
}

function addTodo(todo) {
  todos.push(todo);
  initializeTodos(todos, todosList);
}

function removeTodo(id) {
  const oldTodos = todos;
  const newTodos = [];

  for (let i = 0; i < oldTodos.length; i++) {
    if (oldTodos[i].id != id) newTodos.push(oldTodos[i]);
  }

  todos = newTodos;
}

function completeTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].completed = true;
      return;
    }
  }
}

function uncompleteTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].completed = false;
      return;
    }
  }
}

function createTodoElement(id, name, completed) {
  const todoElement = document.createElement("li");
  todoElement.classList.add("single-todo");
  if (completed) todoElement.classList.add("completed");
  todoElement.setAttribute("todo-id", id);

  const todoNameElement = document.createElement("h2");
  todoNameElement.textContent = name;

  const todoCompleteButtonElement = document.createElement("button");
  todoCompleteButtonElement.classList.add("single-todo-complete");
  todoCompleteButtonElement.classList.add("icon");
  todoCompleteButtonElement.innerHTML = '<i class="fa-solid fa-check"></i>';
  todoCompleteButtonElement.onclick = () => {
    completeTodo(id);
    initializeTodos();
  };

  const todoUncompleteButtonElement = document.createElement("button");
  todoUncompleteButtonElement.classList.add("single-todo-uncomplete");
  todoUncompleteButtonElement.classList.add("icon");
  todoUncompleteButtonElement.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todoUncompleteButtonElement.onclick = () => {
    uncompleteTodo(id);
    initializeTodos();
  };

  const todoRemoveButtonElement = document.createElement("button");
  todoRemoveButtonElement.classList.add("single-todo-delete");
  todoRemoveButtonElement.classList.add("icon");
  todoRemoveButtonElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  todoRemoveButtonElement.onclick = () => {
    removeTodo(id);
    initializeTodos();
  };

  todoElement.appendChild(todoNameElement);
  todoElement.appendChild(todoCompleteButtonElement);
  todoElement.appendChild(todoUncompleteButtonElement);
  todoElement.appendChild(todoRemoveButtonElement);

  return todoElement;
}
