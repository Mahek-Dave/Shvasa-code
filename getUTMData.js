const getUTMParams = function (field) {
  const marketingData = window.location.search;

  const marketingField = document.querySelector(`${field}`);
  marketingField.value = marketingData;
};
