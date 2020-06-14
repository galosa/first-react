const winnerChecker = (boards) => {
  const winInARow = 5;
  const boardsSize = boards.length;
  const boardLength = 3;
  const limit = boardsSize * boardLength;
  console.log("Board size is: {}", boardsSize);

  const rowWin = (boardsRow, boardsCol, row, col) => {
    var win = 0;
    for (let k = 0; k < winInARow && k < limit; k++) {
      const index = col + k;
      const offset = Math.floor(index / boardLength);
      const newCol = index % boardLength;
      if (boardsCol + offset < boardsSize) {
        win += boards[boardsRow][boardsCol + offset][row][newCol];
      }
    }
    var result = 0;
    if (win === winInARow) {
      result = 1;
    } else if (win === -winInARow) {
      result = -1;
    }
    return result;
  };

  const colWin = (boardsRow, boardsCol, row, col) => {
    var win = 0;
    for (let k = 0; k < winInARow && k < limit; k++) {
      const index = row + k;
      const offset = Math.floor(index / boardLength);
      const newRow = index % boardLength;
      if (boardsRow + offset < boardsSize) {
        win += boards[boardsRow + offset][boardsCol][newRow][col];
      }
    }
    var result = 0;
    if (win === winInARow) {
      result = 1;
    } else if (win === -winInARow) {
      result = -1;
    }
    return result;
  };

  const diagWin = (boardsRow, boardsCol, row, col) => {
    var win = 0;
    for (let k = 0; k < winInARow && k < limit; k++) {
      const rowIndex = row + k;
      const colIndex = col + k;
      const rowOffset = Math.floor(rowIndex / boardLength);
      const colOffset = Math.floor(colIndex / boardLength);
      const newRow = rowIndex % boardLength;
      const newCol = colIndex % boardLength;
      if (
        boardsRow + rowOffset < boardsSize &&
        boardsCol + colOffset < boardsSize
      ) {
        win +=
          boards[boardsRow + rowOffset][boardsCol + colOffset][newRow][newCol];
      }
    }
    var result = 0;
    if (win === winInARow) {
      result = 1;
    } else if (win === -winInARow) {
      result = -1;
    }
    return result;
  };

  const reverseDiagWin = (boardsRow, boardsCol, row, col) => {
    var win = 0;
    for (let k = 0; k < winInARow && k < limit; k++) {
      const rowIndex = row + k;
      const colIndex = col - k;
      const rowOffset = Math.floor(rowIndex / boardLength);
      const colOffset = Math.floor(colIndex / boardLength);
      const newRow = rowIndex % boardLength;
      const newCol = (colIndex + boardLength * k) % boardLength;

      if (boardsRow + rowOffset < boardsSize && boardsCol + colOffset >= 0) {
        win +=
          boards[boardsRow + rowOffset][boardsCol + colOffset][newRow][newCol];
      }
    }
    var result = 0;
    if (win === winInARow) {
      result = 1;
    } else if (win === -winInARow) {
      result = -1;
    }
    return result;
  };

  var winner = 0;
  console.log(`boardsSize * boardLength: ${boardsSize * boardLength}`);
  for (let boardsRow = 0; boardsRow < boardsSize; boardsRow++) {
    for (let boardsCol = 0; boardsCol < boardsSize; boardsCol++) {
      for (let row = 0; row < boardLength; row++) {
        for (let col = 0; col < boardLength; col++) {
          const rowWinner = rowWin(boardsRow, boardsCol, row, col);
          if (rowWinner !== 0) console.log(`rowWinner: ${rowWinner}`);
          const colWinner = colWin(boardsRow, boardsCol, row, col);
          if (colWinner !== 0) console.log(`colWinner: ${colWinner}`);
          const diagWinner = diagWin(boardsRow, boardsCol, row, col);
          if (diagWinner !== 0) console.log(`diagWinner: ${diagWinner}`);
          const reverseDiagWinner = reverseDiagWin(
            boardsRow,
            boardsCol,
            row,
            col
          );
          if (reverseDiagWinner !== 0)
            console.log(`reverseDiagWinner: ${reverseDiagWinner}`);
          winner += rowWinner + colWinner + diagWinner + reverseDiagWinner;
        }
      }
    }
  }
  if (winner !== 0) {
    console.log(`winner: ${winner}`);
  }
  return winner;
};

export default winnerChecker;
