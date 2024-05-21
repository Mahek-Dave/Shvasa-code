const initYogaRetreat = function () {
  const brochureDownload = [...document.querySelectorAll("[data-brochure]")];
  const closeBtn = [...document.querySelectorAll("[data-closeBtn]")];
  let pdfLink;

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

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const closeTarget = btn.parentNode.parentNode;
      hideModal(`.${closeTarget.className}`);
    });
  });

  // Function For Checking Screen Size
  const checkScreenSize = function () {
    return screen.width < 991 ? true : false;
  };

  brochureDownload.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Console Screen Size
      checkScreenSize()
        ? console.log(
            `%c Mobile Screen Size ${screen.width}`,
            "color:green; font-size: 1rem; font-weight: bold;"
          )
        : console.log(
            `%c Desktop Screen Size : ${screen.width}`,
            "color:blue; font-size: 1rem; font-weight: bold;"
          );

      // Set Link
      try {
        pdfLink = checkScreenSize()
          ? btn.dataset.brochureMobile
          : btn.dataset.brochure;
        console.log(
          "%c Try Block Executed Successfully",
          "color:green; font-size:1rem; font-weight:bold"
        );
      } catch (error) {
        pdfLink = btn.dataset.brochure;
        console.log(
          `%c some error occured ${error}`,
          "color:red; font-size:1rem; font-weight:bold"
        );
      }

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
