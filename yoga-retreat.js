const initYogaRetreat = function () {
  const inquireBtn = [...document.querySelectorAll("[data-inquire]")];
  const brochureDownload = [...document.querySelectorAll("[data-brochure]")];
  const closeBtn = [...document.querySelectorAll("[data-closeBtn]")];
  const clickedData = document.querySelector("[data-clickedData]");
  const pageName = document.querySelector('[name="Page-Name"]');
  let pdfLink;

  pageName.value = "Yoga Retreat";

  const showModal = function (targetClass) {
    const popupWrapper = document.querySelector(targetClass);
    popupWrapper.style.display = "flex";
    popupWrapper.style.opacity = "1";
    popupWrapper.transition = "opacity 0.3s ease";
  };

  const hideModal = function (targetClass) {
    const popupWrapper = document.querySelector(targetClass);
    popupWrapper.style.display = "none";
    popupWrapper.style.opacity = "0";
  };

  inquireBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const clickDetail = btn.dataset.inquire;
      clickedData.value = clickDetail;
      showModal(".lp-r-slots-form-container");
    });
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const closeTarget = btn.parentNode.parentNode;
      hideModal(`.${closeTarget.className}`);
    });
  });

  brochureDownload.forEach((btn) => {
    btn.addEventListener("click", function () {
      pdfLink = btn.dataset.brochure;
      showModal(".lp-r-brochure-download-from-container");
    });
  });

  document
    .querySelector(".brochure-form-wrapper")
    .addEventListener("submit", function () {
      window["posthog"] &&
        window["posthog"].capture("Brochure_form_submit", {});
      window.open(`${pdfLink}`);
    });
};

initYogaRetreat();
