// 7 DAYS TRIAL 
// const addIframePopup = function ({
//   targetEl = `[data-flow="free-trial"]`,
//   popupRequired = true,
//   iframeURL = "https://app.shvasa.com/widgets?widget=loginPopup-v2",
//   redirectURL = "https://app.shvasa.com/dashboard?widget=loginpopup",
//   allowCameraMic = false,
//   packageId = undefined,
//   signLabel = "Start%20a%207%20day%20free%20trial",
// } = {}) {
//   // Elements
//   const allBtns = [...document.querySelectorAll(targetEl)];
//   const mainBody = document.body;
//   let popup, closeBtn;

//   // Guard Close
//   if (!popupRequired || allBtns.length === 0) return;

//   let iframeAdded = false;

//   // Get url to fetch UTM paras
//   const pageUrl = encodeURIComponent(window.location.href);

//   // ProductID Check
//   const checkProductID = packageId ? `&packageId=${packageId}` : "";
//   console.log(checkProductID, packageId);

//   // iframe
//   const iframeHTML = `
//   <div class="iframe-popup-container">
//     <div class="iframe-popup-wrapper">
//       <div class="iframe-popup w-embed w-iframe">
//         <iframe ${
//           allowCameraMic
//             ? 'allow="camera *;microphone *; display-capture *"'
//             : ""
//         } class="iframe-popup" src="${iframeURL}&url=${pageUrl}&signLabel=${signLabel}${checkProductID}"></iframe>
//       </div>
//       <div class="iframe-popup-close-btn-wrapper w-embed">
//         <svg class="iframe-popup-close-btn" width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 8.5858L12.8284 5.75736L14.2426 7.17157L11.4142 10L14.2426 12.8284L12.8284 14.2426L10 11.4142L7.17157 14.2426L5.75736 12.8284L8.5858 10L5.75736 7.17157L7.17157 5.75736L10 8.5858Z" fill="currentColor"></path>
//         </svg>
//       </div>
//     </div>
//   </div>  
//   `;

//   // Add popup to body
//   const addPopup = (html) => {
//     document.body.insertAdjacentHTML("beforeend", html);
//     closeBtn = document.querySelector(".iframe-popup-close-btn");
//     iframeAdded = true;
//   };

//   addPopup(iframeHTML);

//   // Add popup after page loads
//   window.addEventListener("load", function () {
//     if (iframeAdded === true) return;
//     addPopup(iframeHTML);
//   });

//   // Display popup
//   const showPopup = () => {
//     if (iframeAdded === false) {
//       addPopup(iframeHTML);
//     }

//     mainBody.style.overflow = "hidden";
//     closeBtn.style.display = "flex";
//     popup = document.querySelector(".iframe-popup-container");
//     popup.style.display = "flex";
//     iframeAdded = true;
//   };

//   // Hide popup
//   const closePopup = () => {
//     popup.style.display = "none";
//     closeBtn.style.display = "none";
//     mainBody.style.overflow = "";
//   };

//   // Events
//   allBtns.forEach((btn) => btn.addEventListener("click", showPopup));
//   closeBtn.addEventListener("click", closePopup);

//   window.addEventListener("message", function (event) {
//     console.log(
//       "Message received from the child: " + JSON.stringify(event.data)
//     );

//     // Message received from child
//     if (event.data?.event === "loggedIn") {
//       window.location = `${redirectURL}&token=` + event.data?.token;
//     }
//   });
// };






// 3 days FT - BETTER PERFORMANCE CODE - USED
/*
const addIframePopup = function ({
  targetEl = `[data-flow=two-day-trial]`,
  popupRequired = true,
  iframeURL = "https://app.shvasa.com/widgets?widget=loginPopup-v2",
  redirectURL = "https://app.shvasa.com/dashboard?widget=loginpopup",
  allowCameraMic = false,
  packageId = "67ea76adea89798f74a19b4a",
  signLabel = "Start%20your%203-day%20free%20trial",
} = {}) {

  const allBtns = [...document.querySelectorAll(targetEl)];
  if (!popupRequired || allBtns.length === 0) return;

  const mainBody = document.body;

  // ---- Build URL exactly like original ----
  const pageUrl = new URL(window.location.href);
  const params = new URLSearchParams(pageUrl.search);

  if (!params.has("utm_campaign")) {
    const pathSegments = pageUrl.pathname.split("/");
    const route = pathSegments[pathSegments.length - 1];
    params.set("utm_campaign", route);
  }

  const updatedUrl = `${pageUrl.origin}${pageUrl.pathname}?${params.toString()}`;
  const newUrl = encodeURIComponent(updatedUrl);

  const checkProductID = packageId ? `&packageId=${packageId}` : "";

  let popup = null;
  let closeBtn = null;
  let iframeBuilt = false;

  // ---- ORIGINAL DOM STRUCTURE PRESERVED ----
  const buildPopup = () => {
    if (iframeBuilt) return;

    const iframeHTML = `
      <div class="iframe-popup-container" style="display:none;">
        <div class="iframe-popup-wrapper">
          <div class="iframe-popup w-embed w-iframe">
            <iframe
              ${allowCameraMic ? 'allow="camera *;microphone *; display-capture *"' : ""}
              class="iframe-popup"
              loading="lazy"
              src="${iframeURL}&url=${newUrl}&signLabel=${signLabel}${checkProductID}">
            </iframe>
          </div>
          <div class="iframe-popup-close-btn-wrapper w-embed">
            <svg class="iframe-popup-close-btn" width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 8.5858L12.8284 5.75736L14.2426 7.17157L11.4142 10L14.2426 12.8284L12.8284 14.2426L10 11.4142L7.17157 14.2426L5.75736 12.8284L8.5858 10L5.75736 7.17157L7.17157 5.75736L10 8.5858Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", iframeHTML);

    popup = document.querySelector(".iframe-popup-container");
    closeBtn = document.querySelector(".iframe-popup-close-btn");

    closeBtn.addEventListener("click", closePopup);

    iframeBuilt = true;
  };

  const showPopup = () => {
    buildPopup(); // Only builds once
    mainBody.style.overflow = "hidden";
    popup.style.display = "flex";
  };

  const closePopup = () => {
    popup.style.display = "none";
    mainBody.style.overflow = "";
  };

  allBtns.forEach((btn) => btn.addEventListener("click", showPopup));

  window.addEventListener("message", function (event) {
    if (event.data?.event === "loggedIn") {
      window.location = `${redirectURL}&token=` + event.data?.token;
    }
  });

};
*/







// TWO DAYS TRIAL OLD VERSION
const addIframePopup = function ({
  targetEl = `[data-flow=two-day-trial]`,
  popupRequired = true,
  iframeURL = "https://app.shvasa.com/widgets?widget=loginPopup-v2",
  redirectURL = "https://app.shvasa.com/dashboard?widget=loginpopup",
  allowCameraMic = false,
  packageId = "67ea76adea89798f74a19b4a",
  signLabel = "Start%20your%203-day%20free%20trial",
} = {}) {
  // Elements
  const allBtns = [...document.querySelectorAll(targetEl)];
  const mainBody = document.body;
  let popup, closeBtn;

  // Guard Close
  if (!popupRequired || allBtns.length === 0) return;

  let iframeAdded = false;

  // Get url to fetch UTM paras
  // const pageUrl = encodeURIComponent(window.location.href);
  
  // Get url to fetch UTM paras
  const pageUrl = new URL(window.location.href);
  const params = new URLSearchParams(pageUrl.search);
  // If utm_campaign is missing, set it to the route
  if (!params.has("utm_campaign")) {
    const pathSegments = pageUrl.pathname.split("/");
    const route = pathSegments[pathSegments.length - 1];
    params.set("utm_campaign", route);
  }
  // Create a new URL string with updated params (but don't change the real URL)
  const updatedUrl = `${pageUrl.origin}${pageUrl.pathname}?${params.toString()}`;
  const newUrl = encodeURIComponent(updatedUrl);
  console.log("Final pageUrl:", newUrl);


  // ProductID Check
  const checkProductID = packageId ? `&packageId=${packageId}` : "";
  console.log(checkProductID, packageId);

  // iframe
  const iframeHTML = `
  <div class="iframe-popup-container">
    <div class="iframe-popup-wrapper">
      <div class="iframe-popup w-embed w-iframe">
        <iframe ${
          allowCameraMic
            ? 'allow="camera *;microphone *; display-capture *"'
            : ""
        } class="iframe-popup" src="${iframeURL}&url=${newUrl}&signLabel=${signLabel}${checkProductID}"></iframe>
      </div>
      <div class="iframe-popup-close-btn-wrapper w-embed">
        <svg class="iframe-popup-close-btn" width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 8.5858L12.8284 5.75736L14.2426 7.17157L11.4142 10L14.2426 12.8284L12.8284 14.2426L10 11.4142L7.17157 14.2426L5.75736 12.8284L8.5858 10L5.75736 7.17157L7.17157 5.75736L10 8.5858Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  </div>
  `;

  // Add popup to body
  const addPopup = (html) => {
    document.body.insertAdjacentHTML("beforeend", html);
    closeBtn = document.querySelector(".iframe-popup-close-btn");
    iframeAdded = true;
  };

  addPopup(iframeHTML);

  // Add popup after page loads
  window.addEventListener("load", function () {
    if (iframeAdded === true) return;
    addPopup(iframeHTML);
  });

  // Display popup
  const showPopup = () => {
    if (iframeAdded === false) {
      addPopup(iframeHTML);
    }

    mainBody.style.overflow = "hidden";
    closeBtn.style.display = "flex";
    popup = document.querySelector(".iframe-popup-container");
    popup.style.display = "flex";
    iframeAdded = true;
  };

  // Hide popup
  const closePopup = () => {
    popup.style.display = "none";
    closeBtn.style.display = "none";
    mainBody.style.overflow = "";
  };

  // Events
  allBtns.forEach((btn) => btn.addEventListener("click", showPopup));
  closeBtn.addEventListener("click", closePopup);

  window.addEventListener("message", function (event) {
    console.log(
      "Message received from the child: " + JSON.stringify(event.data)
    );

    // Message received from child
    if (event.data?.event === "loggedIn") {
      window.location = `${redirectURL}&token=` + event.data?.token;
    }
  });
};


