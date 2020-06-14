import React, { Component } from "react";
import Board from "./Board";
import "./GameBoard.css";
import Checker from "../logic/Checker";
import "./Board.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    const size = props.boardSize;
    const boards = this.generateBoards(size);
    this.state = {
      boardsSize: size,
      player: 1,
      boards: boards,
      winner: 0,
    };
  }

  generateBoards(size) {
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
    return boards;
  }

  componentWillReceiveProps(nextProps) {
    const size = nextProps.boardSize;
    const boards = this.generateBoards(size);
    this.setState({
      boardsSize: size,
      player: 1,
      boards: boards,
      winner: 0,
    });
  }

  render() {
    const boardsComponents = [];
    const boardsSize = this.state.boardsSize;
    for (let i = 0; i < boardsSize; i++) {
      for (let j = 0; j < boardsSize; j++) {
        boardsComponents.push(
          <Board
            key={`${i},${j}`}
            boardSize={boardsSize}
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
    return this.state.winner === 0 ? (
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
    ) : (
      <div>
        <div>
          <h3>The winner is:</h3>
        </div>
        <div
          className={
            "dot" + (this.state.winner > 0 ? " blue-dot" : " green-dot")
          }
          style={{
            height: "90px",
            width: "90px",
          }}
        ></div>
      </div>
    );
  }
}

export default GameBoard;
