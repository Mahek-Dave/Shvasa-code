const controlFixedCTAVisibility = function (targetClass,CTA,rootClass=null) {
  const target = document.querySelector(`.${targetClass}`);
  const fixedCTA = document.querySelector(`.${CTA}`);
  const fixedCTAData = fixedCTA.getClientRects()[0];

  let visible = false;

  const options = {
    root: rootClass,
    rootMargin: "10px",
    threshold: 1.0,
  };

  const callback = (entries, observer) => {
    entries.forEach((enrty) => {
      if (enrty.isIntersecting && !visible){
        fixedCTA.style.transform = `translateY(${0}px)`;
        visible = true;
      }
    });
  };

  const observer = new IntersectionObserver(callback,options)

  observer.observe(target);
};
