const rotateBoardClockwise = (board) => {
  const rotatedBoard = [];
  const size = board.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotatedBoard[col][size - 1 - row] = board[row][col];
    }
  }
  return rotateBoard;
};

const rotateBoardAntiClockwise = (board) => {
  const rotatedBoard = [];
  const size = board.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotatedBoard[size - 1 - col][row] = board[row][col];
    }
  }
  return rotateBoard;
};

export { rotateBoardClockwise, rotateBoardAntiClockwise };
