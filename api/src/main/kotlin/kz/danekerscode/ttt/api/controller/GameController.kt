package kz.danekerscode.ttt.api.controller

import kz.danekerscode.ttt.api.model.GameRoom
import kz.danekerscode.ttt.api.service.GameService
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/game")
class GameController(
    private val gameService: GameService
) {

    @PostMapping
    fun createOrJoinRoom(): GameRoom {
        return gameService.createOrJoinRoom()
    }

    @GetMapping("/start/{friendId}")
    fun startGameRequest(
        @PathVariable friendId: String
    ) {
        gameService.sendStartGameRequest(friendId)
    }

    @GetMapping("{id}")
    fun findRoom(@PathVariable id: String): GameRoom = gameService.findRoom(id)

    @PostMapping("{id}/move")
    fun makeMove(
        @PathVariable id: String,
        @RequestParam idx: Int
    ) = gameService.makeMove(id, idx)

}