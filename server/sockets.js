// const Snake = require("./Models/Snake");
const Game = require("./Game.js");

const game = new Game();

const socketFunction = io => {
  io.on("connection", socket => {
    console.log("got a connection", socket.id);
    socket.broadcast.emit("connected", socket.id);

    socket.on("init", () => {
      game.playerJoin(socket.id);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("dc", socket.id);
      game.playerLeave(socket.id);
    });

    socket.on("tick", direction => {
      game.playerMoves[socket.id].move = direction;
      game.playerMoves[socket.id].ready = true;
      if (game.ready()) {
        game.tick();
        io.sockets.emit("state", game.state());
      }
    });
  });
};

module.exports = socketFunction;
