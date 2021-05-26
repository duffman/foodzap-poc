"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeConnection = void 0;
class RealtimeConnection {
    constructor(clientSocket = null) {
        this.socketId = "";
        this.connectionId = "";
        this.socket = null;
        this.socket = clientSocket;
        this.socketId = clientSocket.id;
    }
    //TODO: Use for garbage collection
    getLastConnected() {
        return undefined;
    }
    setConnectionId(id) {
        this.connectionId = id;
    }
    getConnectionId() {
        return this.connectionId;
    }
    closeConnection() {
        this.socket.close();
    }
}
exports.RealtimeConnection = RealtimeConnection;
