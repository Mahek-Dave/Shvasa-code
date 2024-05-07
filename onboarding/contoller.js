import * as model from "./model.js";

window.addEventListener("click", function () {
  const callFn = async function () {
    console.log("controller works");
    const test = await model.loadPackageData("6573f84acfed902b36249750");
    console.log(test);
  };
  callFn();
});
