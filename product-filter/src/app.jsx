import React from "react";
import ReactDom from "react-dom/client";

const App = () => {
  return (
    <div>
      <h2>I'll go inside root.</h2>
    </div>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
