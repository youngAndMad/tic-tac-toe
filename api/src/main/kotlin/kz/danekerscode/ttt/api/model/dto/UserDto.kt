package kz.danekerscode.ttt.api.model.dto

import kz.danekerscode.ttt.api.model.User

data class UserDto(
    val user: User,
    val isInGame: Boolean,
)
