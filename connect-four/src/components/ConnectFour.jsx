import React, { use, useState } from "react";
import Board from "./Board";
import { checkWinner } from "./checkWinner";

const ConnectFour = ({ rows = 6, cols = 7 }) => {
  const [board, setBoard] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(null)),
  );
  const [player, setPlayer] = useState("red");
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);

  const getDropRow = (board, col) => {
    for (let i = board.length - 1; i >= 0; i--) {
      if (!board[i][col]) {
        return i; // first empty from bottom
      }
    }
    return -1; // column full
  };

  const handleReset = () => {
    setBoard(Array.from({ length: rows }, () => Array(cols).fill(null)));
    setWinner(null);
    setMoveCount(0);
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const dropRow = getDropRow(board, col);
    if (dropRow === -1) return;
    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      newBoard[dropRow][col] = player === "red" ? "red" : "yellow";
      setMoveCount(moveCount + 1);
      const hasWon = checkWinner(player, newBoard);
      if (hasWon) {
        setWinner(player);
      } else if (moveCount + 1 === rows * cols) {
        setWinner("Draw");
      } else {
        setPlayer(player === "red" ? "yellow" : "red");
      }
      return newBoard;
    });
  };

  return (
    <div>
      <Board rows={rows} cols={cols} board={board} handleClick={handleClick} />
      <button style={{ margin: "6px" }} onClick={handleReset}>
        Reset
      </button>
      {winner && <div>Winner: {winner}</div>}
    </div>
  );
};

export default ConnectFour;
