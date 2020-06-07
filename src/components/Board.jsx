import React from "react";
import "./Board.css";

const Board = (props) => {
  return (
    <div
      style={{
        display: "inline-block",
        width: `auto`,
        border: "solid 1px black",
      }}
    >
      {props.board.map((row, i) => (
        <div key={i}>
          {row.map((player, j) => {
            let chosenClass = "";
            if (player === 1) chosenClass = " blue-dot";
            else if (player === -1) chosenClass = " green-dot";
            return (
              <span
                key={j}
                className={"dot" + chosenClass}
                onClick={(event) => props.handleClick(event, i, j)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
