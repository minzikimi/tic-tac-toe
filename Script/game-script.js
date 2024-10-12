document.addEventListener("DOMContentLoaded", () => {
  const displayPlayer1 = document.querySelector(".display-player1 p");
  const displayPlayer2 = document.querySelector(".display-player2 p");
  const playerName1 = localStorage.getItem("playerName1");
  const playerName2 = localStorage.getItem("playerName2");

  function displayPlayerName(){
    if(playerName1 && playerName2){
      displayPlayer1.textContent=`PLAYER △ : ${playerName1}`;
      displayPlayer2.textContent=`PLAYER 〇 : ${playerName2}`;
    }
  }
  displayPlayerName();
});

const cells = document.querySelectorAll(".grid-items")