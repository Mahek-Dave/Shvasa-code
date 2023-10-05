// DISPLAY SCHEDULE ACCORDING TO LOCATION //

// All elements selection
const currentTimeZoneShow = document.querySelector("._9-time-zone-title");
const pacificLink = document.querySelector("#pacific-time");
const centralLink = document.querySelector("#central-time");
const mountainLink = document.querySelector("#mountain-time");
const easternLink = document.querySelector("#eastern-time");
const indianLink = document.querySelector("#indian-time");
const gulfLink = document.querySelector("#gulf-time");

// Time zone element Selection
const pacificTime = document.querySelector(".pacific-time-div");
const mountainTime = document.querySelector(".mountain-time-div");
const centralTime = document.querySelector(".central-time-div");
const easternTime = document.querySelector(".eastern-time-div");
const indianTime = document.querySelector(".indian-time-div");
const gulfTime = document.querySelector(".gulf-time-div");

const showPacificTimeZone = function () {
  currentTimeZoneShow.textContent = "US / Pacific - PST";
  pacificTime.classList.remove("hide-div");
  mountainTime.classList.add("hide-div");
  centralTime.classList.add("hide-div");
  easternTime.classList.add("hide-div");
  indianTime.classList.add("hide-div");
  gulfTime.classList.add("hide-div");
};

const showMountainTimeZone = function () {
  currentTimeZoneShow.textContent = "US / Mountain - MST";
  pacificTime.classList.add("hide-div");
  mountainTime.classList.remove("hide-div");
  centralTime.classList.add("hide-div");
  easternTime.classList.add("hide-div");
  indianTime.classList.add("hide-div");
  gulfTime.classList.add("hide-div");
};

const showCentralTimeZone = function () {
  currentTimeZoneShow.textContent = "US / Central - CST";
  pacificTime.classList.add("hide-div");
  mountainTime.classList.add("hide-div");
  centralTime.classList.remove("hide-div");
  easternTime.classList.add("hide-div");
  indianTime.classList.add("hide-div");
  gulfTime.classList.add("hide-div");
};

const showEasternTimeZone = function () {
  currentTimeZoneShow.textContent = "US / Eastern - EST";
  pacificTime.classList.add("hide-div");
  mountainTime.classList.add("hide-div");
  centralTime.classList.add("hide-div");
  easternTime.classList.remove("hide-div");
  indianTime.classList.add("hide-div");
  gulfTime.classList.add("hide-div");
};

const showIndianTimeZone = function () {
  currentTimeZoneShow.textContent = "India - IST";
  pacificTime.classList.add("hide-div");
  mountainTime.classList.add("hide-div");
  centralTime.classList.add("hide-div");
  easternTime.classList.add("hide-div");
  indianTime.classList.remove("hide-div");
  gulfTime.classList.add("hide-div");
};

const showGulfTimeZone = function () {
  currentTimeZoneShow.textContent = "UAE / Gulf - GST";
  pacificTime.classList.add("hide-div");
  mountainTime.classList.add("hide-div");
  centralTime.classList.add("hide-div");
  easternTime.classList.add("hide-div");
  indianTime.classList.add("hide-div");
  gulfTime.classList.remove("hide-div");
};

pacificLink.addEventListener("click", showPacificTimeZone);
centralLink.addEventListener("click", showCentralTimeZone);
mountainLink.addEventListener("click", showMountainTimeZone);
easternLink.addEventListener("click", showEasternTimeZone);
indianLink.addEventListener("click", showIndianTimeZone);
gulfLink.addEventListener("click", showGulfTimeZone);

try {
  function getIP(json) {
    if (json.country === "India") {
      $(".india-div").show();
      $(".default-number-div").show();
      showIndianTimeZone();
    } else if (json.country === "United Arab Emirates") {
      $(".uae-div").show();
      //$('.default-number-div').show();
      showGulfTimeZone();
    } else if (json.country === "Canada") {
      $(".canada-div").show();
      showEasternTimeZone();
    } else {
      $(".default-div").show();
      $(".default-number-div").show();
      showPacificTimeZone();
    }
  }
} catch (err) {
  $(".default-div").show();
  $(".default-number-div").show();
  showPacificTimeZone();
}

// SHOW UPCOMING CLASSES //

// currentDate
const today = new Date();
// All tab links
const tabs = document.querySelectorAll(".upcoming-classes-tab-link");
// All tabs container
const container = [...document.querySelectorAll(".tab-content-wrapper")];
container.forEach((div) => (div.textContent = ""));

// Days Difference Calculate
const calcDaysDifference = (date2, date1) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

// Tab links setup
[...tabs].reduce((acc, link, i) => {
  // creating current Date
  const date = new Date(acc);
  //  Get days different
  const daysDifference = calcDaysDifference(date, today);
  // Attribute Value
  const attributeValue = `${date}`.slice(4, 15).split(" ").join("-");

  if (daysDifference === 0) {
    link.textContent = "Today";
  } else if (daysDifference === 1) {
    link.textContent = "Tomorrow";
  } else {
    link.textContent = `${date}`.slice(4, 10).split(" ").reverse().join(" ");
  }
  // set data attribution
  link.setAttribute("data-tab-index", `${attributeValue}`);
  container[i].setAttribute("data-tabe-pane", `${attributeValue}`);

  // date for accumulator
  return date.setDate(date.getDate() + 1);
}, `${today}`);

let classesData;

const nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 1);
let selectedDate = `${nextDay}`.slice(4, 15).split(" ").join("-");
console.log(selectedDate);

// Fetch classes Data
const tillDate = new Date();
tillDate.setDate(tillDate.getDate() + 5);
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY4Y2FiN2UyY2ZmNDE1MmQ4YjZkMTciLCJlbWFpbCI6ImFkbWluQHNodmFzYS5jb20iLCJyb2xlIjpbMjA0NV0sImlhdCI6MTY3ODM1NzMxMn0.TfViPmCNEGSmaI6g19eCapva0y7kTEnaee_AMSrEdhU";

const url = "https://services.shvasa.com/api/product/getGroupClassesForWebflow";

const headers = {
  "Content-Type": "application/json",
  Authorization: `token ${authToken}`,
};

const body = {
  fromDate: new Date(),
  tillDate: tillDate,
};

const fetchClassesData = function (selectedDate) {
  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      classesData = data.body;
      //console.log(classesData);
      showClasses(selectedDate);
    })
    .catch((error) => {
      console.error("Error fetching class data:", error);
    });
};

fetchClassesData(selectedDate);

// Fetch Classes and display them
const showClasses = function (selectedDate) {
  const tabContainer = document.querySelector(
    `.tab-content-wrapper[data-tabe-pane = "${selectedDate}"]`
  );
  let html;
  tabContainer.textContent = "";
  classesData
    ?.filter(
      (item) =>
        // Filter Date
        new Date(item.classDateTime).getDate() ===
        new Date(selectedDate).getDate()
    )
    ?.forEach((item, i) => {
      if (i > 8) return;
      //update Class details
      const classDate = new Date(item?.classDateTime);
      const timeZone = `${classDate}`
        .slice(`${classDate}`.indexOf("(") + 1)
        .split(" ")
        .map((value) => value.at(0))
        .join("");
      const hours = `${classDate.getHours()}`.padStart(2, 0);
      const minutes = `${classDate.getMinutes()}`.padEnd(2, 0);

      // HTML Card
      html = `<div class="upcoming-class-card">
          <div class="upcoming-class-content">
        <div class='upcoming-class-time-wrapper'>
          <div class="upcoming-class-time">${hours}:${minutes}</div>
          <div class="upcoming-class-timezone">${timeZone}</div>
        </div>
        <figure class="upcoming-class-teacher-image-wrapper">
          <img
            src="${item?.teacherInfo.image}"
            loading="lazy"
            alt=""
            class="upcoming-class-teacher-image"
          />
        </figure>
        <div class="upcoming-classes-details">
          <div class="upcoming-class-name">
            ${item?.className}
          </div>
          <div>by ${item?.teacherInfo.name}</div>
          <div class="cta-spots-details">
            <a
              href="https://app.shvasa.com/book-class?classId=${item?.id}&teacher=${item?.teacherInfo?.name}&time=${item?.classDateTime}${urlParanew}"
              class="upcoming-class-book-btn w-button"
              >Book Class</a
            >
          </div>
        </div>
      </div>`;
      // Add card to the container
      tabContainer.insertAdjacentHTML("beforeend", html);
    });
};

// showClasses(selectedDate);

// Tab link click
document
  .querySelector(".upcoming-classes-tab-menu")
  .addEventListener("click", function (e) {
    if (!e.target.classList.contains("w--current")) return;
    selectedDate = e.target.dataset.tabIndex;
    //console.log(selectedDate);
    showClasses(selectedDate);
  });

// UPDATE SLIDER TEXT //

// Select the slide element
const slide = document.querySelector(".feature-slide");
const headings = [...document.querySelectorAll(".feature-heading")];

let transformValue;

const updateTransformValue = function () {
  let width = window.innerWidth;
  if (width >= 992) {
    transformValue = -275;
  } else {
    transformValue = -200;
  }
};

updateTransformValue();

const updateHeading = function (headingText) {
  headings.forEach((heading) => {
    heading.textContent = headingText;
  });
};

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.attributeName === "style") {
      const translate = slide.attributes.style.textContent.split(" ").at(1);
      const transformedValue = translate.slice(
        translate.indexOf("-"),
        translate.indexOf("p")
      );

      // Initial (for the 1st slide)
      if (transformedValue === "")
        updateHeading(
          "Experience interactive live yoga classes with a teacher via video."
        );

      // (for the 2nd slide)
      if (transformedValue === `${transformValue * 1}`)
        updateHeading("Access diverse 20/30/60-minute yoga classes throughout the day.");

      // (for the 3rd slide)
      if (transformedValue === `${transformValue * 2}`)
        updateHeading(
          "Start your yoga journey and progress from Novice to Warrior to Yoda."
        );

      // (for the 4th slide)
      if (transformedValue === `${transformValue * 3}`)
        updateHeading(
          "Stay motivated with streaks and levels to make yoga a habit."
        );

      // (for the 5th slide)
      if (transformedValue === `${transformValue * 4}`)
        updateHeading(
          "Deepen your understanding through YTT (Yoga Teacher Training)."
        );
    
      // (for the 6th slide)
      if (transformedValue === `${transformValue * 5}`)
        updateHeading(
          "Track your progress on your yoga journey."
        );

        // (for the 7th slide)
        if (transformedValue === `${transformValue * 6}`)
        updateHeading(
        "Embark on an extraordinary yoga journey with unique experiences at each level."
        );

        // (for the 8th slide)
        if (transformedValue === `${transformValue * 7}`)
        updateHeading(
        "Customers love our exceptional services."
        );
    }
  }
});

observer.observe(slide, { attributes: true });
