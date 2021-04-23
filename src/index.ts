import express from "express";
import Websocket from "ws";
import http from "http";

const port = process.env.PORT || 3000;
const server = http.createServer(express);
const WebsocketServer = new Websocket.Server({ server });

WebsocketServer.on("connection", (ws) => {
  ws.on("message", (data) => {
    WebsocketServer.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
