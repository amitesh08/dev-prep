function delay(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function countdown(timer) {
  for (let i = timer; i >= 0; i--) {
    console.log(i + "..");
    await delay(1000);
  }
  console.log("🚀 Go!");
}
countdown(5);
