let arr = [1, 45, 26, 254, 725, 3];

function add(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
console.log(add(arr));
