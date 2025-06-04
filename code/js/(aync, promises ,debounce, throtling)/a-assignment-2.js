//  Fake API Fetch with Async/Await

async function fetchTodo() {
  try {
    console.log("loading...");
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/3");
    const data = await res.json();
    console.log("Title:", data.title);
  } catch (err) {
    console.log("error fetching the data" + err);
  }
}

fetchTodo();
