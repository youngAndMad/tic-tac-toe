package kz.danekerscode.ttt.api.model

import org.springframework.data.mongodb.core.mapping.Document

@Document
class User {
    var id: String? = null
    var usename: String? = null
}