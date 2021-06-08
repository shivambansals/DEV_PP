let addTodoButton = document.querySelector(".add-todo");
let todoInput = document.querySelector(".todo-input");
let todoList = document.querySelector(".todos-list-container");
todoInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addTodo();
    }
});
addTodoButton.addEventListener("click", function () {
    addTodo();
});



function addTodo() {
    let todoInputValue = todoInput.value;
    if (todoInputValue) {
        appendTodo(todoInputValue);
        todoInput.value = "";
    }
}
function appendTodo(todo) {
    let todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");

    let pTag = document.createElement("p");
    pTag.classList.add("todo");
    pTag.textContent = todo;


    let deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo");
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", deleteTodo);

    todoItemDiv.append(pTag);
    todoItemDiv.append(deleteTodoButton);
    todoList.append(todoItemDiv);
}
function deleteTodo(e) {
    e.target.parentNode.remove();
}
console.log(addEventListener);