//promise chaining is when you want o run a sequence of asynchronous task one after another , each using the result of the previous
/* suppose we have to make a tea -> 
    1. boil water
    2. add tea leaves
    3. add sugar 
    4. serve tea

    -in each step we have to wait for the previous step to complete 
    -like we don't want to ass tea leaves before boiling water 
    -similarly we don't want to add sugar before adding tea leaves
    
    now lets code this
*/
function boilWater() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1. boil water");
      resolve("Boiled water");
    }, 2000);
  });
}

function addLeaves(pStep) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2. added tea leaves");
      resolve(pStep + " -> Added tea leaves");
    }, 1000);
  });
}

function addSugar(pStep) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2. added sugar");
      resolve(pStep + " -> Added sugar");
    }, 1000);
  });
}

function serveTea(pStep) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("4. tea is served");
      resolve(pStep + " -> tea is ready! 🍵");
    }, 3000);
  });
}

boilWater()
  .then((res) => addLeaves(res))
  .then((res2) => addSugar(res2))
  .then((res3) => serveTea(res3))
  .then((fres) => console.log("☑️  " + fres));

//what if you don't use chaining -> it will mess up the steps.
// boilWater();
// addLeaves(); // ❌ runs immediately
// addSugar(); // ❌ no dependency
// serveTea(); // ❌ not waiting at all

/*
boilWater()
  ↓
.then(addTeaLeaves)
  ↓
.then(addSugar)
  ↓
.then(serveTea)
  ↓
.then(log final result)
*/
