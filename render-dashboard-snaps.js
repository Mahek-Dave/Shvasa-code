/* ==========================================================
   Dashboard Snaps — optimized version
   ==========================================================
   Fixes applied (see chat for full explanation):
   1. No longer runs on initial page load — deferred via
      IntersectionObserver until the review/post section is
      actually about to enter the viewport.
   2. checkImageExist is memoized (per URL) and uses a HEAD
      request instead of GET, so each image is checked
      over the network at most once instead of downloading
      the whole image twice.
   3. Video is no longer eager/autoplay-on-insert. It uses
      preload="none" + a data-src pattern, and only gets its
      real <source src> assigned (and starts playing) once
      it scrolls into view. It pauses when scrolled out and
      is only ever loaded once (guarded by a flag).
   4. Guards added for missing DOM nodes / empty API data
      so the script fails safely instead of throwing.
   5. Fixed: `data?.object?.video.length` → optional-chained
      all the way (`data?.object?.video?.length`), which
      previously could throw if `video` was undefined.
   6. Fixed: day pluralization bug — "1 day" / "3 day" both
      rendered as "day" because the ternary always returned
      "". Now correctly renders "1 day" / "3 days".
   7. Fixed: fragile `querySelectorAll('.dashboard-snap-review-text')[1]`
      trimming logic, which silently breaks if any other
      review/post with that class exists elsewhere on the
      page. Now scoped to the freshly inserted node only.
   8. Fixed: unsafe `data?.object?.video?.at(0).url` (missing
      optional chaining before `.url`, and an unquoted `src`
      attribute that could break on special characters).
   9. Text fields coming from the API (name, description)
      are now HTML-escaped before insertion to avoid
      accidentally breaking markup or enabling injection.
   10. Removed leftover `bis_skin_checked="1"` attributes —
       these are injected by a browser extension (not part
       of your app) and were accidentally committed into the
       template strings.
   11. Repeated fallback logo URL and API endpoint pulled out
       into constants instead of being duplicated inline.
   ========================================================== */

const DASHBOARD_SNAPS_CONFIG = {
  apiUrl: "https://services.shvasa.com/api/community/webflowReviewData",
  fallbackImage:
    "https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/67691f03eb5bfa3289b3e760_Shvasa%20logo%20art.svg",
  // How early (in px) before entering the viewport we start
  // fetching/rendering. Gives things time to load smoothly
  // instead of popping in right at the edge of the screen.
  rootMargin: "300px",
};

// ---- Image-existence cache (fix #2) -----------------------
// Every unique URL is checked over the network at most once,
// no matter how many times checkImageExist() is called for it.
const imageExistCache = new Map();

const checkImageExist = async function (imageURL) {
  if (!imageURL) return false;
  if (imageExistCache.has(imageURL)) {
    return imageExistCache.get(imageURL);
  }
  const pending = (async () => {
    try {
      // HEAD, not GET — we only need the status code, not the
      // full image payload, so this avoids downloading images
      // twice over (once "just to check", once to actually show).
      const res = await fetch(imageURL, { method: "HEAD" });
      return res.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  })();
  imageExistCache.set(imageURL, pending);
  const result = await pending;
  imageExistCache.set(imageURL, result);
  return result;
};

// ---- Small HTML-escaping helper (fix #9) -------------------
const escapeHTML = function (value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

const renderDashboardSnaps = async () => {
  const allDataObj = {
    alldata: [],
    review: null,
    post: null,
    currentDate: new Date(),
    reviewParentEl: document.querySelector("[data-review]"),
    postParentEl: document.querySelector("[data-post]"),
  };

  // Fix #4 — bail out safely if the target sections don't exist
  // on this page, instead of throwing later on null.insertAdjacentHTML.
  if (!allDataObj.reviewParentEl && !allDataObj.postParentEl) {
    console.log("Dashboard snaps: no [data-review]/[data-post] targets found on this page.");
    return;
  }

  // ---- Getting All Data ----
  const fetchData = async function () {
    try {
      const res = await fetch(DASHBOARD_SNAPS_CONFIG.apiUrl);
      const data = await res.json();
      allDataObj.alldata = Array.isArray(data?.body) ? data.body : [];
    } catch (error) {
      console.log(error);
      allDataObj.alldata = [];
    }
  };
  await fetchData();

  // Filtering Post / Review Data
  allDataObj.post = allDataObj.alldata
    .filter((data) => data?.object?.postType === "POST")
    .at(0);

  allDataObj.review = allDataObj.alldata
    .filter((data) => data?.object?.postType === "REVIEW")
    .at(0);

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
      // Fix #6 — this used to render `${diffInDays} day ago` and
      // `${diffInDays} day ago` for both 1 and many days (the
      // ternary always returned ""). Now correctly pluralizes.
      time = `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    } else {
      time = `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
    }
    return time;
  };

  const formatTime = function (time) {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ---- Media (image/video) markup ----
  // Video: lazy — no `src` on the <source> yet (fix #3), just
  // `data-src`. A shared IntersectionObserver (further down)
  // fills in the real src and calls play()/pause() only once
  // the element is actually near/within the viewport.
  const checkMediaType = async function (data) {
    const videoUrl = data?.object?.video?.at(0)?.url; // fix #8

    if (videoUrl) {
      return `
      <video
        loop
        muted
        playsinline
        preload="none"
        data-wf-ignore="true"
        data-object-fit="cover"
        data-lazy-video
        class="js-lazy-video"
      >
        <source data-src="${escapeHTML(videoUrl)}" data-wf-ignore="true">
      </video>
      `;
    }

    const imageUrl = data?.object?.image?.at(0);
    const resolvedImage = (await checkImageExist(imageUrl))
      ? imageUrl
      : DASHBOARD_SNAPS_CONFIG.fallbackImage;

    return `<img src="${escapeHTML(
      resolvedImage
    )}" loading="lazy" alt="" class="full-size-image">`;
  };

  // ---- Review HTML Markup Generator ----
  const reviewHTMLMarkupGenerator = async function (data) {
    const reviewTime = getEventTime(data?.object?.createdAt);

    // Fix #2 — each of these is now checked once and reused,
    // instead of calling checkImageExist() twice per image.
    const actorImageOk = await checkImageExist(data?.actor?.image);
    const teacherImageOk = await checkImageExist(data?.foreignObject?.teacherImage);

    const actorName = escapeHTML(data?.actor?.name);
    const actorInitial = escapeHTML(data?.actor?.name?.slice(0, 1));

    return `
      <div class="dashboard-snap-review-wrapper">
      <div class="dashboard-snap-review-text-wrapper">
          <div class="dashboard-snap-review-details">
              <div class="dashboard-snap-reviewer-details-container">
                  <div class="dashboard-snap-reviewer-details-wrapper">
                      <div class="dashboard-snap-reviewer-image-wrapper">
                          <div class="${actorImageOk ? "hide-element" : ""}">${actorInitial}</div>
                          <img src="${escapeHTML(
                            data?.actor?.image
                          )}" loading="lazy" alt="" class="full-size-image ${
      actorImageOk ? "" : "hide-element"
    }">
                      </div>
                      <div class="dashboard-snap-reviewer-name-wrapper">
                          <div class="dashboard-snap--reviewer-name">${actorName}</div>
                          <div class="dashboard-snap--reviewer-join-details">54 Sessions Joined Jun
                              &lsquo;24</div>
                      </div>
                  </div>
                  <div class="dashboard-snap-review-time-wrapper">
                      <div class="dashboard-snap-review-time">${reviewTime}</div>
                  </div>
              </div>
              <div class="dashboard-snap-review-text">${escapeHTML(
                data?.object?.description
              )}</div>
          </div>
          <div class="dashboard-snap-review-class-details-wrapper">
              <div class="dashboard-snap-review-class-details-title">Class Details</div>
              <div class="dashboard-snap-review-class-details">${escapeHTML(
                data?.object?.foreignObject?.className
              )} | ${formatTime(
      data?.object?.foreignObject?.classDateTime
    )} | By ${escapeHTML(data?.object?.foreignObject?.teacherName)}</div>
          </div>
      </div><img src="${escapeHTML(
        teacherImageOk
          ? data?.foreignObject?.teacherImage
          : DASHBOARD_SNAPS_CONFIG.fallbackImage
      )}"
          loading="lazy" alt="" class="dashboard-snap-review-teacher-image-wrapper ${
        teacherImageOk ? "" : "object-fit-contain"
      }">
  </div>
      `;
  };

  // ---- Post HTML Markup Generator ----
  const postHTMLMarkupGenerator = async function (data) {
    const postTime = getEventTime(data?.object?.createdAt);

    // Fix #2 — checked once, reused below (was checked twice before).
    const actorImageOk = await checkImageExist(data?.actor?.image);
    const actorName = escapeHTML(data?.actor?.name);
    const actorInitial = escapeHTML(data?.actor?.name?.slice(0, 1));

    return `
      <div class="dashboard-snap-post-wrapper">
      <div class="dashboard-snap-post-details-wrapper">
          <div class="dashboard-snap-post-user-details-container">
              <div class="dashboard-snap-post-user-details-wrapper">
                  <div class="dashboard-snap-post-user-image-wrapper">
                      <div class="${actorImageOk ? "hide-element" : ""}">${actorInitial}</div><img
                          src="${escapeHTML(data?.actor?.image)}"
                          loading="lazy" alt="" class="full-size-image ${
                            actorImageOk ? "" : "hide-element"
                          }">
                  </div>
                  <div class="dashboard-snap-post-user-name-wrapper">
                      <div class="dashboard-snap-post-user-name">${actorName}</div>
                      <div class="dashboard-snap-post-user-joined-details">54 Sessions Joined Jun &lsquo;24
                      </div>
                  </div>
              </div>
              <div class="dashboard-snap-post-time-wrapper">
                  <div class="dashboard-snap-post-time">${postTime}</div>
              </div>
          </div>
          <div class="dashboard-snap-post-image-wrapper">
                    ${await checkMediaType(data)}
          </div>
          <div class="dashboard-snap-post-interaction-blocks-wrapper">
              <div class="dashboard-snap-post-interaction-block">
                  <div class="dashboard-snap-post-interaction-number">${
                    data?.reaction_counts?.LOVE || 0
                  }</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c381302773740d1541_Vectors-Wrapper.svg"
                      loading="lazy" width="18.636960983276367" height="19.2138729095459" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
              <div class="dashboard-snap-post-interaction-block-2">
                  <div class="dashboard-snap-post-interaction-number">${
                    data?.reaction_counts?.COMMENT || 0
                  }</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c4ed5416943cdb7290_Vectors-Wrapper.svg"
                      loading="lazy" width="18.882944107055664" height="17.381507873535156" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
              <div class="dashboard-snap-post-interaction-block-2 hide-element">
                  <div class="dashboard-snap-post-interaction-number">62</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c510e20e7786b9d3ee_Vectors-Wrapper.svg"
                      loading="lazy" width="23.73311996459961" height="14.10163688659668" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
              <div class="dashboard-snap-post-interaction-block-3 hide-element">
                  <div class="dashboard-snap-post-interaction-number">23</div><img
                      src="https://cdn.prod.website-files.com/67337f0d7f84f5bca152fdca/677550c56d779dc16fdb8cbb_Vectors-Wrapper.svg"
                      loading="lazy" width="18.299097061157227" height="21.36768913269043" alt=""
                      class="dashboard-snap-post-interaction-icon">
              </div>
          </div>
          <div class="dashboard-snap-post-text">${escapeHTML(data?.object?.description)}</div>
      </div>
  </div>
    `;
  };

  // ---- Insert Review ----
  if (allDataObj.reviewParentEl && allDataObj.review) {
    const beforeCount = allDataObj.reviewParentEl.querySelectorAll(
      ".dashboard-snap-review-text"
    ).length;
    allDataObj.reviewParentEl.insertAdjacentHTML(
      "beforeend",
      await reviewHTMLMarkupGenerator(allDataObj.review)
    );

    // Fix #7 — trim the *just-inserted* review text instead of
    // assuming it's always document-wide index [1], which broke
    // if any other ".dashboard-snap-review-text" existed elsewhere.
    const insertedReviewTextEls = allDataObj.reviewParentEl.querySelectorAll(
      ".dashboard-snap-review-text"
    );
    const reviewTextElement = insertedReviewTextEls[beforeCount];
    if (reviewTextElement) {
      const fullText = reviewTextElement.textContent;
      const lastNewlineIndex = fullText.lastIndexOf("\n");
      const newText =
        lastNewlineIndex !== -1
          ? fullText.substring(0, lastNewlineIndex).trim()
          : fullText.trim();
      reviewTextElement.textContent = newText;
    }
  }

  // ---- Insert Post ----
  if (allDataObj.postParentEl && allDataObj.post) {
    allDataObj.postParentEl.insertAdjacentHTML(
      "beforeend",
      await postHTMLMarkupGenerator(allDataObj.post)
    );
  }

  // ---- Lazy video activation (fix #3) ----
  // Videos are inserted with preload="none" and no real <source src>.
  // This observer assigns the src (once) and plays/pauses based on
  // visibility, so nothing downloads until it's actually on-screen.
  const lazyVideos = document.querySelectorAll(".js-lazy-video");
  if (lazyVideos.length) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const source = video.querySelector("source[data-src]");

          if (entry.isIntersecting) {
            // Only ever assign the src once.
            if (source && !video.dataset.loaded) {
              source.src = source.dataset.src;
              video.load();
              video.dataset.loaded = "true";
            }
            video.play().catch(() => {
              /* autoplay can be blocked by the browser; that's fine */
            });
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: DASHBOARD_SNAPS_CONFIG.rootMargin }
    );

    lazyVideos.forEach((video) => videoObserver.observe(video));
  }
};

// ==========================================================
// Defer everything (fix #1): instead of calling
// renderDashboardSnaps() immediately on script load, wait
// until the review/post section is about to scroll into view.
// ==========================================================
(function initDashboardSnapsLazyLoad() {
  const reviewEl = document.querySelector("[data-review]");
  const postEl = document.querySelector("[data-post]");
  const targets = [reviewEl, postEl].filter(Boolean);

  if (!targets.length) {
    console.log("Dashboard snaps: no [data-review]/[data-post] targets found on this page.");
    return;
  }

  let hasRendered = false;

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      const isNear = entries.some((entry) => entry.isIntersecting);
      if (isNear && !hasRendered) {
        hasRendered = true;
        renderDashboardSnaps();
        // Job's done — stop observing so this never re-fires.
        observer.disconnect();
      }
    },
    { rootMargin: DASHBOARD_SNAPS_CONFIG.rootMargin }
  );

  targets.forEach((el) => sectionObserver.observe(el));
})();
