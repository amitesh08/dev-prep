//promise  -> A promise to deliver something later.
let pizza = new Promise((resolve, reject) => {
  let isOrdered = true;

  if (isOrdered) {
    setTimeout(() => {
      resolve("🍕 pizza delivered");
    }, 5 * 1000);
  } else reject("❌ order failed");
});

pizza
  .then((res) => console.log(res)) //success
  .catch((e) => console.log(e)) //failure
  .finally(() => console.log("order process done!.")); //always run

console.log(pizza);
