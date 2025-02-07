package kz.danekerscode.ttt.api.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.HttpStatusEntryPoint

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        clientRegistrationRepository: ClientRegistrationRepository,
        oauth2SuccessHandler: Oauth2SuccessHandler
    ) : SecurityFilterChain {
        http
            .csrf { it.disable() }
            .httpBasic { it.disable() }
            .formLogin { it.disable() }
            .authorizeHttpRequests {
                auth -> auth.anyRequest().authenticated()
            }
            .headers { headers ->
                headers.frameOptions { frameOptions ->
                    frameOptions.disable()
                }
            }
            .exceptionHandling {
                it.authenticationEntryPoint(HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            }
            /*
             * If you request POST /logout, then it will perform the following default operations using a series of LogoutHandlers:
             * Invalidate the HTTP session (SecurityContextLogoutHandler)
             * Clear the SecurityContextHolderStrategy (SecurityContextLogoutHandler)
             * Clear the SecurityContextRepository (SecurityContextLogoutHandler)
             * Clean up any RememberMe authentication (TokenRememberMeServices / PersistentTokenRememberMeServices)
             * Clear out any saved CSRF token (CsrfLogoutHandler)
             * Fire a LogoutSuccessEvent (LogoutSuccessEventPublishingLogoutHandler)
             * Once completed, then it will exercise its default LogoutSuccessHandler which redirects to /login?logout.
             */
            .logout {
                it
                    .logoutSuccessHandler(
                        OidcClientInitiatedLogoutSuccessHandler(clientRegistrationRepository)
                    )
                    .logoutUrl("/api/v1/auth/logout")
                    .permitAll()
            }
            .oauth2Login { oauth2 ->
                oauth2
                    .successHandler(oauth2SuccessHandler).permitAll()
            }

        return http.build()
    }
}
