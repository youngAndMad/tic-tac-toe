package kz.danekerscode.ttt.api.controller

import jakarta.servlet.http.HttpServletResponse
import kz.danekerscode.ttt.api.model.User
import kz.danekerscode.ttt.api.service.UserService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userService: UserService
) {

    @GetMapping("/me")
    fun me(): User? {
        return userService.currentUser()
    }

    @PostMapping("/avatar")
    fun uploadAvatar(
        @RequestParam image: MultipartFile
    ) {
        userService.uploadAvatar(image)
    }

    @GetMapping("/avatar/{id}")
    fun downloadAvatar(
        @PathVariable id: String,
        response: HttpServletResponse
    ) {
        response.contentType = "image/jpeg"
        userService.findById(id).imageBase64?.let {
            response.outputStream.write(Base64.getDecoder().decode(it))
        }
    }
}