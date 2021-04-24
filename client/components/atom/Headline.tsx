import React from "react";

type THeadline = {
  children: string;
};

export const Headline = ({ children }: THeadline) => {
  return <h1>{children}</h1>;
};
