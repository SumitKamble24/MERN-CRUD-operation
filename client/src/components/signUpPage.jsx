import { Button, DialogActions, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../authUtils/authLogin";

function SignUpPage() {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData);
    // const { email, username, password } = formProps;

    try {
      if (!userName.length || !password || !email) {
        setMessage("All Fields are required.");
      } else {
        await register(userName, password, email);
        setMessage("Registration successful! You can now log in.");
        navigate("/login");
      }
    } catch (error) {
      setMessage(error);
    }
  };
  return (
    <>
      <div>Sign Up</div>
      <div>
        <Box component="form" onSubmit={handleSignUp}>
          <TextField
            autoFocus
            margin="dense"
            label="Enter User Name"
            fullWidth
            variant="standard"
            name="username"
            error={!userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Enter Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            error={!email}
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
            error={!password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <DialogActions>
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </DialogActions>
        </Box>
        <NavLink to={"/login"}>
          <Button variant="contained">Login</Button>
        </NavLink>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default SignUpPage;
