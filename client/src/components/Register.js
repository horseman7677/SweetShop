import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const content = {
  username: "",
  password: "",
};

function Register() {
  const navigate = useNavigate();

  const [credential, setCredential] = useState(content);
  const [msg, setMsg] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setCredential({
      ...credential,
      [name]: value,
    });
  };

  useEffect(() => {
    if (credential.username != "" && credential.password != "") {
      setIsDisable(false);
    }
  }, [credential]);

  const checkUser = () => {
    const data = {
      username: credential.username,
      password: credential.password,
    };
    axios.post("http://localhost:3001/auth", data).then((res) => {
      console.log(res.data);
      if (res.data == 0) {
        setMsg("Invalid Credential");
        return;
      } else {
        navigate("/");
      }
    });
  };
  return (
    <div className="mainLogin">
      <div className="loginLefts"></div>
      <div className="loginRights">
        <Typography variant="h4" style={{ color: "white" }}>
          Register
        </Typography>
        <br />
        <Typography variant="h6" style={{ color: "red" }}>
          {msg}
        </Typography>
        <br />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          placeholder="Username"
          color="secondary"
          name="username"
          value={credential.username}
          onChange={handleChange}
          autoComplete="off"
          autoFocus="true"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          placeholder="Password"
          color="secondary"
          name="password"
          value={credential.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <br />
        <Button variant="contained" disabled={isDisable} onClick={checkUser}>
          Register
        </Button>
        <div className="help">
          <Typography>already have account?</Typography>
          <Link className="link" to="/">
            login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
