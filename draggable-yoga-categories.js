document.addEventListener("DOMContentLoaded", function () {
  // Select the scrollable wrapper div
  const scrollWrapper = document.querySelector(".yoga-categories-scroll-wrapper");
  const container = document.querySelector(".yoga-categories-container");
  const containerWidthSetter = document.querySelector("[data-category-width-setter]");
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Get the computed style of the containerWidthSetter to find its max-width
  const computedStyle = getComputedStyle(containerWidthSetter);
  const maxWidth = computedStyle.maxWidth;

  // Apply that maxWidth to the scrollWrapper
  container.style.maxWidth = maxWidth;

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
