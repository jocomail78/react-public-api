import React from "react";
import { render } from "react-dom";
import Element from "./Element";

const App = () => {
  return (
    <div>
      <Element />
    </div>
  );
};

render(<App />, document.getElementById("root"));
