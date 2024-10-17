const positionField = document.querySelector('[name="positionName"]');
const practiceField = document.querySelector('[name="yearsOfPractice"]');
const toughtField = document.querySelector('[name="yearsOfTeaching"]');
const certificationField = document.querySelector(
  '[name="highestCertification"]'
);
const otherSpecialisationsCheckbox = document.querySelector(
  "#otherSpecialisationsCheckbox"
);
const specialisationsPlaceholderText = document.querySelector(
  "#specialisations-text"
);

const formBtn = document.querySelector(".career-submit-btn");
const submitBtn = document.querySelector(".hidden-submit-btn");

const fieldArrayWithOtherOptions = ["positionName", "highestCertification"];

const feildsValuesArr = [
  {
    name: "Yoga Teacher",
    certifications: [
      "Select Your Highest certification",
      "RYT 200",
      "RYT 300",
      "RYT 500",
      "Bachelors in yoga",
      "Masters in yoga",
      "PHD in yoga",
      "Other",
    ],
    yearsOfPracticePlaceHolder: "How many years have you practiced yoga?",
    yearsOfTeachingPlaceHolder: "How many years have you taught yoga?",
    specialisationsPlaceHolder: "Specialisations (if any)",
  },
  {
    name: "Dance Fitness Teacher",
    certifications: [
      "Select Your Highest certification",
      "Zumba Instructor Training",
      "Bollywood Dance Fitness Certification",
      "Other",
    ],
    yearsOfPracticePlaceHolder:
      "How many years you have been practicing Dance?",
    yearsOfTeachingPlaceHolder: "How many years have you taught Dancing?",
    specialisationsPlaceHolder:
      "Specialization (Any trained classical or western Dance forms)",
  },
  {
    name: "Strength Training Teacher",
    certifications: [
      "Select Your Highest certification",
      "NCSA",
      "ACSM",
      "ISSA",
      "ACE",
      "NASM",
      "NFNA",
      "Other",
    ],
    yearsOfPracticePlaceHolder:
      "How many years you have been practicing Strength Training?",
    yearsOfTeachingPlaceHolder:
      "How many years have you taught Strength Training?",
    specialisationsPlaceHolder: "Specialisations (if any)",
  },
  {
    name: "Pilates Teacher",
    certifications: [
      "Select Your Highest certification",
      "Balanced Body Pilates Instructor",
      "STOTT PILATES",
      "Power Pilates",
      "Body Control Pilates",
      "Other",
    ],
    yearsOfPracticePlaceHolder:
      "How many years you have been practicing Pilates?",
    yearsOfTeachingPlaceHolder:
      "How many years have you taught Strength Pilates?",
    specialisationsPlaceHolder: "Specialisations (if any)",
  },
  {
    name: "Other",
    certifications: [
      "Select Your Highest certification",
      "RYT 200",
      "RYT 300",
      "RYT 500",
      "Bachelors in yoga",
      "Masters in yoga",
      "PHD in yoga",
      "Other",
    ],
    yearsOfPracticePlaceHolder: "How many years you have been practicing?",
    yearsOfTeachingPlaceHolder: "How many years have you taught",
    specialisationsPlaceHolder: "Specialisations (if any)",
  },
];

const optionHTML = function (value) {
  return `<option value="${
    value === "Select Your Highest certification" ? null : value
  }">${value}</option>`;
};

const updatePlaceholderAndAddOptions = function (iName = "Other") {
  currentObj = feildsValuesArr.find(({ name }) => name === iName);
  console.log(currentObj);
  practiceField.options[0].text = currentObj.yearsOfPracticePlaceHolder;
  toughtField.options[0].text = currentObj.yearsOfTeachingPlaceHolder;
  specialisationsPlaceholderText.innerHTML =
    currentObj.specialisationsPlaceHolder;

  certificationField.innerHTML = "";
  currentObj.certifications.forEach((value) => {
    certificationField.insertAdjacentHTML("beforeend", optionHTML(value));
  });
};

const updateFieldsWithPosition = function () {
  const position = positionField.value;
  let currentObj;

  switch (position) {
    case "Yoga Teacher":
      updatePlaceholderAndAddOptions("Yoga Teacher");
      break;
    case "Dance Fitness Teacher":
      updatePlaceholderAndAddOptions("Dance Fitness Teacher");
      break;
    case "Strength Training Teacher":
      updatePlaceholderAndAddOptions("Strength Training Teacher");
      break;
    case "Pilates Teacher":
      updatePlaceholderAndAddOptions("Pilates Teacher");
      break;
    case "Other":
      updatePlaceholderAndAddOptions("Other");
      break;

    default:
      break;
  }
};

positionField.addEventListener("input", updateFieldsWithPosition);

const addOtherFieldValuesToFinalObj = function (finalObj) {
  allOtherFieldsArr = [...document.querySelectorAll("[data-partof]")];
  if (!(allOtherFieldsArr.length > 0)) return;

  allOtherFieldsArr.forEach((field) => {
    if (field.dataset.partof === "otherSpecialisationsCheckbox") {
      const objKey = "specialisations";
      const objValue = field.value;

      finalObj[objKey].push(`Other + ${objValue}`);
    } else {
      const objKey = field.dataset.partof;
      const objValue = field.value;

      finalObj[objKey] = `Other + ${objValue}`;
    }
  });
};

const generateOtherFieldHTML = function (
  iName,
  iRequired = true,
  iPlaceHolder,
  iPartOf
) {
  return `<div class="career-form-row horizontal-flex">
                    <div class="career-form-field-wrapper">
                      <input class="career-form-field full-width w-input" maxlength="256" name="${iName}" data-partof=${iPartOf} data-name="${iName}" placeholder="${iPlaceHolder}" type="text" id="${iName}" required="${iRequired}">
                    </div>
                  </div>`;
};

const addOtherInputField = function (el, checkbox = false) {
  const selector = el.dataset.target;
  const iPartOf = el.name;

  const iName = el.dataset.name;
  const iRequired = el.dataset.required;
  const iPlaceHolder = el.dataset.placeholder;

  const checkElementExist = document.querySelector(`[name = "${iName}"]`);

  if (checkElementExist) return console.log("Already Exist");

  console.log("otherInput", el, selector, iName, iRequired, iPlaceHolder);

  document
    .querySelector(`${selector}`)
    .insertAdjacentHTML(
      `${checkbox ? "beforeend" : "afterend"}`,
      generateOtherFieldHTML(iName, iRequired, iPlaceHolder, iPartOf)
    );
};

const removeOtherInputField = function (el) {
  const iName = el.dataset.name;
  const removeTarget = document.querySelector(`[name = "${iName}"]`);

  removeTarget ? removeTarget.closest(".career-form-row").remove() : null;
};

const controlFormDataSending = async function () {
  const getFormData = function () {
    // Form Selection
    const form = document.querySelector("#career-form-3");

    // Get Data From Form
    const formData = new FormData(form);

    // Create an Object
    const dataObj = Object.fromEntries(formData.entries());

    // Array for Specialisations
    const specialisationsArr = [
      ...document.querySelectorAll(".w--redirected-checked"),
    ];
    const specialisations = specialisationsArr
      .filter((el) => !el.nextSibling.name.includes("other"))
      .map((el) => el.nextSibling.name);

    const otherSpecialisationsField = document.querySelector(
      otherSpecialisationsCheckbox.dataset.name
    );

    if (otherSpecialisationsField)
      specialisations.push(otherSpecialisationsField.value);

    // Update Specialisations
    console.log(specialisations);
    dataObj.specialisations = specialisations;

    console.log("dataObj", dataObj);

    return dataObj;
  };

  //Creating Final Object
  const createFinalObject = function (dataObj) {
    return {
      firstName: dataObj.firstName,
      lastName: dataObj.lastName,
      email: dataObj.email,
      phone: `${dataObj.dialCode}${dataObj.phone}`,
      age: dataObj.age,
      gender: dataObj.gender,
      location: dataObj.location,
      yearsOfPractice: dataObj.yearsOfPractice,
      positionName: dataObj.positionName,
      yearsOfTeaching: dataObj.yearsOfTeaching,
      introVideoURL: dataObj.introVideoURL,
      socialMediaLinks: dataObj.socialMediaLinks
        .toLowerCase()
        .replaceAll(" ", "")
        .split(","),
      resume: dataObj.resume,
      hoursCommitmentPerDay: dataObj.hoursCommitmentPerDay,
      highestCertification: dataObj.highestCertification,
      specialisations: dataObj.specialisations,
      whyBestCandidate: dataObj.whyBestCandidate,
    };
  };

  // AJAX Call to post data
  const sendFormData = async function (finalObj) {
    const url = "https://services.truyoga.in/api/applications/teacher";
    const params = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA1MDFlY2I5YjQxZWEzNTNkNGZlNGEiLCJlbWFpbCI6InNhdXJhYmgrY29ycEBzaHZhc2EuY29tIiwicm9sZSI6MSwiaWF0IjoxNzI4MzgxNDQ0fQ.QMHlrc5b2Igp-wyF2BOcAIObreaCcrzLEB_QJma2KOk",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalObj),
    };
    try {
      const response = await fetch(url, params);
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formData = getFormData();
  const finalObj = createFinalObject(formData);

  addOtherFieldValuesToFinalObj(finalObj);

  console.table(finalObj);

  await sendFormData(finalObj);
};

fieldArrayWithOtherOptions.forEach((field) => {
  const el = document.querySelector(`[name = "${field}"]`);
  console.log(el);
  el.addEventListener("input", function () {
    !(el.value === "Other")
      ? removeOtherInputField(el)
      : addOtherInputField(el);
  });
});

otherSpecialisationsCheckbox.addEventListener("click", function () {
  const el = this;
  console.log("el", el, el.previousSibling);
  const isChecked = el.checked;
  console.log("checked or not", isChecked);
  isChecked ? addOtherInputField(el, true) : removeOtherInputField(el);
});

formBtn.addEventListener("click", async function () {
  await controlFormDataSending();
  submitBtn.click();
});
