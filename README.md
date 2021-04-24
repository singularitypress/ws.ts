# Websockets

## Server-side

### 1. Our Imports

There's three key pieces for this: `express`, `ws`, and `http`. Normally, when making a node webserver, you don't need to use `http`, you can just do `app = express()` and then `app.get(...)`. We're going to need `http` for `ws` though.

```typescript
import express from "express";
import Websocket from "ws";
import http from "http";
```

### 2. Setting Up Client-side

This operates the way we normally expect. We create an express app with

```typescript
const app = express();
```

We then set up a static directory for our css and js with:

```typescript
app.use(express.static("public"));
```

Afterwards, we throw some HTML at the browser on the root route:

```typescript
app.get("/", (req, res) => {
  res.send(
    `
    HTML STUFF HERE
    `,
  );
});
```

Then we initialize this express app with:

```typescript
app.listen(3001, () => {
  console.log("server started 3001");
});
```

### 3. Setting up websockets

Create an `http.Server` with:

```typescript
const server = http.createServer(express);
```

Create an instance of a websocket server:

```typescript
const WebsocketServer = new Websocket.Server({ server });
```

Set up a websocket event where on a connection, we set up another event on message, we send the message data to all of the clients that have connected to the websocket server:

```typescript
WebsocketServer.on("connection", (ws) => {
  ws.on("message", (data) => {
    WebsocketServer.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(data);
      }
    });
  });
});
```

Initialize the http server:

```typescript
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
```
