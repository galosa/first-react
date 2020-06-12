import React, { Component } from "react";
import Board from "./Board";
import "./GameBoard.css";
import Checker from "../logic/Checker";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    const size = props.boardSize;
    const boards = [];
    for (let i = 0; i < size; i++) {
      boards[i] = [];
      for (let j = 0; j < size; j++) {
        boards[i][j] = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ];
      }
    }
    this.state = {
      player: 1,
      boards: boards,
      winner: 0,
    };
  }

  render() {
    const boardsComponents = [];
    const { boardSize } = this.props;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        boardsComponents.push(
          <Board
            key={`${i},${j}`}
            boardSize={boardSize}
            board={this.state.boards[i][j]}
            handleClick={(event, x, y) => {
              const tmpBoard = this.state.boards;
              if (tmpBoard[i][j][x][y] === 0) {
                tmpBoard[i][j][x][y] = this.state.player;
                this.setState({
                  boards: tmpBoard,
                  player: this.state.player * -1,
                  winner: Checker(this.state.boards),
                });
              }
            }}
          />
        );
      }
    }

    return (
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${this.props.boardSize}, ${3 * 29}px)`,
          justifyItems: "stretch",
          margin: "auto",
        }}
      >
        {boardsComponents}
      </div>
    );
  }
}

export default GameBoard;
