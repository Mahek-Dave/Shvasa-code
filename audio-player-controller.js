// Select all elements once for efficiency
const allAudioPlayers = Array.from(document.querySelectorAll("audio"));
const allPauseIcons = Array.from(document.querySelectorAll(".lp-03-testimonial-pause-icon"));
const allPlayIcons = Array.from(document.querySelectorAll(".lp-03-testimonial-play-icon"));
const allAudioWrappers = Array.from(document.querySelectorAll(".lp-03-reviewer-audio-wrapper"));

// Function to control visibility of play/pause icons and wrapper
const toggleVisibility = (playBtn, pauseBtn, wrapper, isPlaying) => {
  playBtn.classList.toggle("hide-player-element", isPlaying);
  pauseBtn.classList.toggle("hide-player-element", !isPlaying);
  wrapper.classList.toggle("hide-player-element", !isPlaying);
};

// Function to stop all audio players and reset UI to initial state
const setToInitial = () => {
  allAudioPlayers.forEach((player) => player.pause());
  allPauseIcons.forEach((icon) => icon.classList.add("hide-player-element"));
  allPlayIcons.forEach((icon) => icon.classList.remove("hide-player-element"));
  allAudioWrappers.forEach((wrapper) => wrapper.classList.add("hide-player-element"));
};

// Play button handler
const playAudioPlayer = function () {
  setToInitial(); // Pause other players and reset UI

  const parentBlock = this.closest(".lp-03-testimonial-block");
  const audioPlayBtn = parentBlock.querySelector(".lp-03-testimonial-play-icon");
  const audioPauseBtn = parentBlock.querySelector(".lp-03-testimonial-pause-icon");
  const audioPlayerWrapper = parentBlock.querySelector(".lp-03-reviewer-audio-wrapper");
  const audioPlayer = audioPlayerWrapper.querySelector("audio");

  // Lazily assign the src only when the user actually plays it
  if (!audioPlayer.src && audioPlayer.dataset.src) {
    audioPlayer.src = audioPlayer.dataset.src;
  }

  audioPlayer.play();
  toggleVisibility(audioPlayBtn, audioPauseBtn, audioPlayerWrapper, true);
};

// Pause button handler
const stopAudioPlayer = function () {
  const parentBlock = this.closest(".lp-03-testimonial-block");
  const audioPlayBtn = parentBlock.querySelector(".lp-03-testimonial-play-icon");
  const audioPauseBtn = parentBlock.querySelector(".lp-03-testimonial-pause-icon");
  const audioPlayerWrapper = parentBlock.querySelector(".lp-03-reviewer-audio-wrapper");
  const audioPlayer = audioPlayerWrapper.querySelector("audio");

  audioPlayer.pause();
  toggleVisibility(audioPlayBtn, audioPauseBtn, audioPlayerWrapper, false);
};

// Add event listeners to all play/pause icons
allPlayIcons.forEach((icon) => icon.addEventListener("click", playAudioPlayer));
allPauseIcons.forEach((icon) => icon.addEventListener("click", stopAudioPlayer));
