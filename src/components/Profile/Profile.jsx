import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/auth/auth-actions";
import { authActions } from "../../store/auth/auth-slice";
import Card from "../UI/Card";
import Button from "../UI/Button";

import { saveToStorage } from "../../util";

import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const newPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const newPasswordValue = newPasswordInputRef.current.value;

    // validate here ...

    // send request ...
    dispatch(changePassword({ password: newPasswordValue }))
      .unwrap()
      .then((data) => {
        dispatch(authActions.login(data.idToken));
        saveToStorage(data);
        window.alert("Change password successfully");
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  return (
    <Card class={styles.profile}>
      <h2>Profile Page</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles["form-control"]}>
          <label htmlFor="password">Change password</label>
          <input type="password" id="password" ref={newPasswordInputRef} />
        </div>
        <div className={styles.actions}>
          <Button text="Confirm" type="submit" />
        </div>
      </form>
    </Card>
  );
};

export default Profile;
