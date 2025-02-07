package kz.danekerscode.ttt.api.service

import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.model.UserFriendship
import kz.danekerscode.ttt.api.repository.UserFriendshipRepository
import org.springframework.stereotype.Service

@Service
class UserFriendshipService(
    private val userFriendshipRepository: UserFriendshipRepository,
    private val userService: UserService
) {

    fun createUserFriendship(userFriendship: UserFriendship): UserFriendship {
        return userFriendshipRepository.save(userFriendship)
    }

    fun getUserFriendshipById(id: String): UserFriendship? {
        return userFriendshipRepository.findById(id).orElse(null)
    }

    fun updateUserFriendship(id: String, userFriendship: UserFriendship): UserFriendship? {
        return if (userFriendshipRepository.existsById(id)) {
            userFriendship.id = id
            userFriendshipRepository.save(userFriendship)
        } else {
            null
        }
    }

    fun deleteUserFriendship(id: String) {
        if (userFriendshipRepository.existsById(id)) {
            userFriendshipRepository.deleteById(id)
        }
    }

    fun getAllUserFriendships(): MutableList<User> {
        return userService.currentUser()?.let {
            val currentUserId = it.id!!
            userFriendshipRepository.findAllByUserIdOrFriendId(userId = currentUserId, friendId = currentUserId)
                .map { userFriendship ->
                    if (userFriendship.userId == currentUserId) {
                        userService.findById(userFriendship.friendId!!)
                    } else {
                        userService.findById(userFriendship.userId!!)
                    }
                }
        }?.toMutableList() ?: mutableListOf()
    }
}