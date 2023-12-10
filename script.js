document.addEventListener("DOMContentLoaded", function () {
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const dropBoxes = document.querySelectorAll(".drop-box");
    const resetButton = document.querySelector(".reset-btn");
    const dragBoxes = document.querySelectorAll(".drag-box");


    //constantly check for winner pattern
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }

      return null;
    }

    function handleDrop(e) {
      const dropIndex = parseInt(e.target.dataset.index);
      if (board[dropIndex] === "") {
        board[dropIndex] = currentPlayer;

        e.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
          alert(`${winner.toUpperCase()} wins!`);
          resetBoard();
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
//clearing board
    function resetBoard() {
      board = ["", "", "", "", "", "", "", "", ""];
      dropBoxes.forEach((box) => (box.textContent = ""));
      currentPlayer = "X";
    }
//EH drag and drop
    dragBoxes.forEach((box) => {
      box.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
      });
    });

    dropBoxes.forEach((box) => {
      box.addEventListener("dragover", (e) => e.preventDefault());
      box.addEventListener("drop", handleDrop);
    });

    resetButton.addEventListener("click", resetBoard);
  });