package kz.danekerscode.ttt.api.repository

import kz.danekerscode.ttt.api.model.GameRoom
import kz.danekerscode.ttt.api.model.enums.GameRoomStatus
import org.springframework.data.mongodb.repository.MongoRepository

interface GameRoomRepository : MongoRepository<GameRoom, String> {
    fun findFirstByStatusOrderByCreatedDateAsc(status: GameRoomStatus): GameRoom?

    fun findByPlayerXAndPlayerOAndStatus(playerX: String, playerO: String, status: GameRoomStatus): GameRoom?

    fun existsByPlayerXOrPlayerOAndStatus(playerX: String, playerO: String, status: GameRoomStatus): Boolean
}