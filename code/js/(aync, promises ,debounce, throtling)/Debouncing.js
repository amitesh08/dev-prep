//debouncing -> is a technique where you delay a function until there is apause inactivity for a certain period.

/*------------------Example--------------
Imagine you're in a room and your friend is shouting:

"Hey! Hey! Hey! Hey!" (every 100ms)

You want to respond only if he stays quiet for 500ms.

That’s Debounce:

Keep canceling your reply

Only reply after the last shout and a 500ms silence 
*/

function debounce(fnc, delay) {
  let timer;

  return function (...args) {
    //clearing out the old timer first.
    clearTimeout(timer);

    timer = setTimeout(() => {
      fnc.apply(this, args);
    }, delay);
  };
}

const search = (query) => {
  console.log("🔍 Searching for:", query);
};

const debouncedSearch = debounce(search, 500);

// Simulate input typing
debouncedSearch("A");
debouncedSearch("Ami");
debouncedSearch("Amite");
debouncedSearch("Amitesh");
