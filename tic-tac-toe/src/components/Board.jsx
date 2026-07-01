import React from "react";

const Board = ({ size, board, handleClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 80px)`,
      }}
    >
      {board.map((row, rowNo) => {
        return row.map((col, colNo) => {
          return (
            <div
              style={{
                border: "1px solid black",
                height: "80px",
                width: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleClick(rowNo, colNo)}
            >
              {col}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Board;
