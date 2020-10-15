import { io } from '../resources/socketClient'
const socket = io("http://localhost:5000/")

const gameInfo = document.querySelector(".game-info > h1")

socket.on("connect", () => {
    console.debug("Connected!")
    const cells = document.querySelectorAll(".cell")

    let roomState
    let whoAmI

    socket.on("whoAmI", position => {
        const msg = position !== 0
            ? `You are Player ${position}`
            : "Waiting for vacancy\nPlease wait..."
        console.log(msg)

        whoAmI = position
    })

    Array.from(cells).forEach(cell => {
        cell.addEventListener("click", event => {
            if (roomState.state == "WAITING_PLAYERS") {
                console.log("Wait, dude...")
            }
            else if (roomState.state == "PLAYER_1_TURN") {
                console.log("<<< PLAYER 1 TURN >>>")
                if (whoAmI === 1) {
                    const cellId = parseInt(event.target.getAttribute('cell-id'))
                    const cellRow = parseInt(event.target.getAttribute('row'))
                    const cellCollumn = parseInt(event.target.getAttribute('column'))
                    let isSelected = roomState.cellMatrix.find(cell => cell[1] == cellId)

                    if (!isSelected) {
                        console.log("Player 1 clicked!")
                        socket.emit("selectCell", {
                            currentPlayer: 1,
                            nextPlayer: 2,
                            cellId: cellId,
                            cellCoordinates: [cellRow, cellCollumn]
                        })
                    } else {
                        console.log("Cell alread selected")
                    }
                }
                else {
                    console.log("You are NOT Player 1...")
                }
            }
            else if (roomState.state == "PLAYER_2_TURN") {
                console.log("<<< PLAYER 2 TURN >>>")
                if (whoAmI === 2) {
                    const cellId = parseInt(event.target.getAttribute('cell-id'))
                    const cellRow = parseInt(event.target.getAttribute('row'))
                    const cellCollumn = parseInt(event.target.getAttribute('column'))
                    let isSelected = roomState.cellMatrix.find(cell => cell[1] == cellId)

                    if (!isSelected) {
                        console.log("Player 2 clicked!")
                        socket.emit("selectCell", {
                            currentPlayer: 2,
                            nextPlayer: 1,
                            cellId: cellId,
                            cellCoordinates: [cellRow, cellCollumn]
                        })
                    } else {
                        console.log("Cell alread selected")
                    }
                }
                else {
                    console.log("You are NOT Player 2...")
                }
            }
            else {
                return
            }
        })
    })


    socket.on("roomData", roomData => {
        console.log(roomData)
        gameInfo.innerHTML = roomData.message
        roomState = roomData
    })

    socket.on("fillCell", data => {
        console.debug(data)
        const { cellToFill, currentPlayer } = data
        const cellSelected = document.querySelector(`[cell-id="${cellToFill}"]`)
        cellSelected.classList.add(`selected-player-${currentPlayer}`)
    })
})

