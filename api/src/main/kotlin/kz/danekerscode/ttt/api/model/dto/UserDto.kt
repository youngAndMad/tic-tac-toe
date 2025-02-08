package kz.danekerscode.ttt.api.model.dto

import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.model.enums.FriendshipStatus

data class UserDto(
    val user: User,
    val isInGame: Boolean,
    val friendshipStatus: FriendshipStatus
)
