export const checkWinner = (player, board) => {
  // check horizontal
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 3; j++) {
      if (
        board[i][j] === player &&
        board[i][j + 1] === player &&
        board[i][j + 2] === player &&
        board[i][j + 3] === player
      ) {
        return true;
      }
    }
  }

  // check vertical
  for (let i = 0; i < board.length - 3; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        board[i][j] === player &&
        board[i + 1][j] === player &&
        board[i + 2][j] === player &&
        board[i + 3][j] === player
      ) {
        return true;
      }
    }
  }

  // check diagonal (down-right)
  for (let i = 0; i < board.length - 3; i++) {
    for (let j = 0; j < board[i].length - 3; j++) {
      if (
        board[i][j] === player &&
        board[i + 1][j + 1] === player &&
        board[i + 2][j + 2] === player &&
        board[i + 3][j + 3] === player
      ) {
        return true;
      }
    }
  }

  // check diagonal (up-right)
  for (let i = 3; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 3; j++) {
      if (
        board[i][j] === player &&
        board[i - 1][j + 1] === player &&
        board[i - 2][j + 2] === player &&
        board[i - 3][j + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
};
