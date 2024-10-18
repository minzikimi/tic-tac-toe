  // Gameboard Module -> games core logic and state
  const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setCell = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };

    const getBoard = () => [...board]; //duplicate board

    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };

    const checkWin = (marker) => {
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      for(let condition of winConditions){
        let [a,b,c]=condition;
        if (board[a]===marker && board[b]===marker && board[c]===marker){
          return true; //we find a winning condition
        }
      } return false;
    };

    const isDraw = () => {
      for(let cell of board){
        if(cell===""){
          return false;
        }
      }
      return true; 
    }
    return { setCell, getBoard, resetBoard, checkWin, isDraw };
  })();




  //Factory pattern
  const Player = (name, marker) => {
    return { name, marker };
  };




  //Display module -> handle everything related to UI
  const DisplayController = (() => {
    const cells = document.querySelectorAll(".grid-item");
    const messageElement = document.querySelector("#game-title");
    const winMessage = document.querySelector(".win-message-modal");
    const winMessageText = document.querySelector(".win-message-text h2");
    const replayBtn = document.querySelector(".replay-btn");

    const renderBoard = (board) => {
      cells.forEach((cell, index) => {
        // Remove all existing marker elements
        cell.innerHTML = "";
        
        if (board[index] === "△") {
          const marker = document.createElement("div");
          marker.classList.add("marker", "triangle");
          cell.appendChild(marker);
        } else if (board[index] === "〇") {
          const marker = document.createElement("div");
          marker.classList.add("marker", "circle");
          cell.appendChild(marker);
        }
      });
    };

    const setMessage = (message) => {
      messageElement.textContent = message;
      // // Check if it's △ player's turn and apply the appropriate color
      // if (message.includes("△")) {
      //   messageElement.classList.add("triangle-turn");
      //   messageElement.classList.remove("circle-turn");
      // } else if (message.includes("〇")) {
      //   messageElement.classList.add("circle-turn");
      //   messageElement.classList.remove("triangle-turn");
      // } else {
      //   messageElement.classList.remove("triangle-turn", "circle-turn");
      // }
    };

    // const addStartListener = (handler) => {
    //   startBtn.addEventListener('click', handler);
    // };

    // const disableBoard = () => {
    //   cells.forEach(cell => {
    //     if (cell.childElementCount === 0) { // Only disable empty cells
    //       cell.style.pointerEvents = "none";
    //     }
    //   });
    // };
  
    // const enableBoard = () => {
    //   cells.forEach(cell => {
    //     if (cell.childElementCount === 0) { // Only enable empty cells
    //       cell.style.pointerEvents = "auto";
    //     }
    //   });
    // };

    const showWinMessage = (message) => {
      winMessageText.textContent = message;
      winMessage.classList.add("show");
    };

    const hideWinMessage = () => {
      winMessage.classList.remove("show");
    };

    const addCellClickListener = (handler) => {
      cells.forEach(cell => {
        cell.addEventListener("click", () => {
          const index = cell.getAttribute("data-index");
          handler(index);
        });
      });
    };

    const addReplayListener = (handler) => {
      replayBtn.addEventListener("click", handler);
    };

    return { 
      renderBoard, 
      setMessage, 
      showWinMessage, 
      hideWinMessage, 
      addCellClickListener, 
      addReplayListener, 
      // disableBoard,
      // enableBoard,
    };
  })();


  // GameController Module
  const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;

    const initialize = () => {
      const playerName1 = localStorage.getItem("playerName1") || "Player 1";
      const playerName2 = localStorage.getItem("playerName2") || "Player 2";
      players = [
        Player(playerName1, "△"),
        Player(playerName2, "〇")
      ];
      currentPlayerIndex = 0;
      isGameOver = false;
      Gameboard.resetBoard();
      DisplayController.renderBoard(Gameboard.getBoard());
      DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].marker})`);
      DisplayController.hideWinMessage();
    };

    const switchPlayerTurn = () => {
      if (currentPlayerIndex === 0) {
        currentPlayerIndex = 1;
      } else {
        currentPlayerIndex = 0;
      }
    }

    const handleCellClick = (index) => {
 
      if (isGameOver) return;

      const currentPlayer = players[currentPlayerIndex];

      if (Gameboard.setCell(index, currentPlayer.marker)) {
        DisplayController.renderBoard(Gameboard.getBoard());
        if (Gameboard.checkWin(currentPlayer.marker)) {
          DisplayController.showWinMessage(`${currentPlayer.name} wins!`);
          isGameOver = true;
        } 
        else if (Gameboard.isDraw()) {
          DisplayController.showWinMessage("It's a draw!");
          isGameOver = true;
        }
        else {
          switchPlayerTurn();
          DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].marker})`);
        }
      }
    };

    const handleReplay = () => {
      initialize();
    };

    const start = () => {
      initialize();
      DisplayController.addCellClickListener(handleCellClick);
      DisplayController.addReplayListener(handleReplay);
    };

    return { start };
  })();

  // Start the game
  GameController.start();