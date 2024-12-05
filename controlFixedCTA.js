const controlFixedCTAVisibility = function (targetClass,CTA,rootClass=null) {
  const target = document.querySelector(`.${targetClass}`);
  const fixedCTA = document.querySelector(`.${CTA}`);
  console.log(fixedCTA);
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
        console.log('isIntersecting');
        fixedCTA.style.transform = `translateY(${0}px)`;
        visible = true;
      }
    });
  };

  const observer = new IntersectionObserver(callback,options)

  observer.observe(target);
};
