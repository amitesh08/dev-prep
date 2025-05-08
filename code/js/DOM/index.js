function changeBg(color) {
  document.body.style.backgroundColor = color;
  if (color == "black") {
    document.h1.style.color = "white";
  } else {
    document.h1.style.color = "black";
  }
}

// const darkMode = document.getElementById("dark-mode-button");

// darkMode.addEventListener("click", () => {
//   changeBg("black");
// });

const theme = document.getElementById("theme-mode");

theme.addEventListener("click", () => {
  const cc = document.body.style.backgroundColor;

  if (!cc || cc == "white") {
    changeBg("black");
    theme.innerText = "light mode";
  } else {
    changeBg("white");
    theme.innerText = "dark mode";
  }
});
