const todoList = document.querySelector(".todo-list");
const buttonNewToDo = document.querySelector(".button__new-todo-list");

const TODOS_KEY = "todos";
const getItems = localStorage.getItem(TODOS_KEY);
let toDos = [];

if (getItems != null) {
  toDos = JSON.parse(getItems);
  toDos.forEach((v) => createToDo(v.id, v.text, v.checked));
}

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function insertToDo() {
  const id = Date.now();
  toDos.push({
    id: id,
    text: "",
    checked: false,
  });

  createToDo(id, "", false);
  saveToDo();
}

function createToDo(id, text, checked) {
  //todo 생성 초기값
  const toDoItem = document.createElement("div");
  const toDoItemCheck = document.createElement("div");
  const toDoCheckbox = document.createElement("input");
  const toDoText = document.createElement("input");
  const toDoFunc = document.createElement("div");
  const toDoEditIcon = document.createElement("i");
  const toDoDelIcon = document.createElement("i");

  toDoItem.className = "todo-list__item";
  toDoItem.id = id;

  toDoItemCheck.className = "todo-list__item-check";
  toDoCheckbox.type = "checkbox";
  toDoCheckbox.checked = checked;

  if (checked) toDoItem.classList.add("checked");

  toDoCheckbox.addEventListener("click", (event) => {
    toDoItem.classList.toggle("checked");
    toDos.map((v) => {
      if (v.id == toDoItem.id) v.checked = event.target.checked;
    });
    saveToDo();
  });

  toDoText.type = "text";
  toDoText.disabled = true;
  toDoFunc.className = "todo-list__item-func";
  toDoEditIcon.className = "fa-solid fa-pen";

  toDoEditIcon.addEventListener("click", () => {
    toDoText.disabled = false;
    toDoText.focus();
  });

  toDoText.addEventListener("blur", (event) => {
    toDoText.disabled = true;
    toDos.map((v) => {
      if (v.id == toDoItem.id) v.text = event.target.value;
    });
    saveToDo();
  });

  toDoDelIcon.className = "fa-solid fa-circle-minus";
  toDoDelIcon.addEventListener("click", () => {
    toDoItem.remove();
    toDos = toDos.filter((v) => v.id != toDoItem.id);
    saveToDo();
  });

  toDoText.value = text;

  toDoFunc.appendChild(toDoEditIcon);
  toDoFunc.appendChild(toDoDelIcon);

  toDoItemCheck.appendChild(toDoCheckbox);
  toDoItemCheck.appendChild(toDoText);

  toDoItem.appendChild(toDoItemCheck);
  toDoItem.appendChild(toDoFunc);

  todoList.prepend(toDoItem);
}

buttonNewToDo.addEventListener("click", insertToDo);
