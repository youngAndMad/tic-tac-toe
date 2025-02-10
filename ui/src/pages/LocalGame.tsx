import React, { useState } from "react";
import {
  boardStyles,
  defaultFigures,
  figureOptions,
} from "../models/game.model";
import { gameService } from "../service/game.service";

const LocalGame: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [boardStyle, setBoardStyle] = useState(boardStyles.default);
  const [figures, setFigures] = useState(defaultFigures);
  const [winStats, setWinStats] = useState({ X: 0, O: 0 });

  const handleClick = (index: number) => {
    if (board[index] || gameService.calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? figures.X : figures.O;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = gameService.calculateWinner(board);
  if (winner) {
    setTimeout(() => {
      setWinStats((prevStats) => ({
        ...prevStats,
        [winner]: prevStats[winner] + 1,
      }));
      restartGame();
    }, 1000);
  }

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
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={restartGame}
        >
          Restart Game
        </button>
        <div className="mt-4">
          <p className="text-lg font-semibold">Win Statistics</p>
          <p>
            {figures.X}: {winStats.X} wins
          </p>
          <p>
            {figures.O}: {winStats.O} wins
          </p>
        </div>
        <div className="mt-4">
          <label className="block font-semibold">Change Figures:</label>
          <select
            className="px-4 py-2 bg-gray-300 rounded"
            onChange={(e) => {
              const selectedOption = figureOptions.find(
                (option) => option.label === e.target.value
              );
              if (selectedOption) {
                setFigures(selectedOption.figure);

                setBoard((prevBoard) =>
                  prevBoard.map((cell) =>
                    cell === figures.X
                      ? selectedOption.figure.X
                      : cell === figures.O
                      ? selectedOption.figure.O
                      : cell
                  )
                );
              }
            }}
          >
            {figureOptions.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block font-semibold">Change Board Style:</label>
          <select
            className="px-4 py-2 bg-gray-300 rounded"
            onChange={(e) => setBoardStyle(boardStyles[e.target.value])}
          >
            <option value="default">Default</option>
            <option value="dark">Dark Mode</option>
            <option value="neon">Neon</option>
            <option value="ocean">Ocean</option>
            <option value="forest">Forest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LocalGame;
