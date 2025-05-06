const arr = [1, 2, 3, 4];

//lets build foreach function
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function (userFn) {
    const originalArr = this; //it points to current object like in this case it is arr.

    for (let i = 0; i < originalArr.length; i++) {
      userFn(i, originalArr[i]);
    }
  };
}

//lets build myMapfunction
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (userFn) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
      const value = userFn(this[i], i);
      result.push(value);
    }

    return result;
  };
}

//lets build myFilter function
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (userFn) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
      if (userFn(this[i])) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

//dot operator is used to access properties of that element.
arr.forEach(function (value, index) {
  console.log(`${value} ${index}`);
});

//lets use custom forEach
arr.myForEach(function (index, value) {
  console.log(`${index} ${value}`);
});

//signature map
// return = new array, iterate through the array, can perform operation

const newArr = arr.map((r) => r * 2);
console.log(newArr);

//custom map function
const new2Arr = arr.map((r) => r * 3);
console.log(new2Arr);

//signature .filter
//return = new array , userFn, if it satifies the the userFn then only it add into newArr

const n3 = arr.filter((e) => e % 2 == 0);
console.log(n3);

const n4 = arr.myFilter((e) => e % 2 == 0);
console.log(n4);
