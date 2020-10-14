import { io } from '../resources/socketClient'

const socket = io("http://localhost:5000/")

socket.on("connect", () => {
    console.log("Estamos conectados!")

    socket.on("data", data => {
        console(data)
    })
})
