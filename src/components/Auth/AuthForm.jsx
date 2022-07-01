import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  loginByEmailAndPassword,
  signUpByEmailAndPassword,
} from "../../store/auth/auth-actions";
import { authActions } from "../../store/auth/auth-slice";

import Button from "../UI/Button";

import styles from "./AuthForm.module.css";

import { saveToStorage } from "../../util";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const toggleSignInHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;

    // validate here ....

    // send request...
    if (isLogin) {
      dispatch(
        loginByEmailAndPassword({ email: emailValue, password: passwordValue })
      )
        .unwrap()
        .then((data) => {
          dispatch(authActions.login(data.idToken));
          saveToStorage(data);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          window.alert(err);
        });
    } else {
      // handler sign up
      dispatch(
        signUpByEmailAndPassword({ email: emailValue, password: passwordValue })
      )
        .unwrap()
        .then((data) => {
          dispatch(authActions.login(data.idToken));
          saveToStorage(data);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          window.alert(err);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles["form-control"]}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} />
      </div>
      <div className={styles["form-control"]}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordInputRef} />
      </div>
      <div className={styles.actions}>
        <Button text={isLogin ? "Sign in" : "Sign up"} type="submit" />
        <Button
          onClick={toggleSignInHandler}
          class={styles.switch}
          text={
            isLogin
              ? "Not have a account ?, Sign in"
              : "Have a account ?, Sign in"
          }
        />
      </div>
    </form>
  );
};

export default AuthForm;
