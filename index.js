// Cleaned up and customized code

import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const gamesContainer = document.getElementById("games-container");
function addGamesToPage(games) {
  for (const game of games) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <img src="${game.img}" alt="Screenshot of ${game.name}" class="game-img" />
      <h3>${game.name}</h3>
      <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
      <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
    `;
    gamesContainer.appendChild(gameCard);
  }
}

addGamesToPage(GAMES_JSON);


const totalContributions = GAMES_JSON.reduce((sum,g) => sum + g.backers, 0);
document.getElementById("num-contributions").innerHTML =
  `<strong>${totalContributions.toLocaleString()}</strong>`;

const totalRaised = GAMES_JSON.reduce((sum,g) => sum + g.pledged, 0);
document.getElementById("total-raised").innerHTML =
  `<strong>$${totalRaised.toLocaleString()}</strong>`;

const totalGames = GAMES_JSON.length;
document.getElementById("num-games").innerHTML =
  `<strong>${totalGames}</strong>`;


const descriptionContainer = document.getElementById("description-container");
const numUnfunded = GAMES_JSON.filter(g => g.pledged < g.goal).length;
const descriptionString = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
  Currently, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.
  We need your help to fund ${numUnfunded === 1 ? 'this amazing game!' : 'these amazing games!'}
`;
const descriptionPara = document.createElement("p");
descriptionPara.innerText = descriptionString.trim();
descriptionContainer.appendChild(descriptionPara);


const [topGame, runnerUp] = [...GAMES_JSON]
  .sort((a,b) => b.pledged - a.pledged);

const firstGameContainer = document.getElementById("first-game");
const topEl = document.createElement("p");
topEl.innerText = topGame.name;
firstGameContainer.appendChild(topEl);

const secondGameContainer = document.getElementById("second-game");
const runnerEl = document.createElement("p");
runnerEl.innerText = runnerUp.name;
secondGameContainer.appendChild(runnerEl);


function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON.filter(g => g.pledged < g.goal));
}
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON.filter(g => g.pledged >= g.goal));
}
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

document.getElementById("unfunded-btn")
  .addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn")
  .addEventListener("click", filterFundedOnly);
document.getElementById("all-btn")
  .addEventListener("click", showAllGames);


const searchInput = document.getElementById("game-search");
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  deleteChildElements(gamesContainer);
  addGamesToPage(
    GAMES_JSON.filter(game =>
      game.name.toLowerCase().includes(term)
    )
  );
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
