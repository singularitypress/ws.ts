import React, { useState } from "react";

type TMessageBox = {
  onSubmit: (newMessage: string) => void;
};

export const MessageBox = ({ onSubmit }: TMessageBox) => {
  const [message, setMessage] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setMessage("");
    }}>
      <input
        id="message-box"
        type="text"
        placeholder="enter a message"
        style={{
          display: "block",
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
        }}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        id="send"
        title="send message!"
        style={{ width: "100%", height: "30px" }}
        onClick={() => onSubmit(message)}
      >
        Send Message
      </button>
    </form>
  );
};
