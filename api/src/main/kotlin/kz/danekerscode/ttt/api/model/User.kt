package kz.danekerscode.ttt.api.model

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.mongodb.core.mapping.Document

@Document
class User {
    var id: String? = null
    var username: String? = null
    @JsonIgnore
    var imageBase64: String? = null
    var online: Boolean = false
}