const addTaskBtn = document.getElementById("add-task-btn");

const todoBoard = document.getElementById("todo-board");

function atatchDragEvent(target) {
  target.addEventListener("dragstart", () => {
    target.classList.add("moving");
  });
  target.addEventListener("dragend", () => {
    target.classList.remove("moving");
  });
}

addTaskBtn.addEventListener("click", () => {
  const input = prompt("what is the task?");
  if (!input) return;

  const taskCard = document.createElement("p");
  taskCard.classList.add("item");
  taskCard.setAttribute("draggable", true);
  taskCard.innerText = input;

  atatchDragEvent(taskCard);

  todoBoard.appendChild(taskCard);
});

const allBoards = document.querySelectorAll(".board");
const allItems = document.querySelectorAll(".item");

allItems.forEach((item) => {
  atatchDragEvent(item);
});
//can also write like this if the parameter signature is same in both the function.
// allItems.forEach(atatchDragEvent);

allBoards.forEach((board) => {
  board.addEventListener("dragover", () => {
    const movingElement = document.querySelector(" .moving");
    console.log(board, "something is over.", movingElement);
    board.appendChild(movingElement);
  });
});
