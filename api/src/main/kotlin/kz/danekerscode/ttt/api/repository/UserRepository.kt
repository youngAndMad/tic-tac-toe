package kz.danekerscode.ttt.api.repository

import kz.danekerscode.ttt.api.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String> {
    fun existsUserByUsername(email: String): Boolean

    fun findByUsername(username: String): User?

    fun countAllByOnlineIsTrue(): Long

    fun findAllByUsernameLike(username: String): List<User>
}