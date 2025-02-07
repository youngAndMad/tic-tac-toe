package kz.danekerscode.ttt.api.repository

import kz.danekerscode.ttt.api.model.UserFriendship
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserFriendshipRepository : MongoRepository<UserFriendship, String>