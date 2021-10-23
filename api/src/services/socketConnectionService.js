const messageExpirationTimeMS = 5 * 60 * 1000;

class ConnectionService {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    socket.on("packSold", value => {
      this.handlePackSold(value);
    });
    socket.on("disconnect", () => this.onDisconnect());
    socket.on("connect_error", err => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendPackSoldNotification(message) {
    this.io.sockets.emit("pack-sold", message);
  }

  handlePackSold(packId) {
    this.sendPackSoldNotification(packId);
  }

  onDisconnect() {
    this.io.sockets.emit("socket-disconnected", "Please Reconnect");
  }
}

export default ConnectionService;
