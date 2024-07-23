// IIFE function
(() => {
  
  let iframeAdded = false;
  let popup;

  // Get url to fetch UTM paras
  const pageUrl = encodeURIComponent(window.location.href);
  
/**
 * PRODUCTION URL
 * const iframeURL = 'https://app.shvasa.com/widgets?widget=loginPopup&selfcheckout=true';
 * https://shvasa-staging-web.vercel.app
 */
  const iframeURL = 'https://app.shvasa.com';
  // Signup iframe
  const iframeHTML = `<iframe class="signup-popup" src="${iframeURL}/widgets?widget=loginPopup&selfcheckout=true&skipphone=true&skippass=true&url=${pageUrl}"></iframe>`;
  
  // Add popup to body
  const addPopup = (html) =>
    document.body.insertAdjacentHTML("beforeend", html);
    
  // Add popup after page loads
  window.addEventListener("load", function () {
    if (iframeAdded === true) return;
    addPopup(iframeHTML);
    iframeAdded = true;
    //console.log(iframeAdded);
  });

  // Elements
  const allBtns = [...document.querySelectorAll("[data-redirect-v2]")];
  //const closeBtn = document.querySelector(".close-signup-popup");
  const mainBody = document.querySelector(".page-wrapper");

  // Display popup
  const showPopup = () => {
    if (iframeAdded === false) {addPopup(iframeHTML)};

    mainBody.style.overflow = "hidden";
    mainBody.style.height = "100vh";
    closeBtn.style.display = "flex";
    popup = document.querySelector(".signup-popup");
    popup.style.display = "flex";
    iframeAdded = true;
   //console.log(iframeAdded);
  };

  // Hide popup
  const closePopup = () => {
    popup.style.display = "none";
    closeBtn.style.display = "none";
    mainBody.style.overflow = "auto";
    mainBody.style.height = "auto";
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
    window.location =
    "https://app.shvasa.com/onboardingv2?widget=loginpopup&productGroupId=6659c92ead6e41a400d0ce1e&token=" +
     event.data?.token;
    }
  });
})();
