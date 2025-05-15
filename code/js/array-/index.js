//.map()

let arr = [1, 2, 3, 4, 5];

let sqrArr = arr.map((num) => num ** 2);

console.log(arr);
console.log(sqrArr);

let arr2 = ["apple", "banana", "cherry"];

let uppercase = arr2.map((fruit) => fruit.toUpperCase());

console.log(arr2);
console.log(uppercase);

let users = [
  { name: "Amit", age: 22 },
  { name: "Riya", age: 17 },
  { name: "Sahil", age: 25 },
];

console.log(users.map((user) => user.name));

// Convert numbers to strings:
let nums = [1, 2, 3]; // → ["1", "2", "3"]
console.log(nums.map((num) => num.toString())); //JSON.stringify(num) -> can do this also.

////.filter()

let arr3 = [1, 2, 3, 4, 5];
console.log(arr3.filter((num) => num % 2 == 0));

let arr4 = [5, 12, 8, 130, 44];
console.log(arr4.filter((num) => num > 10));

// let users = [
//   { name: "Amit", age: 22 },
//   { name: "Riya", age: 17 },
//   { name: "Sahil", age: 25 },
// ];
console.log(users.filter((user) => user.age > 18));

let values = [0, "hello", false, 42, "", null];
console.log(values.filter(Boolean)); //to get truthy value -> just pass boolean in callbck fn.

//.reduce()

let arr5 = [3, 6, 9, 12];
console.log(arr5.reduce((sum, num) => sum + num, 0));

// let users = [
//   { name: "Amit", age: 22 },
//   { name: "Riya", age: 17 },
//   { name: "Sahil", age: 25 },
// ];

console.log(users.reduce((sum, user) => sum + user.age, 0));

let arr6 = [2, 45, 7, 30]; //find the max num → 45
let max = arr6.reduce((acc, cur) => {
  return cur > acc ? cur : acc;
}, arr6[0]);
console.log(max);

let cart = [
  { item: "Book", price: 200 },
  { item: "Pen", price: 20 },
  { item: "Bag", price: 500 },
];
// Output: 720  calculate total price of the cart.

console.log(cart.reduce((sum, item) => sum + item.price, 0));

let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
// Output: { apple: 3, banana: 2, orange: 1 } count occurances

console.log(
  fruits.reduce((occ, fruit) => {
    occ[fruit] = occ[fruit] ? occ[fruit] + 1 : 1;
    return occ;
  }, {})
);
