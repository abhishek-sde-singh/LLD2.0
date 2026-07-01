import React, { useState } from "react";
import Board from "./Board";
import { checkWinner } from "./checkWinner";

const TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => Array(size).fill(null)),
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);

  const handleReset = () => {
    setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
    setWinner(null);
    setMoveCount(0);
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) {
      return;
    }
    if (moveCount + 1 === size * size) {
      setWinner("Draw");
      return;
    }
    setMoveCount(moveCount + 1);
    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      newBoard[row][col] = currentPlayer === "X" ? "X" : "O";
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      const winner = checkWinner(newBoard, size);

      if (winner) {
        setWinner(winner);
      }
      return newBoard;
    });
  };

  return (
    <div>
      <Board size={size} board={board} handleClick={handleClick} />
      <div style={{ margin: "6px" }}>
        Status: <strong>Player {currentPlayer} turn </strong>
      </div>
      {winner && winner !== "Draw" && <div>Winner: {winner}</div>}
      {winner === "Draw" && <div>Draw</div>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
