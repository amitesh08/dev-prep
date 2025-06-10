function createCounter() {
  let count = 0;

  //this is a closure function (funtion bounded by its lexical scope)
  function increment() {
    count++;
    return count;
  }
  return increment;
}

const user1 = createCounter();
const user2 = createCounter();
//user1 and user 2 will have there seperate Increment function onlynot he full createCounterfunction
console.log(user1()); //1
console.log(user1()); //2
console.log(user1()); //3
console.log(user1()); //4
console.log(user1()); //5

console.log(user2()); //1
console.log(user2()); //2
console.log(user2()); //3
console.log(user2()); //4
console.log(user2()); //5
