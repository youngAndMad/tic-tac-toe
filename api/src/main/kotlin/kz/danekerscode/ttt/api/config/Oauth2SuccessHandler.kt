package kz.danekerscode.ttt.api.config

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.repository.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Component


@Component
class Oauth2SuccessHandler(
    private val userRepository: UserRepository
) : AuthenticationSuccessHandler {

    override fun onAuthenticationSuccess(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        authentication: Authentication?
    ) {
        authentication ?: return
        println("Oauth2SuccessHandler called ${authentication.name}")

        if (authentication !is OAuth2AuthenticationToken) {
            println("authentication is not OAuth2AuthenticationToken")
            return
        }

        val principal = authentication.principal
        val username = principal.attributes["login"] as String;

        if (!userRepository.existsUserByUsername(username)) {
            userRepository.save(User().apply {
                this.username = username
            })
            println("User with email: $username saved to db")

        }
        println("User with email: $username already exists")

    }
}