import React from "react";

const ButtonCounter = (props) => (
  <button type="button" onClick={props.counterOperation}>
    {props.text}
  </button>
);

export default ButtonCounter;
