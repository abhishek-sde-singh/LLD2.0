import React from "react";

const Board = ({ rows, cols, board, handleClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplate: `repeat(${rows}, 60px) / repeat(${cols}, 60px)`,
        borderRadius: "10px",
        border: "1px solid black",
        padding: "20px",
        width: "max-content",
        backgroundColor: "blue",
        gap: "20px",
      }}
    >
      {board.map((row, rowNo) => {
        return row.map((col, colNo) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                backgroundColor:
                  col === "red" ? "red" : col === "yellow" ? "yellow" : "white",
              }}
              key={`${rowNo}-${colNo}`}
              onClick={() => handleClick(rowNo, colNo)}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default Board;
