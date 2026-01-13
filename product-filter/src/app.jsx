import React from "react";
import ReactDom from "react-dom/client";
import Body from "./cpmponents/Body";

const App = () => {
  return (
    <div>
      <h2>I'll go inside root.</h2>
      <Body />
    </div>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
