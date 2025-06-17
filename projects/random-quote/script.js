const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "You miss 100% of the shots you don't take. – Wayne Gretzky",
  "Do what you can, with what you have, where you are. – Theodore Roosevelt",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "Strive not to be a success, but rather to be of value. – Albert Einstein",
  "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
  "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "It always seems impossible until it's done. – Nelson Mandela",
];

const quoteDisplay = document.getElementById("quoteDisplay");
const generateButton = document.getElementById("generateButton");

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerText = quote;
}

function debounce(fnc, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fnc.apply(this, args);
    }, delay);
  };
}

function throttle(fnc, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      fnc.apply(this, args);
    }
  };
}

const debouncedGenerate = debounce(generateQuote, 1000);
const throttledGenerate = throttle(generateQuote, 2000);

generateButton.addEventListener("click", throttledGenerate);
