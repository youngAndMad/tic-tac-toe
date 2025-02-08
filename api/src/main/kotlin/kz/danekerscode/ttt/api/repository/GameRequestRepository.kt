package kz.danekerscode.ttt.api.repository

import kz.danekerscode.ttt.api.model.GameRequest
import kz.danekerscode.ttt.api.model.enums.GameRoomStatus
import org.springframework.data.mongodb.repository.MongoRepository

interface GameRequestRepository : MongoRepository<GameRequest, String> {
    fun findByFromAndStatus(from: String, status: GameRoomStatus): List<GameRequest>
}