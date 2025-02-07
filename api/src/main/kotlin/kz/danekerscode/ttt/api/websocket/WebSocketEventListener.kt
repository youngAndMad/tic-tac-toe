package kz.danekerscode.ttt.api.websocket

import kz.danekerscode.ttt.api.repository.UserRepository
import org.springframework.context.event.EventListener
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.stereotype.Component
import org.springframework.web.socket.messaging.SessionConnectedEvent
import org.springframework.web.socket.messaging.SessionDisconnectEvent

@Component
class WebSocketEventListener(
    private val userRepository: UserRepository,
) {
    @EventListener
    fun handleWebSocketDisconnectListener(event: SessionDisconnectEvent) {
        val authenticationToken = event.user as UsernamePasswordAuthenticationToken
        changeUserState(authenticationToken, online = false)
    }

    @EventListener
    fun handleConnectedEvent(event: SessionConnectedEvent) {
        val authenticationToken = event.user as UsernamePasswordAuthenticationToken
        changeUserState(authenticationToken, online = true)
    }

    private fun changeUserState(
        authToken: UsernamePasswordAuthenticationToken,
        online: Boolean,
    ) {
        val currentUser = authToken.principal as DefaultOAuth2User
        userRepository.findByUsername(currentUser.attributes["login"] as String)?.let {
            it.online = online
            userRepository.save(it)
        }
    }
}
