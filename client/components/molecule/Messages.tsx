import React, { ReactChild } from "react";

type TMessages = {
  children?: ReactChild;
};

export const Messages = ({ children }: TMessages) => {
  return (
    <pre id="messages" style={{ height: "400px", overflow: "scroll" }}>
      {children}
    </pre>
  );
};
