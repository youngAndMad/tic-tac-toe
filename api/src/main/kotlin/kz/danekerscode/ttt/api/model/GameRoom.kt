package kz.danekerscode.ttt.api.model

import kz.danekerscode.ttt.api.model.enums.GameRoomStatus
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document
class GameRoom(
    @Id
    var id: String? = null,
    var playerX: String? = null,
    var playerO: String? = null,
    var board: Array<Array<String>> = Array(3) { Array(3) { "" } },
    var currentTurn: String? = null,
    var status: GameRoomStatus = GameRoomStatus.WAITING,
    var createdDate: Instant = Instant.now()
)