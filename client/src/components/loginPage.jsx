import { Button, DialogActions, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../authUtils/authLogin";

function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    e.preventDefault();
    try {
      if (!email.length || !password.length) {
        setMessage("Login failed. Check your credentials and try again.");
      } else {
        await login("ssumit132@gmail.com", "Pass@123");
        navigate("/");
      }
    } catch (error) {
      setMessage("Login failed. Check your credentials and try again.");
    }
  };
  return (
    <>
      <div>Login</div>
      <div>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            fullWidth
            type="password"
            name="password"
            variant="standard"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <DialogActions>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </DialogActions>
        </Box>
        <NavLink to={"/signUp"}>
          <Button variant="contained">Sign Up</Button>
        </NavLink>
      </div>
      {message && <p>{message}</p>}
    </>
  );
}

export default LoginPage;
