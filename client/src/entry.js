import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";

require("./styles/main.styl");

const mountNode = document.getElementById("root");

ReactDOM.render(<Application />, mountNode, () => {
  console.info("Application rendered!")
});