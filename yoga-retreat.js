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
      const checkScreenSize = function () {
        return screen.width < 991 ? true : false;
      };
      checkScreenSize()
        ? console.log(`Mobile Screen Size ${screen.width}`)
        : console.log(`Desktop Screen Size : ${screen.size} `);
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
//////////////////////////////////
/*
var input = document.querySelector("#phone"),
  dialCode = document.querySelector(".dialCode"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg"),
  iti = intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: getIp,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    placeholderNumberType: "FIXED_LINE",
  });

function updateInputValue(e) {
  const t = e.target.id.split("-")[1] || 1,
    r = document.querySelector("#phone" + (t > 1 ? "-" + t : "")),
    n = ".dialCode" + (t > 1 ? "-" + t : ""),
    i = document.querySelector(n),
    u = parseInt(t) - 1;
  (i.value = phones[u].getSelectedCountryData().dialCode),
    console.log(
      e,
      "el",
      i,
      i.value,
      t,
      n,
      r,
      r.value,
      phones[u].getSelectedCountryData(),
      phones[u].getSelectedCountryData().dialCode
    );
}
(phones = []),
  document.querySelectorAll("[id^=phone]").forEach((e) =>
    phones.push(
      intlTelInput(e, {
        initialCountry: "auto",
        placeholderNumberType: "FIXED_LINE",
      })
    )
  ),
  document.addEventListener("input", updateInputValue, !1),
  document.addEventListener("countrychange", updateInputValue, !1),
  input.addEventListener("input", updateInputValue, !1),
  input.addEventListener("countrychange", updateInputValue, !1);
var errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ],
  reset = function () {
    input.classList.remove("error"),
      (errorMsg.innerHTML = ""),
      errorMsg.classList.add("hide"),
      validMsg.classList.add("hide");
  };
input.addEventListener("blur", function () {
  if ((reset(), input.value.trim()))
    if (iti.isValidNumber()) validMsg.classList.remove("hide");
    else {
      input.classList.add("error");
      var e = iti.getValidationError();
      (errorMsg.innerHTML = errorMap[e]), errorMsg.classList.remove("hide");
    }
}),
  input.addEventListener("change", reset),
  input.addEventListener("keyup", reset);
*/
