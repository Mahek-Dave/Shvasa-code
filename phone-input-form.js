const phoneInputFields = [...document.querySelectorAll("[data-phone]")];

const callArr = phoneInputFields.map((input) => {
  function getIpNew(callback) {
    fetch("https://extreme-ip-lookup.com/json/?key=2R3cffV00WVwfx3gbVPo", {
      headers: { Accept: "application/json" },
    })
      .then((resp) => resp.json())
      .catch(() => {
        return {
          countryCode: "us",
        };
      })
      .then((resp) => callback(resp.countryCode));
  }

  const phoneInput = window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: getIpNew,
    preferredCountries: ["us", "ca", "ae", "in"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  function process() {
    const phoneNumber = phoneInput.getNumber();
    input.value = `${phoneNumber}`;
  }

  return process;
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const functionNumber = +form.querySelector("[data-phone]").dataset.phone;
    callArr[functionNumber].call();
    setTimeout(() => {
      form.submit();
    }, 2000);
  });
});
