import { io } from '../resources/socketClient'

const socket = io.connect("http://localhost:5000/")

socket.on("connect", () => {
    console.log("Connected with server!")


    setTimeout(() => {
        const data = {
            currentPlayer: 1,
            nextPlayer: 2,
            cellId: "1",
            cellCoordinates: [1, 2]
        }

        socket.emit("selectCell", data)

    }, 3000)




    socket.on("whoAmI", position => {
        const msg = position !== 0
            ? `You are Player ${position}`
            : "Waiting for vacancy\nPlease wait..."
        console.log(msg)
    })



    socket.on("roomData", roomData => {
        console.log(roomData)
    })

})
