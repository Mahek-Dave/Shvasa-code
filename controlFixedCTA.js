const controlFixedCTAVisibility = function (
  targetClass,
  CTA,
  rootClass = null,
  margin = '1000px'
) {
  const target = document.querySelector(`.${targetClass}`);
  const fixedCTA = document.querySelector(`.${CTA}`);
  // const fixedCTAData = fixedCTA.getClientRects()[0];

  console.log(target)
  console.log(fixedCTA)

  let visible = false;

  const options = {
    root: rootClass,
    rootMargin: margin,
    threshold: 1,
  };

  const callback = (entries, observer) => {
    entries.forEach(enrty => {
      if (enrty.isIntersecting && visible) {
        fixedCTA.style.transform = `translateY(100vh)`;
        visible = false;
      }
      if (!enrty.isIntersecting && !visible) {
        fixedCTA.style.transform = `translateY(${0}px)`;
        visible = true;
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  observer.observe(target);
};
