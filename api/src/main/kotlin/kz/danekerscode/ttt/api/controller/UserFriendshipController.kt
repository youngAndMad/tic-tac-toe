package kz.danekerscode.ttt.api.controller

import kz.danekerscode.ttt.api.model.UserFriendship
import kz.danekerscode.ttt.api.model.dto.UserDto
import kz.danekerscode.ttt.api.service.UserFriendshipService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/user-friendships")
class UserFriendshipController(
    private val userFriendshipService: UserFriendshipService
) {

    @PostMapping
    fun createUserFriendship(@RequestBody userFriendship: UserFriendship): UserFriendship {
        return userFriendshipService.createUserFriendship(userFriendship)
    }

    @PutMapping("/{id}")
    fun updateUserFriendship(
        @PathVariable id: String,
        @RequestBody userFriendship: UserFriendship
    ): ResponseEntity<UserFriendship> {
        val updatedUserFriendship =
            userFriendshipService.updateUserFriendship(id, userFriendship)
        return if (updatedUserFriendship != null) {
            ResponseEntity.ok(updatedUserFriendship)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteUserFriendship(@PathVariable id: String) {
        userFriendshipService.deleteUserFriendship(id)
    }

    @GetMapping
    fun getAllUserFriendships(): MutableList<UserDto> =  userFriendshipService.getAllUserFriendships()
}