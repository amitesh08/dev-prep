//logging in -> fetch profile -> fethc post

function logIn(username, password) {
  return new Promise((resolve, reject) => {
    if (username === "admin" && password === "1234") {
      setTimeout(() => {
        console.log("✅ Logged in");
        resolve(username);
      }, 1000);
    } else {
      reject("❌ Incorrect credentials.");
    }
  });
}

function fetchProfile(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📄 Profile loaded");
      resolve(username);
    }, 1000);
  });
}

function fetchPost(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📝 Posts fetched");
      resolve({ username, posts: ["Post 1", "Post 2"] });
    }, 1000);
  });
}

// // Chaining the functions
// logIn("admin", "1234")
//   .then((username) => fetchProfile(username))
//   .then((username) => fetchPost(username))
//   .then((data) => {
//     console.log("Final result:");
//     console.log("User:", data.username);
//     console.log("Posts:", data.posts);
//   })
//   .catch((err) => console.error("Error:", err));

async function loadUser() {
  try {
    let login = await logIn("admin", "1234");
    let profile = await fetchProfile(login);
    let post = await fetchPost(profile);
    console.log(post);
  } catch (err) {
    console.log("error" + err);
  }
}

loadUser();
