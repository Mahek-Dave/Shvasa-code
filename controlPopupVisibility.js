const controlPopupVisibility = function (popup, triggerBtn, closeButton) {
  const closeBtn = document.querySelector(`${closeButton}`);
  const popupContainer = document.querySelector(`${popup}`);
  const allTriggerBtns = Array.from(document.querySelectorAll(`${triggerBtn}`));

  const showPopup = function () {
    popupContainer.style.display = "flex";
  };

  const hidePopup = function () {
    popupContainer.style.display = "none";
  };

  closeBtn.addEventListener("click", hidePopup);

  allTriggerBtns.forEach((btn) => {
    btn.addEventListener("click", showPopup);
  });
};
