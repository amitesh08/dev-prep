let arr = [1, 2, 3, 4, 5, 6];

console.log(arr[-1]);
//here we are not supposed to access the negative index but if i want to access -1 = 6
//let see how we can do it using proxy

function negativeIndex(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      // this is to get hte value
      const index = Number(prop);
      if (index < 0) return target[target.length + index];
      return target[index];
    },
    set(target, prop, value) {
      //this hits when you want to change the value.
      const index = Number(prop);
      if (index < 0) return (target[target.length + index] = value);
      target[index] = value;
      return true;
    },
  });
}

let newarr = negativeIndex(arr); // --> newarr is not new arr it is the proxy of the array
console.log("before " + arr);
console.log(newarr[-1]);
newarr[-1] = 22;
console.log(newarr[-1]);
console.log("after " + arr); //so it changes to original array.
// --> Proxy wraps around the same array (no copy).
// --> Any changes made through the Proxy affect the original.
