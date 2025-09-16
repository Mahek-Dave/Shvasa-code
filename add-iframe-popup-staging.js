// TWO DAYS TRIAL 

const addIframePopupStaging = function ({
  targetEl = `[data-flow=two-day-trial]`,
  popupRequired = true,
  iframeURL = "https://app.shvasa.com/widgets?widget=loginPopup-v2",
  redirectURL = "https://app.shvasa.com/dashboard?widget=loginpopup",
  allowCameraMic = false,
  packageId = "67ea76adea89798f74a19b4a",
  signLabel = "Book%20a%20Free%20Class",
} = {}) {
  // Elements
  const allBtns = [...document.querySelectorAll(targetEl)];
  const mainBody = document.body;
  let popup, closeBtn;

  // Guard Close: If popup is not required or no buttons, exit
  if (!popupRequired || allBtns.length === 0) return;

  let iframeAdded = false;

  // Get URL to fetch UTM parameters
  const pageUrl = encodeURIComponent(window.location.href);

  // ProductID Check
  const checkProductID = packageId ? `&packageId=${packageId}` : "";
  console.log(checkProductID, packageId);

  // iframe HTML structure
  const iframeHTML = `
  <div class="iframe-popup-container">
    <div class="iframe-popup-wrapper">
      <div class="iframe-popup w-embed w-iframe">
        <iframe loading="lazy" ${
          allowCameraMic
            ? 'allow="camera *;microphone *; display-capture *"'
            : ""
        } class="iframe-popup" src="${iframeURL}&url=${pageUrl}&signLabel=${signLabel}${checkProductID}"></iframe>
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

  // Display popup
  const showPopup = () => {
    if (iframeAdded === false) {
      addPopup(iframeHTML); // Add popup if not added yet
    }

    mainBody.style.overflow = "hidden"; // Disable page scroll when popup is open
    closeBtn.style.display = "flex"; // Show close button
    popup = document.querySelector(".iframe-popup-container");
    popup.style.display = "flex"; // Show the popup
    iframeAdded = true;
  };

  // Hide popup
  const closePopup = () => {
    popup.style.display = "none";
    closeBtn.style.display = "none";
    mainBody.style.overflow = ""; // Restore page scroll
  };

  // Wait for DOMContentLoaded to ensure all elements are available
  document.addEventListener("DOMContentLoaded", function () {
    // Ensure that the popup is added as soon as DOM is ready, but do not show it until clicked
    if (!iframeAdded) {
      addPopup(iframeHTML);
    }

    // Add event listeners for buttons to show the popup
    allBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        showPopup(); // Show popup on button click
      });
    });

    // Add event listener for messages from the iframe (login status)
    window.addEventListener("message", function (event) {
      console.log("Message received from the child: " + JSON.stringify(event.data));

      if (event.data?.event === "loggedIn") {
        window.location = `${redirectURL}&token=` + event.data?.token; // Redirect with token
      }
    });

    // Add close button event listener only after the popup is added
    closeBtn?.addEventListener("click", closePopup);
  });
};

