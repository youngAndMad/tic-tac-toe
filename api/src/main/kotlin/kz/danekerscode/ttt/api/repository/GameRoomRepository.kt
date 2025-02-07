package kz.danekerscode.ttt.api.repository

import kz.danekerscode.ttt.api.model.GameRoom
import kz.danekerscode.ttt.api.model.GameRoomStatus
import org.springframework.data.mongodb.repository.MongoRepository

interface GameRoomRepository : MongoRepository<GameRoom, String> {
    fun findFirstByStatusOrderByCreatedDateAsc(status: GameRoomStatus): GameRoom?
}