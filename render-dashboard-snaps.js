const renderDashboardSnaps = async () => {
  const allDataObj = {
    alldata: "",
    review: "",
    post: "",
    currentDate: new Date(),
    reviewParentEl: document.querySelector("[data-review]"),
    postParentEl: document.querySelector("[data-post]"),
  };

  // Getting All Data
  const fetchData = async function () {
    try {
      const res = await fetch(
        "https://services.shvasa.com/api/community/webflowReviewData"
      );
      const data = await res.json();
      allDataObj.alldata = await data.body;
    } catch (error) {
      console.log(error);
    }
  };
  await fetchData();

  // Filtering Post Data
  allDataObj.post = allDataObj.alldata
    .filter((data) => data.object.postType === "POST")
    .at(0);

  // Filtering Review Data
  allDataObj.review = allDataObj.alldata
    .filter((data) => data.object.postType === "REVIEW")
    .at(0);

  console.log(allDataObj);

  // Check if an image exist or not
  const checkImageExist = async function (imageURL) {
    try {
      const res = await fetch(imageURL);
      return res.ok;
    } catch (error) {
      console.log(error);
    }
  };

  // Get Event Time (Post / Reviews)
  const getEventTime = function (eventTime) {
    const currentTimeInMs = allDataObj.currentDate.getTime();
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

  // Time Formator
  const formatTime = function (time) {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const checkMediaType = async function (data) {
    if (data?.object?.video.length > 0) {
      return `
      <video id="" autoplay="" loop=""
      style=""
      muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
      <source
          src=${data?.object?.video?.at(0).url}
          data-wf-ignore="true">
  </video>
      `;
    } else {
      return `
      <img src=${
        (await checkImageExist(data?.object?.image?.at(0)))
          ? data?.object?.image?.at(0)
          : "https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/67691f03eb5bfa3289b3e760_Shvasa%20logo%20art.svg"
      } loading="lazy" alt="" class="full-size-image">`;
    }
  };

  // Review HTML Markup Generator
  const reviewHTMLMarkupGenerator = async function (data) {
    const reviewTime = getEventTime(data?.object?.createdAt);
    return `
      <div class="dashboard-snap-review-wrapper" bis_skin_checked="1">
      <div class="dashboard-snap-review-text-wrapper" bis_skin_checked="1">
          <div class="dashboard-snap-review-details" bis_skin_checked="1">
              <div class="dashboard-snap-reviewer-details-container" bis_skin_checked="1">
                  <div class="dashboard-snap-reviewer-details-wrapper" bis_skin_checked="1">
                      <div class="dashboard-snap-reviewer-image-wrapper" bis_skin_checked="1">
                          <div class="${
                            (await checkImageExist(data?.actor?.image))
                              ? "hide-element"
                              : ""
                          }" bis_skin_checked="1">${data?.actor?.name.slice(
      0,
      1
    )}</div>
                          <img src= ${
                            data?.actor?.image
                          } loading="lazy" alt="" class="full-size-image ${
      (await checkImageExist(data?.actor?.image)) ? "" : "hide-element"
    }">
                      </div>
                      <div class="dashboard-snap-reviewer-name-wrapper" bis_skin_checked="1">
                          <div class="dashboard-snap--reviewer-name" bis_skin_checked="1">${
                            data?.actor?.name
                          }</div>
                          <div class="dashboard-snap--reviewer-join-details" bis_skin_checked="1">54 Sessions Joined Jun
                              ‘24</div>
                      </div>
                  </div>
                  <div class="dashboard-snap-review-time-wrapper" bis_skin_checked="1">
                      <div class="dashboard-snap-review-time" bis_skin_checked="1">${reviewTime}</div>
                  </div>
              </div>
              <div class="dashboard-snap-review-text" bis_skin_checked="1">${
                data?.object?.description
              }</div>
          </div>
          <div class="dashboard-snap-review-class-details-wrapper" bis_skin_checked="1">
              <div class="dashboard-snap-review-class-details-title" bis_skin_checked="1">Class Details</div>
              <div class="dashboard-snap-review-class-details" bis_skin_checked="1">${
                data?.object?.foreignObject?.className
              } | ${formatTime(
      data?.object?.foreignObject?.classDateTime
    )} | By ${data?.object?.foreignObject?.teacherName}</div>
          </div>
      </div><img src= ${
        (await checkImageExist(data?.foreignObject?.teacherImage))
          ? data?.foreignObject?.teacherImage
          : "https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/67691f03eb5bfa3289b3e760_Shvasa%20logo%20art.svg"
      }
          loading="lazy" alt="" class="dashboard-snap-review-teacher-image-wrapper ${
        (await checkImageExist(data?.foreignObject?.teacherImage)) ? '' : 'object-fit-contain'}">
  </div>
      `;
  };

  // Post HTML Markup Generator
  const postHTMLMarkupGenerator = async function (data) {
    const postTime = getEventTime(data?.object?.createdAt);
    return `
      <div class="dashboard-snap-post-wrapper" bis_skin_checked="1">
      <div class="dashboard-snap-post-details-wrapper" bis_skin_checked="1">
          <div class="dashboard-snap-post-user-details-container" bis_skin_checked="1">
              <div class="dashboard-snap-post-user-details-wrapper" bis_skin_checked="1">
                  <div class="dashboard-snap-post-user-image-wrapper" bis_skin_checked="1">
                      <div class="${
                        await checkImageExist(data?.actor?.image)
                          ? "hide-element"
                          : ""
                      }" bis_skin_checked="1">${data?.actor?.name.slice(
      0,
      1
    )}</div><img
                          src=${data?.actor?.image}
                          loading="lazy" alt="" class="full-size-image ${
                            (await checkImageExist(data?.actor?.image))
                              ? ""
                              : "hide-element"
                          }">
                  </div>
                  <div class="dashboard-snap-post-user-name-wrapper" bis_skin_checked="1">
                      <div class="dashboard-snap-post-user-name" bis_skin_checked="1">${
                        data?.actor?.name
                      }</div>
                      <div class="dashboard-snap-post-user-joined-details" bis_skin_checked="1">54 Sessions Joined Jun ‘24
                      </div>
                  </div>
              </div>
              <div class="dashboard-snap-post-time-wrapper" bis_skin_checked="1">
                  <div class="dashboard-snap-post-time" bis_skin_checked="1">${postTime}</div>
              </div>
          </div>
          <div class="dashboard-snap-post-image-wrapper" bis_skin_checked="1">
                    ${await checkMediaType(data)}
          </div>
          <div class="dashboard-snap-post-interaction-blocks-wrapper" bis_skin_checked="1">
              <div class="dashboard-snap-post-interaction-block" bis_skin_checked="1">
                  <div class="dashboard-snap-post-interaction-number" bis_skin_checked="1">${
                    data?.reaction_counts?.LOVE || 0
                  }</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c381302773740d1541_Vectors-Wrapper.svg"
                      loading="lazy" width="18.636960983276367" height="19.2138729095459" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
              <div class="dashboard-snap-post-interaction-block-2" bis_skin_checked="1">
                  <div class="dashboard-snap-post-interaction-number" bis_skin_checked="1">${
                    data?.reaction_counts?.COMMENT || 0
                  }</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c4ed5416943cdb7290_Vectors-Wrapper.svg"
                      loading="lazy" width="18.882944107055664" height="17.381507873535156" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
              <div class="dashboard-snap-post-interaction-block-2 hide-element" bis_skin_checked="1">
                  <div class="dashboard-snap-post-interaction-number" bis_skin_checked="1">62</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c510e20e7786b9d3ee_Vectors-Wrapper.svg"
                      loading="lazy" width="23.73311996459961" height="14.10163688659668" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
              <div class="dashboard-snap-post-interaction-block-3 hide-element" bis_skin_checked="1">
                  <div class="dashboard-snap-post-interaction-number" bis_skin_checked="1">23</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c56d779dc16fdb8cbb_Vectors-Wrapper.svg"
                      loading="lazy" width="18.299097061157227" height="21.36768913269043" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
          </div>
          <div class="dashboard-snap-post-text" bis_skin_checked="1">${
            data?.object?.description
          }</div>
      </div>
  </div>
    `;
  };

  allDataObj.reviewParentEl.insertAdjacentHTML(
    "beforeend",
    await reviewHTMLMarkupGenerator(allDataObj.review)
  );

  allDataObj.postParentEl.insertAdjacentHTML(
    "beforeend",
    await postHTMLMarkupGenerator(allDataObj.post)
  );
};
renderDashboardSnaps();
