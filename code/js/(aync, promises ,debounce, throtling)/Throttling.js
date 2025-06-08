//throttling make sure that a funtion runs at most once every x milliseconds , no matter how often it is triggerred.

/* 
Think of a traffic light at a narrow bridge:

It lets 1 car every 5 seconds

Even if 100 cars line up, only one can go per window
*/

function throttle(fnc, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= delay) {
      fnc.apply(this, args);
      lastTime = now;
    }
  };
}
const logScroll = () => {
  console.log("📜 User scrolled at", new Date().toLocaleTimeString());
};

const throttledScroll = throttle(logScroll, 1000);

throttledScroll();
throttledScroll();
throttledScroll();
