package kz.danekerscode.ttt.api.model

import kz.danekerscode.ttt.api.model.enums.GameRoomStatus
import org.springframework.data.mongodb.core.mapping.Document

@Document
class GameRequest {
    var id: String? = null
    var from: String? = null
    var to: String? = null
    var status: GameRoomStatus = GameRoomStatus.WAITING
}