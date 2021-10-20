const messageExpirationTimeMS = 5 * 60 * 1000;

class ConnectionService {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    socket.on("packSold", value => {
      this.handlePackSold(value);
    });
    socket.on("disconnect", () => console.log("Disconnect"));
    socket.on("connect_error", err => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendPackSoldNotification(message) {
    console.log("Value-2", message);
    this.io.sockets.emit("pack-sold", message);
  }

  static sendPackSoldNotification1(message) {
    console.log("Value-1", message, this.io);
    this.io.sockets.emit("pack-sold1", message);
  }

  handlePackSold(packId) {
    console.log("Value-3", packId);
    this.sendPackSoldNotification(packId);
  }
}

export default ConnectionService;
