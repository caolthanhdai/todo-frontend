import { io, Socket } from "socket.io-client"
import { getApiBaseUrl } from "./env"
import { getAccessToken } from "./authToken"

let socket: Socket | null = null

export function getSocket() {
  const token = getAccessToken()
  if (!socket) {
    socket = io(getApiBaseUrl(), {
      auth: { token },
      autoConnect: true,
    })
  }
  return socket
}
export const disconnectSocket = () => {
  socket?.disconnect()
  socket = null
}
