import express from "express";
import Websocket from "ws";
import http from "http";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(express);
const WebsocketServer = new Websocket.Server({ server });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(
    `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      
        <title>The HTML5 Test</title>
        <meta name="description" content="Test">
        <meta name="author" content="Test">
      
      </head>
      
      <body>
        <div id="root"></div>
        <script src="bundle.js"></script>
      </body>
    </html>
    `,
  );
});

WebsocketServer.on("connection", (ws) => {
  ws.on("message", (data) => {
    WebsocketServer.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.listen(3001, () => {
  console.log("server started 3001");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
