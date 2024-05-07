import * as model from "./model.js";

console.log(model);

window.addEventListener("click", function () {
  console.log("testing");
  const callFn = async function () {
    console.log("controller works");
    const test = await model.loadPackageData("6573f84acfed902b36249750");
    console.log(test);
  };
  callFn();
});
