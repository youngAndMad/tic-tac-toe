package kz.danekerscode.ttt.api.service

import kz.danekerscode.ttt.api.model.GameRequest
import kz.danekerscode.ttt.api.model.GameRoom
import kz.danekerscode.ttt.api.model.enums.GameRoomStatus
import kz.danekerscode.ttt.api.repository.GameRequestRepository
import kz.danekerscode.ttt.api.repository.GameRoomRepository
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service

@Service
class GameService(
    private val gameRoomRepository: GameRoomRepository,
    private val userService: UserService,
    private val smt: SimpMessagingTemplate,
    private val gameRequestRepository: GameRequestRepository
) {

    fun createOrJoinRoom(): GameRoom {
        val currentUser = userService.currentUser()!!
        val userId = currentUser.id
        val availableRoom = gameRoomRepository.findFirstByStatusOrderByCreatedDateAsc(GameRoomStatus.WAITING)

        return if (availableRoom != null) {
            availableRoom.playerO = userId
            availableRoom.status = GameRoomStatus.IN_PROGRESS
            availableRoom.currentTurn = availableRoom.playerX


            gameRoomRepository.save(availableRoom).also {
                smt.convertAndSend(
                    "/user/${availableRoom.playerX}/game",
                    it
                )
                println("Sent to ${availableRoom.playerX}")
            }
        } else {
            val newRoom = GameRoom(
                playerX = userId,
                status = GameRoomStatus.WAITING,
                currentTurn = null,
                board = Array(3) {
                    Array(3) {
                        ""
                    }
                }
            )
            println("Created new room")
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

    fun sendStartGameRequest(friendId: String) {
        val friendUser = userService.findById(friendId)
        val currentUser = userService.currentUser()!!

        if (!friendUser.online) {
            throw RuntimeException("User is not online")
        }

        val gameRequest = GameRequest().apply {
            this.from = currentUser.id
            this.to = friendId
        }

        gameRequestRepository.save(gameRequest)
        smt.convertAndSend("/user/$friendId/game/request", gameRequest)
    }
}
