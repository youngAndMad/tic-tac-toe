package kz.danekerscode.ttt.api.service

import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun findByUsername(username: String): User? {
        return userRepository.findByUsername(username)
    }


}