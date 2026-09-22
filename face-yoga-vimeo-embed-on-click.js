const playButtons = document.getElementsByClassName("video-play-btn"),
  playButtonsArr = Array.from(playButtons);

playButtonsArr.forEach((btn) => {
  btn.addEventListener("click", function () {
    const videoSrc = btn.dataset.src;
    const wrapper = btn.closest(".lp-03-testimonial-block");

    const reviewerDetails = wrapper.querySelector(".lp-03-reviewer-details");
    const textOverlay = wrapper.querySelector(".face-yoga-vid-testi-text-overlay"); // adjust to actual class
    const image = wrapper.querySelector(".video-testimonial-image");

    let embedContainer = wrapper.querySelector(".video-embed-container");
    if (!embedContainer) {
      embedContainer = document.createElement("div");
      embedContainer.className = "vimeo-video-embed w-embed w-iframe video-embed-container";
      embedContainer.innerHTML =
        `<iframe src="${videoSrc}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      wrapper.appendChild(embedContainer);
    }

    const iframeEl = embedContainer.querySelector("iframe");
    const player = new Vimeo.Player(iframeEl);

    const hideOnPlay = [btn, image, reviewerDetails, textOverlay].filter(Boolean);

    hideOnPlay.forEach(el => {
      el.style.opacity = "0";
      el.style.display = "none";
    });
    embedContainer.style.opacity = "1";
    embedContainer.style.display = "block";

    player.on("pause", function () {
      hideOnPlay.forEach(el => {
        el.style.opacity = "1";
        el.style.display = el === btn ? "flex" : "block"; // keep button's original display type
      });
      embedContainer.style.opacity = "0";
      embedContainer.style.display = "none";
    });

    player.play();
  });
});
