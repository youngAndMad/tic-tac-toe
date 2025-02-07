package kz.danekerscode.ttt.api.controller

import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.service.UserService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userService: UserService
) {

    @RequestMapping("/me")
    fun me(@AuthenticationPrincipal user: DefaultOAuth2User): User? {
        return userService.findByUsername(user.attributes["login"] as String)
    }

}