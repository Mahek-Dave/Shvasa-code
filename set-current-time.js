const setCurrentTimeToTarget = function (targetEl) {
  const target = Array.from(
    document.querySelectorAll(`${targetEl}`)
  );
  const currentTime = new Date().toLocaleTimeString("en-US").slice(0, -6);

  target.forEach((text) => (text.innerHTML = currentTime));
};
