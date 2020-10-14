import { io } from '../resources/socketClient'

const socket = io.connect("http://localhost:5000/")

socket.on("connect", () => {
    console.log("Estamos conectados!")

    socket.on("whoAmI", position => {
        const msg = position !== 0
            ? `You are Player ${position}`
            : "Waiting for vacancy\nPlease wait..."
        console.log("You are Player [%s]", position)
    })

    socket.on("roomData", roomData => {
        console.log(roomData)
    })

})
