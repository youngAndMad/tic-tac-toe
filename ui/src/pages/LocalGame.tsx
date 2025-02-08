import React, { useState } from "react";

const defaultBoardStyle =
  "w-20 h-20 flex items-center justify-center border-2 border-gray-600 text-xl font-bold";
const defaultFigures = { X: "X", O: "O" };

const LocalGame: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [boardStyle, setBoardStyle] = useState(defaultBoardStyle);
  const [figures, setFigures] = useState(defaultFigures);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? figures.X : figures.O;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const changeFigures = (newFigures: { X: string; O: string }) => {
    setFigures(newFigures);
    setBoard(
      board.map((cell) =>
        cell === defaultFigures.X
          ? newFigures.X
          : cell === defaultFigures.O
          ? newFigures.O
          : cell
      )
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXNext ? figures.X : figures.O}`;

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <button
              key={index}
              className={boardStyle}
              onClick={() => handleClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
        <p className="mt-4 text-lg font-semibold">{status}</p>
        <div className="mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
            onClick={() => changeFigures({ X: "🔥", O: "❄️" })}
          >
            Fire & Ice
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => changeFigures(defaultFigures)}
          >
            Reset Figures
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalGame;
