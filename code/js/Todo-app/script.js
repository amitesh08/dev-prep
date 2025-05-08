const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");

const todoItems = document.getElementById("items-container");

addBtn.addEventListener("click", () => {
  const value = todoInput.value;

  const li = document.createElement("li");

  li.innerText = value; //it puts the value in the li.

  const del = document.createElement("button");
  del.innerText = "❌";
  del.addEventListener("click", () => {
    li.remove();
  });

  todoItems.appendChild(li);
  li.appendChild(del);
  todoInput.value = "";
});
