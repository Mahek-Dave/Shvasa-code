import model from "./model.js";

window.addEventListener("click", function () {
  const one = async function () {
    console.log("controller works");
    const test = await model.loadFreeTrialData("6573f84acfed902b36249750");
    console.log(test);
  };
  one();
});
