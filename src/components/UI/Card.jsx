import React from "react";

import styles from "./Card.module.css";

const Card = (props) => {
  const classes = styles.card + " " + (props.class ? props.class : "");

  return <section className={classes}>{props.children}</section>;
};

export default Card;
