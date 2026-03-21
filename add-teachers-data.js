const addTeachersData = async function () {
  const parentEl = document.querySelector(".teacher-slider-mask");

  // Inject styles
  const addStyles = function () {
    const style = document.createElement("style");
    style.textContent = `
      .read-more-btn {
        background: none;
        border: none;
        color: #fc4456;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
        font-family: inherit;
        text-decoration: none;
        display: inline;
      }
      .read-more-btn:hover {
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
  };

  // Fetch data
  const getTeachersData = async function () {
    const url = "https://services.shvasa.com/api/teacher/getBestTeachers";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const data = await response.json();
      return data.body || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Reinitialize Webflow slider
  const reinitializeWebflowSlider = function () {
    window.Webflow && window.Webflow.require("slider").redraw();
  };

  const allTeachersData = await getTeachersData();

  // Generate HTML
  const generateHTML = function (data, i, arr) {
    const fullText = data?.classFeedback?.text || "";
    const maxLength = 180;

    const isLong = fullText.length > maxLength;
    const shortText = isLong
      ? fullText.slice(0, maxLength) + "... "
      : fullText;

    return `
      <div class="teacher-slide w-slide" aria-label="${i + 1} of ${arr.length}" role="group">
        <div class="teacher-slide-component-wrapper">

          <div class="teacher-slide-text-wrapper">

            <div class="teacher-slide-top-div">
              <div class="teacher-slide-name-rating-wrapper">
                <div class="b2 semi-bold">
                  ${data?.teacherDetails?.name || "Unknown"}
                </div>
                <div class="teacher-slide-rating">
                  <div class="b6 medium">
                    ${data?.teacherDetails?.avgRating || ""}
                  </div>
                  <img
                    src="https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/676fadaa786e3850326275c2_5%20stars%20review.svg"
                    loading="lazy"
                    alt=""
                    class="vectors-wrapper">
                </div>
              </div>
              <div class="b4 bold color-paragraph">Student Reviews</div>
            </div>

            <div class="b6 light italic review-text"
              data-full="${encodeURIComponent(fullText)}"
              data-short="${encodeURIComponent(shortText)}"
              data-expanded="false">
              ${shortText}${isLong ? `<button class="read-more-btn" type="button">Read more</button>` : ""}
            </div>

          </div>

          <div class="teacher-slide-image-wrapper">
            <img
              src="${data?.teacherDetails?.imageURL?.thumbNailImages || ""}"
              loading="lazy"
              alt=""
              class="teacher-slide-image">
          </div>

        </div>
      </div>
    `;
  };

  // Insert HTML
  const addHTML = function (el, html) {
    el.insertAdjacentHTML("beforeend", html);
  };

  // Init
  addStyles();
  parentEl.innerHTML = "";

  allTeachersData.forEach((teacherData, i, arr) => {
    const html = generateHTML(teacherData, i, arr);
    addHTML(parentEl, html);
  });

  // Read More / Read Less (event delegation)
  parentEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("read-more-btn")) return;

    const btn = e.target;
    const textEl = btn.parentElement; // button is inside the text div

    const isExpanded = textEl.dataset.expanded === "true";
    const fullText = decodeURIComponent(textEl.dataset.full);
    const shortText = decodeURIComponent(textEl.dataset.short);

    if (isExpanded) {
      textEl.innerHTML =
        shortText + `<button class="read-more-btn" type="button">Read more</button>`;
      textEl.dataset.expanded = "false";
    } else {
      textEl.innerHTML =
        fullText + `<button class="read-more-btn" type="button">Read less</button>`;
      textEl.dataset.expanded = "true";
    }

    reinitializeWebflowSlider();
  });

  // Initialize slider after DOM update
  reinitializeWebflowSlider();
};

addTeachersData();





// EARLIER WORKIMG CODE

// const addTeachersData = async function () {
//   const parentEl = document.querySelector(".teacher-slider-mask");

//   const getTeachersData = async function () {
//     const url = "https://services.shvasa.com/api/teacher/getBestTeachers";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response Status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.body;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const reinitializeWebflowSlider = function () {
//     window.Webflow && window.Webflow.require("slider").redraw();
//   };

//   const allTeachersData = await getTeachersData();

//   console.log(allTeachersData);

//   const generateHTML = function (data, i, arr) {
//     return `
//             <div class="teacher-slide w-slide" aria-label="${i + 1} of ${
//       arr.length
//     }" role="group"
//             style="transition: all; transform: translateX(0px); opacity: 1;" aria-hidden="${
//               i === 0 ? "true" : ""
//             }">
//             <div class="teacher-slide-component-wrapper">
//                 <div class="teacher-slide-text-wrapper">
//                     <div class="teacher-slide-top-div">
//                         <div class="teacher-slide-name-rating-wrapper">
//                             <div class="b2 semi-bold">${
//                               data?.teacherDetails?.name
//                             }</div>
//                             <div class="teacher-slide-rating">
//                                 <div class="b6 medium">${
//                                   data?.teacherDetails?.avgRating
//                                 }</div><img
//                                     src="https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/676fadaa786e3850326275c2_5%20stars%20review.svg"
//                                     loading="lazy" width="77.70390319824219" height="11.9990234375" alt=""
//                                     class="vectors-wrapper">
//                             </div>
//                         </div>
//                         <div class="b4 bold color-paragraph">Student Reviews</div>
//                     </div>
//                     <div class="b6 light italic">${
//                       data.classFeedback.text
//                     }</div>
//                 </div>
//                 <div class="teacher-slide-image-wrapper"><img
//                         src=${data?.teacherDetails?.imageURL?.thumbNailImages}
//                         loading="lazy" width="100" height="225.39183044433594" alt="" class="teacher-slide-image"></div>
//                 </div>
//             </div>
//     `;
//   };

//   const addHTML = function (el, html) {
//     el.insertAdjacentHTML("beforeend", html);
//   };

//   parentEl.innerHTML = "";

//   allTeachersData.forEach((teacherData, i, arr) => {
//     const html = generateHTML(teacherData, i, arr);
//     addHTML(parentEl, html);
//   });

//   reinitializeWebflowSlider();
// };
// addTeachersData();
