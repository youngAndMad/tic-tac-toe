package kz.danekerscode.ttt.api.model.dto

class GameEvent(
    val type: GameEventType,
    val payload: Any
)

enum class GameEventType {
    ROOM_CREATED,
    MOVE_MADE,
}