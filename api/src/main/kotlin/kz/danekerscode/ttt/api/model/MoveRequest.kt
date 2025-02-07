package kz.danekerscode.ttt.api.model

data class MoveRequest(val roomId: String, val userId: String, val x: Int, val y: Int)