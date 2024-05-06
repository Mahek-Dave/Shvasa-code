import model from "./model.js";
console.log("controller works");
window.addEventListener("load", function () {
  const one = async function () {
    const test = await model.loadFreeTrialData(prod_MjTaCamDna2hFQ);
    console.log(test);
  };
  one()``;
});
