package kz.danekerscode.ttt.api.repository

import kz.danekerscode.ttt.api.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository: MongoRepository<User, String> {
}