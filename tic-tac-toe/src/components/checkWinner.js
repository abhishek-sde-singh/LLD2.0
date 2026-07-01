export const checkWinner = (board, size) => {
  // row
  for (let i = 0; i < size; i++) {
    if (board[i].every((cell) => cell === "X")) {
      return "X";
    }
    if (board[i].every((cell) => cell === "O")) {
      return "O";
    }
  }
  //col
  for (let i = 0; i < size; i++) {
    if (board.every((row) => row[i] === "X")) {
      return "X";
    }
    if (board.every((row) => row[i] === "O")) {
      return "O";
    }
  }
  // diagonal
  if (board.every((row, index) => row[index] === "X")) {
    return "X";
  }
  if (board.every((row, index) => row[index] === "O")) {
    return "O";
  }
  if (board.every((row, index) => row[size - 1 - index] === "X")) {
    return "X";
  }
  if (board.every((row, index) => row[size - 1 - index] === "O")) {
    return "O";
  }
  return null;
};
