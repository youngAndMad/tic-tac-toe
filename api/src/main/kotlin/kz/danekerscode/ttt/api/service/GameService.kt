package kz.danekerscode.ttt.api.service

import kz.danekerscode.ttt.api.model.GameRoom
import kz.danekerscode.ttt.api.model.GameRoomStatus
import kz.danekerscode.ttt.api.repository.GameRoomRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class GameService(
    private val gameRoomRepository: GameRoomRepository
) {

    fun createOrJoinRoom(userId: String): GameRoom {
        val availableRoom = gameRoomRepository.findFirstByStatusOrderByCreatedDateAsc(GameRoomStatus.WAITING)

        return if (availableRoom != null) {
            availableRoom.playerO = userId
            availableRoom.status = GameRoomStatus.IN_PROGRESS
            availableRoom.currentTurn = availableRoom.playerX
            gameRoomRepository.save(availableRoom)
        } else {
            val newRoom = GameRoom(
                id = UUID.randomUUID().toString(),
                playerX = userId,
                status = GameRoomStatus.WAITING,
                currentTurn = null,
                board = Array(3) {
                    Array(3) {
                        ""
                    }
                }
            )
            gameRoomRepository.save(newRoom)
        }
    }

    fun makeMove(roomId: String, userId: String, x: Int, y: Int): GameRoom? {
        val room = gameRoomRepository.findById(roomId).orElse(null) ?: return null

        if (room.currentTurn != userId || room.board[x][y].isNotEmpty()) return null

        room.board[x][y] = if (room.playerX == userId) "X" else "O"
        room.currentTurn = if (room.currentTurn == room.playerX) room.playerO else room.playerX

        return gameRoomRepository.save(room)
    }
}
