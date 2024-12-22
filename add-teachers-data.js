const addTeachersData = async function () {
  const parentEl = document.querySelector(".teacher-slider-mask");

  const getTeachersData = async function () {
    const url = "https://services.truyoga.in/api/teacher/getBestTeachers";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const data = await response.json();
      return data.body;
    } catch (error) {
      console.log(error);
    }
  };

  const reinitializeWebflowSlider = function () {
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("slider").redraw();
  };

  const allTeachersData = await getTeachersData();

  console.log(allTeachersData);

  const generateHTML = function (data, i, arr) {
    return `
            <div class="teacher-slide w-slide" aria-label="${i + 1} of ${
      arr.length
    }" role="group"
            style="transition: all; transform: translateX(0px); opacity: 1;" aria-hidden="${
              i === 0 ? "true" : ""
            }">
            <div class="teacher-slide-component-wrapper">
                <div class="teacher-slide-text-wrapper">
                    <div class="teacher-slide-top-div">
                        <div class="teacher-slide-name-rating-wrapper">
                            <div class="b2 semi-bold">${
                              data?.teacherDetails?.name
                            }</div>
                            <div class="teacher-slide-rating">
                                <div class="b6 medium">${
                                  data?.teacherDetails?.avgRating
                                }</div><img
                                    src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/67344c1a3846ba451784cdc5_Vectors-Wrapper.svg"
                                    loading="lazy" width="77.70390319824219" height="11.9990234375" alt=""
                                    class="vectors-wrapper">
                            </div>
                        </div>
                        <div class="b4 bold color-paragraph">Student Reviews</div>
                    </div>
                    <div class="b6 light italic">${
                      data.classFeedback.text
                    }</div>
                </div>
                <div class="teacher-slide-image-wrapper"><img
                        src=${data?.teacherDetails?.imageURL?.thumbNailImages}
                        loading="lazy" width="100" height="225.39183044433594" alt="" class="teacher-slide-image"></div>
                </div>
            </div>
    `;
  };

  const addHTML = function (el, html) {
    el.insertAdjacentHTML("beforeend", html);
  };

  parentEl.innerHTML = "";

  allTeachersData.forEach((teacherData, i, arr) => {
    const html = generateHTML(teacherData, i, arr);
    addHTML(parentEl, html);
  });

  reinitializeWebflowSlider();
};
addTeachersData();
