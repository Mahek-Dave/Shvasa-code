/*
const getUTMParams = function (marketingField, parentEl) {
  const marketingData = window.location.search;
  const marketingFieldInput = document.querySelector(`${marketingField}`);

  const params = new URLSearchParams(marketingData);

  const utmObj = {};

  const fieldHTML = function (name, value) {
    return `<input type="hidden" name="${name}" value="${value}">`;
  };

  const parentElement = document.querySelector(`${parentEl}`);

  params.forEach((value, key) => {
    utmObj[key] = value;
    const marketingField = fieldHTML(key, value);

    parentElement.insertAdjacentHTML("beforeend", marketingField);
  });

  marketingFieldInput && (marketingFieldInput.value = marketingData.slice(1));

};
*/

const getUTMParams = function (marketingField, parentEl) {
  const marketingData = window.location.search;
  const marketingFieldInputArr = Array.from(
    document.querySelectorAll(`${marketingField}`)
  );

  const params = new URLSearchParams(marketingData);

  const utmObj = {};

  const fieldHTML = function (name, value) {
    return `<input type="hidden" name="${name}" value="${value}">`;
  };

  const parentElement = Array.from(document.querySelectorAll(`${parentEl}`));

  params.forEach((value, key) => {
    utmObj[key] = value;
    const marketingFieldHTML = fieldHTML(key, value);

    parentElement.forEach((el) =>
      el.insertAdjacentHTML("beforeend", marketingFieldHTML)
    );
  });

  marketingFieldInputArr.length > 0 &&
    (marketingFieldInputArr.value = marketingData.slice(1));
};

