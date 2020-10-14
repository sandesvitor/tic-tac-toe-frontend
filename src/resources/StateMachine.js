class StateMachine {
    constructor(socket, playerPosition) {
        this.socket = socket
        this.whoAmI = playerPosition
        this.state = "WAITING_PLAYERS"
        this.gameStates = {
            WAITING_PLAYERS: {
                action: () => {
                    console.log("<<< WAITING FOR PLAYERS >>>")
                }
            },
            PLAYER_1_TURN: {
                action: () => {
                    console.log("<<< PLAYER 1 TURN >>>")
                    console.debug("this.whoAmI:")
                    console.debug(this.whoAmI)
                    this.socket("selectCell", {})
                }
            },
            PLAYER_2_TURN: {
                action: () => {
                    console.log("<<< PLAYER 2 TURN >>>")
                    console.debug("this.whoAmI:")
                    console.debug(this.whoAmI)
                }
            },
            GAME_OVER: {
                action: () => console.log("Game over brow!")
            }
        }
    }
    clickHandlerPlayer1 = (event) => {
        if (this.whoAmI === 1) {
            const cellId = event.target.getAttribute("cell-id")
            const data = { currentPlayer: 1, nextPlayer: 2, cellId: cellId }
            this.socket.emit("selectCell", data)
        } else {
            console.debug("Player 1 Turn!")
        }
    }
    clickHandlerPlayer2 = (event) => {
        if (this.whoAmI === 2) {
            const cellId = event.target.getAttribute("cell-id")
            const data = { currentPlayer: 2, nextPlayer: 1, cellId: cellId }
            this.socket.emit("selectCell", data)
        } else {
            console.debug("Player 2 Turn!")
        }
    }
    dispatch = () => {
        this.gameStates[this.state].action()
    }
    changeState = (newState) => {
        this.state = newState
    }
}

export default StateMachine