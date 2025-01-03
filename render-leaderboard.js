const renderLeaderboard = async function () {
  const leaderboardData = {
    leaderboardURL: "https://services.shvasa.com/api/user/leaderBoardStats",
    monthLeaderboard: "",
    monthParentEl: document.querySelector("[data-leaderboard-month]"),
    yearParentEl: document.querySelector("[data-leaderboard-all-time]"),
    yearLeaderboard: "",
  };

  // Function to Get and Set Leaderboard Data
  const fetchAndSetData = async (url, objectProperty) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Respone Status : ${res.status}`);
      const data = await res.json();

      leaderboardData[objectProperty] = data.body;
    } catch (error) {
      console.error(error.message);
    }
  };

  // Getting Monthly Data
  await fetchAndSetData(leaderboardData.leaderboardURL, "monthLeaderboard");

  // Getting Yearly Data
  await fetchAndSetData(
    `${leaderboardData.leaderboardURL}?type=all`,
    "yearLeaderboard"
  );

  // HTML Markup
  const generateMarkup = function (data) {
    return `
              <div class="dashboard-snap-leaderboard-block" bis_skin_checked="1">
          <div class="dashboard-snap-leaderboard-user-info" bis_skin_checked="1">
              <div class="dashboard-snap-leaderboard-block-user-name-location" bis_skin_checked="1">
                  <div class="dashboard-snap-leaderboard-block-user-name" bis_skin_checked="1">${
                    data?.name
                  }</div>
                  <div class="dashboard-snap-leaderboard-block-user-location" bis_skin_checked="1">${
                    data?.location?.city
                  }, ${data?.location?.region}, ${data?.location?.country}</div>
              </div>
              <div class="dashboard-snap-leaderboard-block-user-contry-flag-wrapper" bis_skin_checked="1"><img
                      src="https://flagcdn.com/${data?.location?.country.toLowerCase()}.svg" loading="lazy"
                      alt="" class="full-size-image"></div>
          </div>
          <div class="dashboard-snap-leaderboard-block-user-yoga-hrs" bis_skin_checked="1">${
            data?.score
          } hr</div>
      </div>
          `;
  };

  leaderboardData.monthLeaderboard.forEach((data) => {
    const HTML = generateMarkup(data);
    leaderboardData.monthParentEl.insertAdjacentHTML("beforeend", HTML);
  });

  leaderboardData.yearLeaderboard.forEach((data) => {
    const HTML = generateMarkup(data);
    leaderboardData.yearParentEl.insertAdjacentHTML("beforeend", HTML);
  });
};
