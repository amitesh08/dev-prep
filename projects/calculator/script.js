const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Your logic here
    const value = button.value;

    if (value === "=") {
      const result = math.evaluate(display.value);
      display.value = result;
    } else if (value === "C") {
      display.value = "";
    } else {
      //textContent does not work on input type.
      display.value += value;
    }
  });
});
