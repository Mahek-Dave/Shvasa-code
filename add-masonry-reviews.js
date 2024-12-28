const addMasonryReviews = async function () {
  const reviewBlocksWrapper = document.querySelector(
    ".lp-v2-testimonial-blocks-wrapper"
  );

  let errorOccured = false;

  const reviews = {
    ratingStarsURLs: {
      4: "https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/6753fd5de57333daade934e4_Vectors-Wrapper.svg",
      5: "https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/676fadaa786e3850326275c2_5%20stars%20review.svg",
    },
  };

  const getReviews = async function () {
    try {
      const res = await fetch(
        "https://services.shvasa.com/api/class/reviewList"
      );
      const data = await res.json();
      reviews.reviewData = await data.body;
    } catch (error) {
      console.log(error);
      errorOccured = true;
    }
  };

  await getReviews();

  console.log(reviews.reviewData);

  const getReviewTimeDifference = function (reviewDataTime) {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const reviewDate = new Date(reviewDataTime);
    const reviewTime = reviewDate.getTime();

    const diffInMs = currentTime - reviewTime;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHrs = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInYears = Math.floor(diffInDays / 365);

    let time;

    if (diffInMins <= 2) {
      time = `POSTED NOW`;
    } else if (diffInMins < 60) {
      time = `${diffInMins} MINS AGO`;
    } else if (diffInHrs < 24) {
      time = `${diffInHrs} HOUR${diffInHrs === 1 ? "" : "S"} AGO`;
    } else if (diffInDays < 365) {
      time = `${diffInDays} DAY${diffInDays === 1 ? "" : "S"} AGO`;
    } else {
      time = `${diffInYears} YEAR${diffInYears === 1 ? "" : "S"} AGO`;
    }
    return time;
  };

  const generateHTML = function (data) {
    const timeDiff = getReviewTimeDifference(data?.createdAt);
    const checkImage = data?.userDetails?.image;
    const userName = data?.userDetails?.name;

    return `
        <div class="lp-v2-testimonial-block w-variant-500049d3-051c-5955-c263-76b97c5c2b8d" bis_skin_checked="1">
    <div class="lp-v2-testimonial-blocks-top-part" bis_skin_checked="1">
        <div class="lp-v2-testimonial-star-duration-wrapper" bis_skin_checked="1">
            <div class="lp-v2-testimonial-stars" bis_skin_checked="1">
                <div class="lp-v2-testimonial-stars-wrapper" bis_skin_checked="1"><img
                        src=${
                          reviews?.ratingStarsURLs[data?.classFeedback?.rating]
                        }
                        loading="lazy" width="102.73788452148438" height="15.865350723266602" alt="5 Star rating"
                        class="lp-v2-testimonial-stars-image"></div>
                <div class="lp-v2-b7 all-caps" bis_skin_checked="1">Posted NOW</div>
            </div>
            <div class="lp-v2-testimonial-duration-wrapper" bis_skin_checked="1">
                <div class="lp-v2-b6 font-weight-medium all-caps" bis_skin_checked="1">${timeDiff}</div>
            </div>
        </div>
        <div class="lp-v2-b6" bis_skin_checked="1">${
          data?.classFeedback?.text
        }</div>
    </div>
    <div class="lp-v2-testimonial-reviewer-details-wrapper" bis_skin_checked="1">
        <div class="lp-v2-testimonial-reviewer-image-wrapper" bis_skin_checked="1"><img
                src=${checkImage}
                loading="lazy" sizes="(max-width: 1279px) 65px, (max-width: 1439px) 5vw, 65px" alt="" class="lp-v2-testimonial-reviewer-image ${
                  checkImage ? "" : "hide-element"
                }">
                <div class=${
                  checkImage ? "hide-element" : ""
                } bis_skin_checked="1">${userName
      .slice(0, 1)
      .toUpperCase()}</div>        
        </div>
        <div class="lp-v2-testimonial-reviewer-text-wrapper" bis_skin_checked="1">
            <div class="lp-v2-b4 font-weight-semi-bold all-caps" bis_skin_checked="1">${userName}</div>
        </div>
    </div>
</div>
    `;
  };

  const renderReviews = function () {
    if (errorOccured) return;
    reviewBlocksWrapper.innerHTML = "";
    reviews.reviewData.forEach((data) => {
      const html = generateHTML(data);
      reviewBlocksWrapper.insertAdjacentHTML("beforeend", html);
    });
  };
  renderReviews();
};
