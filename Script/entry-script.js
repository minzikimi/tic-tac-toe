const dialogEntry = document.querySelector(".entry-dialog");
const dialogRule = document.querySelector(".rules-dialog");
const entryBtn = document.querySelector("#entry-button");
const ruleBtn = document.querySelector("#rule-button");
const nameInput1 = document.querySelector("#name1");
const nameInput2 = document.querySelector("#name2");
const cancelBtn = document.querySelector("#cancel-button");
const nameForm = document.querySelector(".name-form");
const closeRuleBtn = document.querySelector(".close-rules-button");

entryBtn.addEventListener("click", openEntryModal);
ruleBtn.addEventListener("click", openRuleModal);
cancelBtn.addEventListener("click", closeEntryModal);
closeRuleBtn.addEventListener("click", closeRuleModal);
nameForm.addEventListener("submit", handleSubmit);
document.addEventListener("keydown", handleEscapeKey);

function openEntryModal() {
  dialogEntry.showModal();
}

function closeEntryModal() {
  dialogEntry.close();
  clearInputs();
}

function openRuleModal() {
  dialogRule.showModal();
}

function closeRuleModal() {
  dialogRule.close();
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    if (dialogEntry.open) closeEntryModal();
    if (dialogRule.open) closeRuleModal();
  }
}

function clearInputs() {
  nameInput1.value = "";
  nameInput2.value = "";
}

function handleSubmit(event) {
  event.preventDefault();
  const playerName1 = nameInput1.value;
  const playerName2 = nameInput2.value;
  if (playerName1 && playerName2) {
    localStorage.setItem("playerName1", playerName1);
    localStorage.setItem("playerName2", playerName2);
    window.location.href = "game.html";
  } else {
    alert("Please enter player names.");
  }
}




