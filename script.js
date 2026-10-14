"use strict";

const $ = id => document.getElementById(id);
const SAVE_KEY = "mathopoly-save-v1";

const playerCountEl = $("playerCount");
const playerNamesEl = $("playerNames");
const playerSetupEl = $("playerSetup");
const gameControls = $("gameControls");
const startButton = $("startButton");
const resumeButton = $("resumeButton");
const resetButton = $("resetButton");

const boardEl = $("board");
const playersEl = $("players");
const statusEl = $("status");
const rollButton = $("rollButton");
const diceIconEl = $("diceIcon");
const diceResultEl = $("diceResult");

const purchasePanel = $("purchasePanel");
const propertyPrompt = $("propertyPrompt");
const questionForm = $("questionForm");
const questionText = $("questionText");
const answerInput = $("answerInput");
const purchaseActions = $("purchaseActions");
const buyButton = $("buyButton");
const auctionButton = $("auctionButton");

const auctionPanel = $("auctionPanel");
const auctionText = $("auctionText");
const bidInput = $("bidInput");
const bidButton = $("bidButton");
const passBidButton = $("passBidButton");

const ownershipList = $("ownershipList");

const popupOverlay = $("popupOverlay");
const popupTitle = $("popupTitle");
const popupDescription = $("popupDescription");
const popupOk = $("popupOk");

const STARTING_MONEY = 1500;
const START_BONUS = 200;

const playerIcons = ["🔵", "🔴", "🟢", "🟡", "🟣", "🟠", "⚫", "⚪"];
const playerColors = [
  "#2583eb", "#e74c3c", "#27ae60", "#c49a00",
  "#8e44ad", "#e67e22", "#34495e", "#16a085"
];
const diceIcons = [
  "fa-dice-one", "fa-dice-two", "fa-dice-three",
  "fa-dice-four", "fa-dice-five", "fa-dice-six"
];

const tiles = [
  { name: "Mulai", type: "start", info: "Lewat: +$200" },
  { name: "Kelas Aljabar", type: "property", price: 60, rent: 2, group: "brown" },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Ruang Aritmetika", type: "property", price: 60, rent: 4, group: "brown" },
  { name: "Pajak Praktikum", type: "tax", amount: 200 },
  { name: "Stasiun Ilmu", type: "railroad", price: 200, rent: 25 },
  { name: "Kelas Geometri", type: "property", price: 100, rent: 6, group: "lightBlue" },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Laboratorium Sains", type: "property", price: 100, rent: 6, group: "lightBlue" },
  { name: "Perpustakaan Dasar", type: "property", price: 120, rent: 8, group: "lightBlue" },
  { name: "Penjara / Kunjungan", type: "jail", info: "Hanya berkunjung" },
  { name: "Kelas Trigonometri", type: "property", price: 140, rent: 10, group: "pink" },
  { name: "Pembangkit Listrik", type: "utility", price: 150 },
  { name: "Ruang Kalkulus", type: "property", price: 140, rent: 10, group: "pink" },
  { name: "Laboratorium Komputer", type: "property", price: 160, rent: 12, group: "pink" },
  { name: "Stasiun Pengetahuan", type: "railroad", price: 200, rent: 25 },
  { name: "Kelas Statistika", type: "property", price: 180, rent: 14, group: "orange" },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Ruang Persamaan", type: "property", price: 180, rent: 14, group: "orange" },
  { name: "Perpustakaan Matematika", type: "property", price: 200, rent: 16, group: "orange" },
  { name: "Parkir Gratis", type: "free", info: "Tidak ada biaya" },
  { name: "Matematika Diskrit", type: "property", price: 220, rent: 18, group: "red" },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Laboratorium Robotika", type: "property", price: 220, rent: 18, group: "red" },
  { name: "Teori Bilangan", type: "property", price: 240, rent: 20, group: "red" },
  { name: "Stasiun Akademik", type: "railroad", price: 200, rent: 25 },
  { name: "Aljabar Linear", type: "property", price: 260, rent: 22, group: "yellow" },
  { name: "Pusat Riset", type: "property", price: 260, rent: 22, group: "yellow" },
  { name: "Instalasi Air", type: "utility", price: 150 },
  { name: "Laboratorium Fisika", type: "property", price: 280, rent: 24, group: "yellow" },
  { name: "Masuk Penjara", type: "goToJail", info: "Langsung ke penjara" },
  { name: "Persamaan Diferensial", type: "property", price: 300, rent: 26, group: "green" },
  { name: "Observatorium Sains", type: "property", price: 300, rent: 26, group: "green" },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Pusat Olimpiade", type: "property", price: 320, rent: 28, group: "green" },
  { name: "Stasiun Riset", type: "railroad", price: 200, rent: 25 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Akademi Matematika", type: "property", price: 350, rent: 35, group: "darkBlue" },
  { name: "Biaya Ujian", type: "tax", amount: 100 },
  { name: "Universitas Matematika", type: "property", price: 400, rent: 50, group: "darkBlue" }
];

const groups = {
  brown: { color: "#955436", tiles: [1, 3] },
  lightBlue: { color: "#8bd3e6", tiles: [6, 8, 9] },
  pink: { color: "#d66ba0", tiles: [11, 13, 14] },
  orange: { color: "#ed8b2f", tiles: [16, 18, 19] },
  red: { color: "#d94343", tiles: [21, 23, 24] },
  yellow: { color: "#e5c441", tiles: [26, 27, 29] },
  green: { color: "#26864a", tiles: [31, 32, 34] },
  darkBlue: { color: "#344b9a", tiles: [37, 39] }
};

const communityCards = [
  { text: "Kamu mendapat beasiswa. Terima $100.", amount: 100 },
  { text: "Menang lomba matematika. Terima $50.", amount: 50 },
  { text: "Bayar biaya buku sebesar $40.", amount: -40 },
  { text: "Menjadi tutor. Terima $75.", amount: 75 },
  { text: "Bayar denda perpustakaan sebesar $20.", amount: -20 }
];

let players = [];
let currentPlayer = 0;
let pendingPurchase = null;
let auction = null;
let busy = false;
let gameOver = false;
let extraTurn = false;
let doublesInRow = 0;

function renderNameInputs() {
  const count = Number(playerCountEl.value);

  playerNamesEl.innerHTML = Array.from({ length: count }, (_, index) => `
    <div class="player-name-field">
      <label for="playerName${index}">Nama Pemain ${index + 1}</label>
      <input id="playerName${index}" maxlength="20"
        value="Pemain ${index + 1}">
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function resetTiles() {
  tiles.forEach(tile => {
    tile.owner = null;
  });
}

function boardPosition(index) {
  if (index <= 10) return { col: 11 - index, row: 11 };
  if (index <= 20) return { col: 1, row: 21 - index };
  if (index <= 30) return { col: index - 19, row: 1 };
  return { col: 11, row: index - 29 };
}

function startGame() {
  players = Array.from({ length: Number(playerCountEl.value) }, (_, index) => {
    const input = $(`playerName${index}`);
    return {
      name: input.value.trim() || `Pemain ${index + 1}`,
      icon: playerIcons[index],
      color: playerColors[index],
      position: 0,
      money: STARTING_MONEY,
      active: true
    };
  });

  resetTiles();
  currentPlayer = 0;
  pendingPurchase = null;
  auction = null;
  busy = false;
  gameOver = false;
  extraTurn = false;
  doublesInRow = 0;

  playerSetupEl.hidden = true;
  gameControls.hidden = false;
  purchasePanel.hidden = true;
  auctionPanel.hidden = true;
  rollButton.disabled = false;
  diceResultEl.textContent = "—";
  diceIconEl.className = "fas fa-dice-one";
  statusEl.textContent = `Giliran ${players[0].name}. Lempar dadu!`;

  render();
  saveGame();
}

function render() {
  if (!players.length) return;

  boardEl.innerHTML = tiles.map((tile, index) => {
    const position = boardPosition(index);
    const owner = Number.isInteger(tile.owner) ? players[tile.owner] : null;
    const tokens = players
      .filter(player => player.active && player.position === index)
      .map(player =>
        `<span class="token" title="${escapeHtml(player.name)}">${player.icon}</span>`
      ).join("");

    let info = tile.info || "";
    if (tile.price !== undefined) info = `Harga $${tile.price}`;
    if (tile.type === "tax") info = `Bayar $${tile.amount}`;

    const band = tile.group
      ? `<div class="tile-band" style="background:${groups[tile.group].color}"></div>`
      : "";

    const ownerMarker = owner
      ? `<div class="owner-marker" style="--owner-color:${owner.color}">
          Milik ${escapeHtml(owner.name)}
        </div>`
      : "";

    return `
      <div class="tile ${players[currentPlayer].position === index ? "current" : ""}
        ${owner ? "owned" : ""}"
        style="grid-column:${position.col};grid-row:${position.row};
        --owner-color:${owner ? owner.color : "transparent"}">
        ${band}
        <div>
          <div class="tile-name">${escapeHtml(tile.name)}</div>
          <div class="tile-info">${escapeHtml(info)}</div>
          ${ownerMarker}
        </div>
        <div class="tokens">${tokens}</div>
      </div>
    `;
  }).join("") + `
    <div class="board-center">
      <h2>🎲 MATHOPOLY</h2>
      <p>Jawab soal, beli properti, dan kumpulkan uang!</p>
      <strong>Giliran: ${escapeHtml(players[currentPlayer].name)}</strong>
      <span>Dadu: ${escapeHtml(diceResultEl.textContent)}</span>
    </div>
  `;

  playersEl.innerHTML = players.map((player, index) => `
    <div class="player-card ${index === currentPlayer ? "active" : ""}">
      <div class="player-top">
        <span>${player.icon} ${escapeHtml(player.name)}</span>
        <span>${player.active ? "" : "Bangkrut"}</span>
      </div>
      <div class="player-money">Uang: $${player.money}</div>
    </div>
  `).join("");

  renderOwnership();
}

function renderOwnership() {
  ownershipList.innerHTML = players.map((player, playerIndex) => {
    const owned = tiles.filter(tile => tile.owner === playerIndex);

    return `
      <div class="ownership-group">
        <strong>${player.icon} ${escapeHtml(player.name)}</strong>
        ${owned.length
          ? owned.map(tile =>
              `<div class="ownership-property">${escapeHtml(tile.name)}</div>`
            ).join("")
          : `<div class="ownership-property">Belum memiliki properti</div>`}
      </div>
    `;
  }).join("");
}

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

async function movePlayer(player, steps) {
  for (let step = 0; step < steps; step++) {
    if (!player.active) return;

    const previous = player.position;
    player.position = (player.position + 1) % tiles.length;

    if (player.position === 0 && previous !== 0) {
      player.money += START_BONUS;
      statusEl.textContent =
        `${player.name} melewati Mulai dan mendapat $${START_BONUS}.`;
    }

    render();
    await sleep(100);
  }
}

async function rollDice() {
  if (busy || gameOver || pendingPurchase || auction || !players.length) return;

  const player = players[currentPlayer];
  if (!player.active) return;

  busy = true;
  rollButton.disabled = true;

  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  const total = die1 + die2;
  const isDouble = die1 === die2;

  diceIconEl.className = `fas ${diceIcons[die1 - 1]}`;
  diceResultEl.textContent = `${die1} + ${die2} = ${total}`;

  if (isDouble) {
    doublesInRow++;
    if (doublesInRow >= 3) {
      player.position = 10;
      doublesInRow = 0;
      extraTurn = false;
      statusEl.textContent = `${player.name} mendapat tiga kali dadu kembar dan masuk penjara.`;
      finishTurn();
      return;
    }
  } else {
    doublesInRow = 0;
  }

  await movePlayer(player, total);
  await resolveTile(player, total);

  if (pendingPurchase || auction) {
    busy = false;
    return;
  }

  if (gameOver) return;

  if (isDouble && player.active) {
    extraTurn = true;
    busy = false;
    rollButton.disabled = false;
    statusEl.textContent += " Dadu kembar! Lempar lagi.";
    render();
    saveGame();
  } else {
    extraTurn = false;
    finishTurn();
  }
}

async function resolveTile(player, diceTotal) {
  const tile = tiles[player.position];

  if (tile.type === "property" ||
      tile.type === "railroad" ||
      tile.type === "utility") {
    if (!Number.isInteger(tile.owner)) {
      askPurchaseQuestion(player.position, player);
      return;
    }

    if (tile.owner !== currentPlayer) {
      const owner = players[tile.owner];
      const rent = tile.type === "property"
        ? tile.rent
        : tile.type === "railroad"
          ? 25
          : diceTotal * 4;

      player.money -= rent;
      owner.money += rent;
      statusEl.textContent =
        `${player.name} membayar sewa $${rent} kepada ${owner.name}.`;
      render();
    } else {
      statusEl.textContent = `${player.name} mendarat di ${tile.name}.`;
    }
    return;
  }

  if (tile.type === "tax") {
    player.money -= tile.amount;
    statusEl.textContent = `${player.name} membayar pajak $${tile.amount}.`;
  } else if (tile.type === "community") {
    const card = communityCards[
      Math.floor(Math.random() * communityCards.length)
    ];
    player.money += card.amount;
    await showPopup("Dana Beasiswa", card.text);
    statusEl.textContent = `${player.name} mengambil kartu Dana Beasiswa.`;
  } else if (tile.type === "chance") {
    const a = Math.floor(Math.random() * 12) + 3;
    const b = Math.floor(Math.random() * 12) + 3;
    const answer = window.prompt(`Kartu Tantangan: Berapakah ${a} × ${b}?`);

    if (answer !== null && Number(answer) === a * b) {
      player.money += 50;
      statusEl.textContent = "Jawaban benar! Kamu mendapat $50.";
    } else {
      player.money -= 50;
      statusEl.textContent = `Jawaban salah. Jawabannya ${a * b}; uang berkurang $50.`;
    }
  } else if (tile.type === "goToJail") {
    player.position = 10;
    extraTurn = false;
    doublesInRow = 0;
    statusEl.textContent = `${player.name} masuk penjara.`;
  } else {
    statusEl.textContent = `${player.name} mendarat di ${tile.name}.`;
  }

  render();
}

function askPurchaseQuestion(tileIndex, player) {
  const a = Math.floor(Math.random() * 12) + 3;
  const b = Math.floor(Math.random() * 12) + 3;

  pendingPurchase = {
    tileIndex,
    playerIndex: players.indexOf(player),
    answer: a * b
  };

  propertyPrompt.textContent =
    `Jawab soal untuk membeli ${tiles[tileIndex].name} seharga $${tiles[tileIndex].price}.`;
  questionText.textContent = `Berapakah ${a} × ${b}?`;
  answerInput.value = "";
  purchasePanel.hidden = false;
  purchaseActions.hidden = true;
  questionForm.hidden = false;
  answerInput.focus();
  saveGame();
}

function finishPurchase() {
  pendingPurchase = null;
  purchasePanel.hidden = true;
  purchaseActions.hidden = true;

  if (extraTurn && !gameOver) {
    extraTurn = false;
    busy = false;
    rollButton.disabled = false;
    statusEl.textContent =
      `Giliran ${players[currentPlayer].name}. Lempar lagi!`;
    render();
    saveGame();
    return;
  }

  extraTurn = false;
  finishTurn();
}

function buyProperty() {
  if (!pendingPurchase) return;

  const { tileIndex, playerIndex } = pendingPurchase;
  const tile = tiles[tileIndex];
  const player = players[playerIndex];

  if (!tile || !player || tile.owner !== null) {
    statusEl.textContent = "Properti sudah tidak tersedia.";
    finishPurchase();
    return;
  }

  if (player.money < tile.price) {
    statusEl.textContent = "Uang tidak cukup. Properti akan dilelang.";
    startAuction();
    return;
  }

  player.money -= tile.price;
  tile.owner = playerIndex;
  statusEl.textContent =
    `${player.name} membeli ${tile.name} seharga $${tile.price}.`;

  render();
  saveGame();
  finishPurchase();
}

function startAuction() {
  if (!pendingPurchase) return;

  questionForm.hidden = true;
  purchaseActions.hidden = true;
  auctionPanel.hidden = false;

  auction = {
    tileIndex: pendingPurchase.tileIndex,
    bidder: 0,
    highBid: 0,
    highBidder: null,
    passed: new Set()
  };

  auction.bidder = pendingPurchase.playerIndex;
  updateAuction();
}

function updateAuction() {
  if (!auction) return;

  auctionText.textContent =
    `Giliran ${players[auction.bidder].name}. Tawaran tertinggi: $${auction.highBid}.`;
  bidInput.value = "";
  bidInput.min = String(auction.highBid + 1);
  bidInput.max = String(players[auction.bidder].money);
}

function submitBid() {
  if (!auction) return;

  const amount = Number(bidInput.value);
  const player = players[auction.bidder];

  if (!Number.isInteger(amount) || amount <= auction.highBid) {
    auctionText.textContent = "Tawaran harus lebih tinggi dari tawaran tertinggi.";
    return;
  }

  if (amount > player.money) {
    auctionText.textContent = "Uang pemain tidak cukup.";
    return;
  }

  auction.highBid = amount;
  auction.highBidder = auction.bidder;
  auction.passed.add(auction.bidder);
  nextBidder();
}

function passBid() {
  if (!auction) return;
  auction.passed.add(auction.bidder);
  nextBidder();
}

function nextBidder() {
  if (!auction) return;

  const activeIndexes = players
    .map((player, index) => player.active ? index : -1)
    .filter(index => index >= 0);

  const remaining = activeIndexes.filter(index => !auction.passed.has(index));

  if (remaining.length === 0 ||
      (remaining.length === 1 && auction.highBidder !== null)) {
    finishAuction();
    return;
  }

  const currentPosition = activeIndexes.indexOf(auction.bidder);

  for (let step = 1; step <= activeIndexes.length; step++) {
    const candidate =
      activeIndexes[(currentPosition + step) % activeIndexes.length];

    if (!auction.passed.has(candidate)) {
      auction.bidder = candidate;
      break;
    }
  }

  updateAuction();
}

function finishAuction() {
  if (!auction) return;

  const tile = tiles[auction.tileIndex];

  if (auction.highBidder !== null) {
    const winner = players[auction.highBidder];
    winner.money -= auction.highBid;
    tile.owner = auction.highBidder;
    statusEl.textContent =
      `${winner.name} memenangkan lelang ${tile.name} seharga $${auction.highBid}.`;
  } else {
    statusEl.textContent = `Tidak ada tawaran untuk ${tile.name}.`;
  }

  auction = null;
  auctionPanel.hidden = true;
  render();
  saveGame();
  finishPurchase();
}

function finishTurn() {
  if (gameOver) return;

  busy = false;

  if (players.filter(player => player.active).length <= 1) {
    gameOver = true;
    const winner = players.find(player => player.active);
    statusEl.textContent = winner
      ? `Permainan selesai. Pemenang: ${winner.name}!`
      : "Permainan selesai.";
    rollButton.disabled = true;
    render();
    saveGame();
    return;
  }

  if (extraTurn) {
    extraTurn = false;
    rollButton.disabled = false;
    render();
    saveGame();
    return;
  }

  do {
    currentPlayer = (currentPlayer + 1) % players.length;
  } while (!players[currentPlayer].active);

  doublesInRow = 0;
  rollButton.disabled = false;
  statusEl.textContent = `Giliran ${players[currentPlayer].name}. Lempar dadu!`;
  render();
  saveGame();
}

function showPopup(title, description) {
  return new Promise(resolve => {
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupOverlay.style.display = "flex";

    popupOk.onclick = () => {
      popupOverlay.style.display = "none";
      resolve();
    };
  });
}

function saveGame() {
  if (!players.length) {
    localStorage.removeItem(SAVE_KEY);
    resumeButton.hidden = true;
    return;
  }

  const data = {
    players,
    currentPlayer,
    tiles: tiles.map(tile => ({ owner: tile.owner ?? null })),
    gameOver,
    extraTurn,
    doublesInRow,
    status: statusEl.textContent
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    resumeButton.hidden = false;
  } catch (error) {
    console.warn("Permainan tidak dapat disimpan.", error);
  }
}

function loadGame() {
  let data;

  try {
    data = JSON.parse(localStorage.getItem(SAVE_KEY));
  } catch {
    return false;
  }

  if (!data || !Array.isArray(data.players) || !data.players.length) {
    return false;
  }

  players = data.players;
  currentPlayer = Number.isInteger(data.currentPlayer)
    ? data.currentPlayer
    : 0;
  currentPlayer = Math.max(0, Math.min(currentPlayer, players.length - 1));
  gameOver = Boolean(data.gameOver);
  extraTurn = Boolean(data.extraTurn);
  doublesInRow = Number(data.doublesInRow) || 0;

  tiles.forEach((tile, index) => {
    tile.owner = data.tiles?.[index]?.owner ?? null;
  });

  pendingPurchase = null;
  auction = null;
  busy = false;

  playerSetupEl.hidden = true;
  gameControls.hidden = false;
  purchasePanel.hidden = true;
  auctionPanel.hidden = true;
  rollButton.disabled = gameOver;
  statusEl.textContent = data.status || `Giliran ${players[currentPlayer].name}.`;

  render();
  return true;
}

function resetGame() {
  if (players.length &&
      !gameOver &&
      !window.confirm("Mulai ulang permainan? Progres tersimpan akan dihapus.")) {
    return;
  }

  localStorage.removeItem(SAVE_KEY);
  players = [];
  currentPlayer = 0;
  pendingPurchase = null;
  auction = null;
  busy = false;
  gameOver = false;
  extraTurn = false;
  doublesInRow = 0;

  resetTiles();
  playerSetupEl.hidden = false;
  gameControls.hidden = true;
  purchasePanel.hidden = true;
  auctionPanel.hidden = true;
  boardEl.innerHTML = "";
  playersEl.innerHTML = "";
  ownershipList.innerHTML = "";
  diceResultEl.textContent = "—";
  diceIconEl.className = "fas fa-dice-one";
  statusEl.textContent = "Atur pemain, lalu tekan Mulai Permainan.";
  rollButton.disabled = true;
  resumeButton.hidden = true;
}

playerCountEl.addEventListener("change", renderNameInputs);
startButton.addEventListener("click", startGame);
rollButton.addEventListener("click", rollDice);
buyButton.addEventListener("click", buyProperty);
auctionButton.addEventListener("click", startAuction);
bidButton.addEventListener("click", submitBid);
passBidButton.addEventListener("click", passBid);
resetButton.addEventListener("click", resetGame);

resumeButton.addEventListener("click", () => {
  if (loadGame()) {
    statusEl.textContent =
      `Permainan dilanjutkan. Giliran ${players[currentPlayer].name}.`;
  }
});

questionForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!pendingPurchase) return;

  if (Number(answerInput.value) !== pendingPurchase.answer) {
    statusEl.textContent =
      `Jawaban salah. Jawaban yang benar: ${pendingPurchase.answer}. Properti dilelang.`;
    startAuction();
    return;
  }

  questionForm.hidden = true;
  purchaseActions.hidden = false;
  propertyPrompt.textContent =
    `Jawaban benar! Mau membeli ${tiles[pendingPurchase.tileIndex].name}?`;
});

window.addEventListener("beforeunload", saveGame);

renderNameInputs();
resumeButton.hidden = !localStorage.getItem(SAVE_KEY);