package kz.danekerscode.ttt.api.model

import kz.danekerscode.ttt.api.model.enums.FriendshipStatus
import org.springframework.data.mongodb.core.mapping.Document


@Document
class UserFriendship {
    var id: String? = null
    var userId: String? = null
    var friendId: String? = null
    var status: FriendshipStatus = FriendshipStatus.PENDING
}