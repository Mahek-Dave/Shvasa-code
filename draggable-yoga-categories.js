document.addEventListener("DOMContentLoaded", function () {
  // Select the scrollable wrapper div
  const scrollWrapper = document.querySelector(".yoga-categories-scroll-wrapper");
  const containerWidthSetter = document.querySelector("[data-category-width-setter]");
  const targetedContainer = document.querySelector("[data-container-target]");
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Get the global container of the page
  const classToAdd = containerWidthSetter.classList[0];

  // Apply that container to Targeted container
  targetedContainer.classList.add(classToAdd);

  const checkTargetedElementExist = function(target) {
    return targetedContainer ? targetedContainer.classList.contains(target) : false;
  }

  window.innerWidth < 478 && targetedContainer && checkTargetedElementExist('main-container') 
    ? targetedContainer.classList.add('15-px-padding-on-mobile') 
    : null; // or use undefined, or simply do nothing.

  // Function to handle the dragging logic
  const startDragging = (e) => {
    isDragging = true;
    scrollWrapper.classList.add("active"); // Optional: Add a class when dragging starts
    scrollWrapper.setPointerCapture(e.pointerId); // Capture the pointer
    startX = e.pageX - scrollWrapper.offsetLeft; // Record the initial X position
    scrollLeft = scrollWrapper.scrollLeft; // Record the current scroll position

    // Disable text selection
    document.body.style.userSelect = "none";
  };

  // Function to handle the dragging movement
  const drag = (e) => {
    if (!isDragging) return; // Only proceed if the user is dragging
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft; // Calculate the new X position
    const walk = (x - startX) * 5; // Multiply by 3 for a faster scroll (adjust as needed)
    scrollWrapper.scrollLeft = scrollLeft - walk; // Set the new scroll position
  };

  // Function to stop dragging
  const stopDragging = () => {
    isDragging = false;
    scrollWrapper.classList.remove("active");
    document.body.style.userSelect = "auto"; // Re-enable text selection
  };

  const addEventListeners = () => {
    scrollWrapper.addEventListener("pointerdown", startDragging);
    scrollWrapper.addEventListener("pointerleave", stopDragging);
    scrollWrapper.addEventListener("pointerup", stopDragging);
    scrollWrapper.addEventListener("pointermove", drag);
  };
  
  const removeEventListeners = () => {
    scrollWrapper.removeEventListener("pointerdown", startDragging);
    scrollWrapper.removeEventListener("pointerleave", stopDragging);
    scrollWrapper.removeEventListener("pointerup", stopDragging);
    scrollWrapper.removeEventListener("pointermove", drag);
  };

  const checkWidthAndAddListeners = () => {
    if (window.innerWidth > 991) {
      addEventListeners();
    } else {
      removeEventListeners();
    }
  };
  
  checkWidthAndAddListeners();
});
