function unknown(fn, delay) {
  //   console.log(arguments); // to know about the arguments.
  let myId;
  //function returning a function --> first class fnc/higher-order fnc.
  return function (...args) {
    clearTimeout(myId);
    myId = setTimeout(() => {
      fn.apply(this, args); //this can only be use in classic fnc not arrow fnc.
    }, delay * 1000);
  };
}
function greet(name) {
  console.log(`hello ${name}`);
}
//call -> just calling
//bind -> it returns a new function.
//apply -> (context and array)
const stillUnknown = unknown(() => greet("amitesh"), 3); //passing a callback func.

stillUnknown();
stillUnknown();
stillUnknown();
//we are calling this function many times but output only ones.
//if user is sending same request again and again then clear all the previous request except the last one.
//if the function is not called again in 3sec then only we will run else we'll del rest of the calls.

//--------------------DEBOUNCING----------------------------//
//remove past request --> keep a refrence of it
//fire a new request.
//userRequest() --> debouncedUserRequest()
