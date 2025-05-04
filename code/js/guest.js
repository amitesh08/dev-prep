let numberofGuest = 6;

let pizzaSize;

if (numberofGuest <= 2) {
  pizzaSize = "small";
} else if (numberofGuest <= 5) {
  pizzaSize = "medium";
} else {
  pizzaSize = "large";
}

console.log(`pizza size is ${pizzaSize}.`);
