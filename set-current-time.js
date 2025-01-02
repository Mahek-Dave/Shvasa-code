const setCurrentTimeToTarget = function (targetEl) {
  const target = Array.from(
    document.querySelectorAll(`${targetEl}`)
  );
  const currentTime = new Date().toLocaleTimeString("en-US",{hour : '2-digit', minute: '2-digit'});

  target.forEach((text) => (text.innerHTML = currentTime));
};
