const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const newTodoText = document.getElementById('new-todo-text');

let todos = [];
let numb = 0;

const storedTodos = JSON.parse(localStorage.getItem('todos'));
if (storedTodos && Array.isArray(storedTodos)) {
  todos = storedTodos;
  numb = todos.length;
  render();
  updateCounter();
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const newTodoTextValue = newTodoText.value.trim();
  if (newTodoTextValue !== '') {
    let todo = { id: numb++, text: newTodoTextValue, checked: false };
    todos.push(todo);
    newTodoText.value = '';
    render();
    updateCounter();
    saveToLocalStorage(); 
  }
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
}

function renderTodo(todo) {
  return `
  <li class="${classNames.TODO_ITEM}">
    <input type="checkbox" class="custom-checkbox" ${todo.checked ? "checked" : ""} onchange="toggleTodo(${todo.id})">
    <span>${todo.text}</span>
    <button class="delete-button" onClick="deleteTodo(${todo.id})"><img src="img/bin.png" alt="Delete" class="bin"></button>
  </li>
  `;
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.reduce((prev, cur) => (prev + (cur.checked ? 0 : 1)), 0);
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveToLocalStorage();
}

function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? { id: todo.id, text: todo.text, checked: !todo.checked } : todo);
  updateCounter();
  saveToLocalStorage();
}