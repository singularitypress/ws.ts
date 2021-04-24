import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Headline } from "./components/atom";
import { MessageBox, Messages } from "./components/molecule";

const App = () => {
  const [messageList, setMessageList] = useState(["default message"]);

  const ws = new WebSocket("ws://localhost:3000");
  ws.onopen = () => {
    console.log("Connection opened!");
  };
  ws.onclose = () => {
    ws.close();
  };

  useEffect(() => {
    ws.onmessage = ({ data }) => setMessageList([...messageList, data]);
  });

  const submit = (newMessage: string) => {
    if (!ws) {
      setMessageList(["No connection available"]);
    } else {
      ws.send(newMessage);
      setMessageList([...messageList, newMessage]);
    }
  };

  return (
    <>
      <Headline>Real Time Messaging</Headline>
      <Messages>
        <>
          {messageList.map((message, index) => {
            return <div key={index}>{message}</div>;
          })}
        </>
      </Messages>
      <MessageBox onSubmit={submit} />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
