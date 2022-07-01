import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  const classes = styles.button + " " + (props.class ? props.class : "");

  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      type={props.type || "button"}
      onClick={onClickHandler}
      className={classes}
    >
      {props.text}
    </button>
  );
};

export default Button;
