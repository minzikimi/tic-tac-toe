const dialogEntry = document.querySelector(".entry-dialog");
const backdrop = document.querySelector("#backdrop");
const buttonEntry = document.querySelector("#button-entry");
const nameInput1 = document.querySelector("#name1");
const nameInput2 = document.querySelector("#name2");
const cancelBtn = document.querySelector("#cancel-button");
const nameForm = document.querySelector(".name-form");

let playerName1 = "";
let playerName2 = "";

buttonEntry.addEventListener("click", openModalBox);
cancelBtn.addEventListener("click", closeModalBox);
nameForm.addEventListener("submit", handleSubmit);
document.addEventListener("keydown", handleEscapeKey);

function openModalBox() {
  dialogEntry.showModal();
  toggleBackdrop();
}

function closeModalBox() {
  dialogEntry.close();
  clearInputs();
  toggleBackdrop();
}

function handleEscapeKey(event) {
  if (event.key === 'Escape' && dialogEntry.open) {
    closeModalBox();
  }
}

function clearInputs() {
  nameInput1.value = "";
  nameInput2.value = "";
}

function toggleBackdrop() {
  backdrop.classList.toggle("visible");
}

function handleSubmit(event) {
  event.preventDefault();
  playerName1 = nameInput1.value.trim();
  playerName2 = nameInput2.value.trim();
  if (playerName1 && playerName2) {
    localStorage.setItem("playerName1", playerName1);
    localStorage.setItem("playerName2", playerName2);
    window.location.href = "game.html"; // Redirect to the game page
  }
}