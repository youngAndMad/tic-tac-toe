import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import { useUser } from "../hooks/useUser";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  boardStyles,
  defaultFigures,
  figureOptions,
  Game,
  GameEvent,
} from "../models/game.model";
import { gameService } from "../service/game.service";

export default function OnlineGame() {
  const params = useQueryParams();
  const navigate = useNavigate();
  const roomId = params.get("i");
  const { subscribe, connected } = useWebSocket();
  const [gameRoom, setGameRoom] = useState<Game>(null!!);

  const [isXNext, setIsXNext] = useState(true);
  const [boardStyle, setBoardStyle] = useState(boardStyles.default);
  const [figures, setFigures] = useState(defaultFigures);
  const [winStats, setWinStats] = useState({ X: 0, O: 0 });

  const { user } = useUser();

  useEffect(() => {
    const loadGame = async (id: string) => {
      const gameRoomResponse = await gameService.findRoom(id);
      setGameRoom(gameRoomResponse);
    };

    if (!roomId) {
      alert("Invalid room id");
      setTimeout(() => {
        navigate(-1);
      }, 200);
    } else {
      loadGame(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (connected) {
      subscribe(`/user/${user?.id}/game`, (message) => {
        const messageData = JSON.parse(message.body) as GameEvent;
        console.log("Received message", messageData);

        switch (messageData.type) {
          case "MOVE_MADE": {
            setGameRoom(messageData.payload);
            const winner = gameService.calculateWinner(gameRoom.board);
            if (winner) {
            }
            console.log("move made");
            break;
          }
        }
      });
    }
  }, [connected, user, subscribe]);

  const handleClick = async (index: number) => {
    if (gameRoom?.board[index] || gameService.calculateWinner(gameRoom.board)) {
      return;
    }

    if (gameRoom.currentTurn !== user!.id) {
      return;
    }

    const updatedRoom = await gameService.makeMove(roomId!!, index);

    setGameRoom(updatedRoom);
    setIsXNext(!isXNext);
  };

  const winner = gameService.calculateWinner(gameRoom?.board);
  if (winner) {
    setTimeout(() => {
      setWinStats((prevStats) => ({
        ...prevStats,
        [winner]: prevStats[winner] + 1,
      }));
      // restartGame();
    }, 1000);
  }

  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${
        gameRoom?.currentTurn === user?.id ? figures.X : figures.O
      }`;

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-2">
          {gameRoom?.board?.map((cell, index) => (
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
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
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
                setGameRoom((prevRoom) => ({
                  ...prevRoom,
                  board: prevRoom.board.map((cell) =>
                    cell === figures.X
                      ? selectedOption.figure.X
                      : cell === figures.O
                      ? selectedOption.figure.O
                      : cell
                  ),
                }));
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
}
