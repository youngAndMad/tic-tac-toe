package kz.danekerscode.ttt.api.model

class GameEvent(
    val type: String,
    val anotherUser: User,
    val roomId: String,
) {
}