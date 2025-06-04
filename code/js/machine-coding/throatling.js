const unknown = (fn, delay) => {
  let myId = null;
  return (...args) => {
    if (myId === null) {
      fn(...args);
      myId = setTimeout(() => {
        myId = null;
      }, delay * 1000);
    }
  };
};
//throtling -> set the bottleneck that we won't take request after certain.
// it will take only 1 request at certain time
function greet(name) {
  console.log(`hello ${name}`);
}

const stillUnknown = unknown(() => greet("amitesh"), 3);

stillUnknown();
stillUnknown();
stillUnknown();
