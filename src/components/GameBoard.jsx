import React, { Component } from "react";
import Board from "./Board";
import "./GameBoard.css";
import "./BoardContainer.css";
import Checker from "../logic/Checker";
import "./Board.css";
import {
  rotateBoardClockwise,
  rotateBoardAntiClockwise,
} from "../logic/Rotate";
import rotateImg from "../assets/rotate.png";

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
      shouldRotate: false,
    };
    this.overlay = this.overlay.bind(this);
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
      shouldRotate: false,
    });
  }

  overlay(boardRow, boardCol) {
    return this.state.shouldRotate ? (
      <div
        className="rotateOverlay"
        key={`rotateboard ${boardRow},${boardCol}`}
      >
        <img
          className="rotateLeft"
          alt="left"
          src={rotateImg}
          onClick={() => {
            const tmpBoards = this.state.boards;
            tmpBoards[boardRow][boardCol] = rotateBoardAntiClockwise(
              tmpBoards[boardRow][boardCol]
            );
            this.setState((prevState) => ({
              boards: tmpBoards,
              player: prevState.player * -1,
              shouldRotate: false,
              winner: Checker(tmpBoards),
            }));
          }}
        ></img>
        <img
          className="rotateRight"
          alt="right"
          src={rotateImg}
          onClick={() => {
            const tmpBoards = this.state.boards;
            tmpBoards[boardRow][boardCol] = rotateBoardClockwise(
              tmpBoards[boardRow][boardCol]
            );
            this.setState((prevState) => ({
              boards: tmpBoards,
              player: prevState.player * -1,
              shouldRotate: false,
              winner: Checker(tmpBoards),
            }));
          }}
        ></img>
      </div>
    ) : (
      <div style={{ visibility: "hidden", zIndex: -10 }}></div>
    );
  }

  render() {
    const boardsComponents = [];
    const boardsSize = this.state.boardsSize;

    for (let i = 0; i < boardsSize; i++) {
      for (let j = 0; j < boardsSize; j++) {
        boardsComponents.push(
          <div className="boardContainer">
            <Board
              key={`${i},${j}`}
              boardSize={boardsSize}
              board={this.state.boards[i][j]}
              handleClick={(event, x, y) => {
                const tmpBoard = this.state.boards;
                if (tmpBoard[i][j][x][y] === 0) {
                  tmpBoard[i][j][x][y] = this.state.player;
                  this.setState((prevState) => ({
                    boards: tmpBoard,
                    shouldRotate: true,
                  }));
                }
              }}
            />
            {this.overlay(i, j)}
          </div>
        );
      }
    }

    const gameBoard = (
      <div
        className="gameBoard"
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

    const winnerAnnouncement = (
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

    return this.state.winner === 0 ? gameBoard : winnerAnnouncement;
  }
}

export default GameBoard;
