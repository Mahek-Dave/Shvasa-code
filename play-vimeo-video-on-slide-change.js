const playVimeoVideoOnSlideChange = function () {
  const slider = document.querySelector(".lp-rw-hero-slider");
  const sliderDots = Array.from(slider.querySelectorAll(".w-slider-dot"));
  const allVideoPlayer = Array.from(
    document.querySelectorAll(".lp-rw-hero-player")
  );
  const allVimeoPlayers = [];

  allVideoPlayer.forEach((player) => {
    allVimeoPlayers.push(new Vimeo.Player(player));
  });

  console.log(allVimeoPlayers);

  const playActiveVideo = function (activePLayer) {
    // const activePlayer = parentEl.querySelector('.vimeoPlayer');

    // Pause all players first
    allVimeoPlayers.forEach((p) => p.pause());

    // Play the selected player
    activePLayer.play();
  };

  const callbackFn = function (mutationList) {
    mutationList.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (mutation.target.classList.contains("w-active")) {
          const activedot = sliderDots.filter((dot) =>
            dot.classList.contains("w-active")
          );
          const activeNumber = sliderDots.indexOf(activedot[0]);

          const activePlayer = allVimeoPlayers[activeNumber];
          console.log(activePlayer);
          playActiveVideo(activePlayer);
        }
      }
    });
  };

  const config = { attributes: true };

  const observer = new MutationObserver(callbackFn);

  sliderDots.forEach((dot) => observer.observe(dot, config));
};
