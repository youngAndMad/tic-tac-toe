package kz.danekerscode.ttt.api.model.dto

import kz.danekerscode.ttt.api.model.User

class GameEvent(
    val type: String,
    val anotherUser: User,
    val roomId: String,
) {
}