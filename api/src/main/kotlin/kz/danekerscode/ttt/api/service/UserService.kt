package kz.danekerscode.ttt.api.service

import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.model.dto.UserDto
import kz.danekerscode.ttt.api.model.enums.GameRoomStatus
import kz.danekerscode.ttt.api.repository.GameRoomRepository
import kz.danekerscode.ttt.api.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository,
    private val gameRoomRepository: GameRoomRepository
) {
    fun currentUser(): User? {
        return SecurityContextHolder.getContext().authentication?.let {
            val defaultOAuth2User = it.principal as DefaultOAuth2User
            return userRepository.findByUsername(defaultOAuth2User.attributes["login"] as String)
        }
    }

    fun uploadAvatar(image: MultipartFile) {
        currentUser()?.let {
            it.imageBase64 = Base64.getEncoder().encodeToString(image.bytes)
            userRepository.save(it)
        }
    }

    fun findById(id: String): User {
        return userRepository.findById(id)
            .orElseThrow { RuntimeException("User not found") }
    }

    fun countOnlineUsers(): Long {
        return userRepository.countAllByOnlineIsTrue()
    }

    fun filterUsers(keyword: String): List<UserDto> {
        val currentUser = currentUser()!!
        return userRepository.findAllByUsernameLike(keyword).let { users ->
            users
                .filter { it.id != currentUser.id }
                .map { user ->
                    UserDto(
                        user = user,
                        isInGame = gameRoomRepository.existsByPlayerXOrPlayerOAndStatus(
                            playerX = user.id!!,
                            playerO = user.id!!,
                            status = GameRoomStatus.IN_PROGRESS
                        )
                    )
                }
        }
    }

}