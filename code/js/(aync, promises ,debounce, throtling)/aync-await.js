//Async/Await - promises with clean syntax.
//it is used to write asyncrinous code that looks synchronous.
// await pauses the execution until the promise is resolved or rejected.
function getPizza() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("🍕 pizza is here");
    }, 3000);
  });
}

async function orderPizza() {
  try {
    console.log("ordering pizza....");
    let pizza = await getPizza(); //it wait until promise resolve.
    console.log(pizza);
  } catch (e) {
    console.log("failed to get pizza" + e);
  }
}

/* 
1.You start boiling water and wait for it to boil (await).
2.Once water boils, you add vegetables.
3.Then, you add spices.
4.Finally, you serve the dish.

Each step depends on the previous one and you wait before moving forward.
*/
function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function cook() {
  console.log("Boiling water....");
  await wait(2000);

  console.log("adding veggies...");
  await wait(3000);

  console.log("adding spices...");
  await wait(2000);

  console.log("Dish is ready!");
}

cook();
