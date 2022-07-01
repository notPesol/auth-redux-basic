import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = " YOUR_API_KEY ";

const signInEndPoint =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  API_KEY;

const signUpEnpoint =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;

const changePasswordEndPoint =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

export const loginByEmailAndPassword = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
    const response = await fetch(signInEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error.message;
      return rejectWithValue(errorMessage);
    }

    return fulfillWithValue(data);
  }
);

export const signUpByEmailAndPassword = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
    const response = await fetch(signUpEnpoint, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error.message;
      return rejectWithValue(errorMessage);
    }

    return fulfillWithValue(data);
  }
);

export const changePassword = createAsyncThunk(
  "auth/signUp",
  async ({ password }, { fulfillWithValue, rejectWithValue }) => {
    const response = await fetch(changePasswordEndPoint, {
      method: "POST",
      body: JSON.stringify({
        idToken: localStorage.getItem("token"),
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error.message;
      return rejectWithValue(errorMessage);
    }

    return fulfillWithValue(data);
  }
);
