import React from "react";

import Card from "../../components/UI/Card";
import AuthForm from "./AuthForm";

import styles from "./Auth.module.css";

const Auth = () => {
  return (
    <Card class={styles.auth}>
      <h2>Authentication Page</h2>
      <AuthForm />
    </Card>
  );
};

export default Auth;
