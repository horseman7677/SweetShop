import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Home from "./Home";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import axios from "axios";

const content = {
  username: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState(content);
  const [msg, setMsg] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [name, setName] = useState();

  // console.log(credential);

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
    axios.post("http://localhost:3001/auth/login", data).then((res) => {
      //console.log(res.data);
      //setName(res.data);

      if (res.data == 0) {
        setMsg("Invalid Credential");
        return;
      } else {
        console.log(res.data);
        navigate(`/home/${res.data}`);
      }
    });
  };
  return (
    <>
      <div className="mainLogin">
        <div className="loginLeft"></div>
        <div className="loginRight">
          <Typography variant="h4" style={{ color: "white" }}>
            Login
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
            login
          </Button>
          <div className="help">
            <Typography>need help?</Typography>
            <Link className="link" to="/register">
              {" "}
              create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
