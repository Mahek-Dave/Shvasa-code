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
