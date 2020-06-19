const rotateBoardClockwise = (board) => {
  const rotatedBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const size = board.length;
  console.log(`boardSize: ${size}`);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotatedBoard[col][size - 1 - row] = board[row][col];
    }
  }
  return rotatedBoard;
};

const rotateBoardAntiClockwise = (board) => {
  const rotatedBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const size = board.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotatedBoard[size - 1 - col][row] = board[row][col];
    }
  }
  return rotatedBoard;
};

export { rotateBoardClockwise, rotateBoardAntiClockwise };
