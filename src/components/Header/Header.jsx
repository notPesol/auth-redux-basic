import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth/auth-slice";
import { logoutHandler as logout } from "../../util";
import Button from "../UI/Button";

import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    logout(dispatch, authActions.logout);
    navigate("/auth");
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Redux Auth</Link>
      </h1>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Button text="Logout" onClick={logoutHandler} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
