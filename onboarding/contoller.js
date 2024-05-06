import model from "./model.js";

window.addEventListener("click", function () {
  const one = async function () {
    console.log("controller works");
    const test = await model.loadFreeTrialData(prod_MjTaCamDna2hFQ);
    console.log(test);
  };
  one()``;
});
