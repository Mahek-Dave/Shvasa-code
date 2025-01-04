const renderReviewSlides = async () => {
  const reviewObject = {
    reviewParentEl: document.querySelector(".lp-03-after-class-slider-mask"),
    reviewsArr: "",
    url: "https://services.shvasa.com/api/class/reviewList?limit=15",
    currentDate: new Date(),
  };

  // Fetch function to fetch the reviews
  const fetchReviews = async function () {
    try {
      const res = await fetch(reviewObject.url);
      if (!res.ok) throw new Error(`Response Status : ${res.status}`);
      const data = await res.json();
      reviewObject.reviewsArr = data.body;
    } catch (error) {
      console.error(error.message);
    }
  };
  await fetchReviews();

  // Check if an image exist or not
  const checkImageExist = async function (url) {
    try {
      const res = await fetch(url);
      return res.ok;
    } catch (error) {
      console.log(error);
    }
  };

  // Get Event Time (Post / Reviews)
  const getEventTime = function (eventTime) {
    const currentTimeInMs = reviewObject.currentDate.getTime();
    const eventTimeInMs = new Date(eventTime).getTime();
    const diffInMs = currentTimeInMs - eventTimeInMs;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHrs = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHrs / 24);
    const diffInYears = Math.floor(diffInDays / 365);

    let time;

    if (diffInMinutes <= 2) {
      time = `Posted Now`;
    } else if (diffInMinutes < 60) {
      time = `${diffInMinutes} mins ago`;
    } else if (diffInHrs < 24) {
      time = `${diffInHrs} hour${diffInHrs === 1 ? "" : "s"} ago`;
    } else if (diffInDays < 365) {
      time = `${diffInDays} day${diffInDays === 1 ? "" : ""} ago`;
    } else {
      time = `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
    }
    return time;
  };

  // Funtion to generate markup
  const generateMarkup = async function (data, i) {
    return `
    <div class="lp-03-after-class-slide w-slide" aria-label="${i + 1} of ${
      reviewObject.reviewsArr.length
    }" role="group"
    style="transition: all; transform: translateX(0px); opacity: 1;" bis_skin_checked="1">
    <div class="lp-03-after-class-slide-content-wrapper" bis_skin_checked="1">
        <div class="lp-03-after-class-slide-content-top" bis_skin_checked="1">
            <div class="lp-03-after-class-slide-reviewer-image-wrapper" bis_skin_checked="1"><img
                    src= ${data?.userDetails?.image}
                    loading="lazy" alt="" class="lp-03-after-class-slide-reviewer-image ${
                      (await checkImageExist(data?.userDetails?.image))
                        ? ""
                        : "hide-element"
                    }">
                <div class="${
                  (await checkImageExist(data?.userDetails?.image))
                    ? "hide-element"
                    : ""
                }" bis_skin_checked="1">${data?.userDetails?.name
      .slice(0, 1)
      .toUpperCase()}</div>
            </div>
            <div class="lp-03-after-class-slide-reviewer-info" bis_skin_checked="1">
                <div class="lp-03-after-class-slide-reviewer-name" bis_skin_checked="1">
                    <div href="https://app.shvasa.com/progress/66df724e3262b81cdd462453" bis_skin_checked="1">${
                      data?.userDetails?.name
                    }</div>
                </div>
                <div class="lp-03-after-class-slide-review-date" bis_skin_checked="1">${getEventTime(
                  data?.createdAt
                )}</div>
            </div>
        </div>
        <div class="lp-03-after-class-slide-review" bis_skin_checked="1">${data?.classFeedback?.text.substring(
          0,
          150
        )}${data?.classFeedback?.text.length > 150 ? "..." : ""}</div>
    </div>
</div>
    `;
  };

  reviewObject.reviewParentEl.innerHTML = "";

  for (const [i, rev] of reviewObject.reviewsArr.entries()) {
    const html = await generateMarkup(rev, i);
    reviewObject.reviewParentEl.insertAdjacentHTML("beforeend", html);
  }

  await window.Webflow.require("slider").redraw();
};
renderReviewSlides();
