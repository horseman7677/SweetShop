import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Home.css";

function Home(props) {
  let { name } = useParams();
  const [open, setOpen] = useState(false);
  const [samosa, setSamosa] = useState("");
  const [aalochop, setAalochop] = useState("");
  const [jalebi, setJalebi] = useState("");
  const [total, setTotal] = useState(0);
  //console.log(name);

  // const handleChange = (event) => {
  //   //console.log(event.target);
  //   setSamosa(event.target.value);
  // };

  const bill = () => {
    //alert(samosa + aalochop + jalebi);
    let sum = 0;

    if (samosa != "") sum = sum + samosa * 10;
    if (aalochop != "") sum = sum + aalochop * 7;
    if (jalebi != "") sum = sum + jalebi * 8;

    setTotal(sum);
    setOpen(true);
  };

  const reset = () => {
    setSamosa("");
    setAalochop("");
    setJalebi("");
  };

  return (
    <>
      <div className="appBar">
        <AppBar color="secondary" position="sticky">
          <Toolbar className="toolBar">
            <div className="toolBarName">
              <Typography fontSize={25} fontFamily="fantasy">
                Aarvi Food Junction
              </Typography>
              <Link
                to="/items"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "4px",
                  marginLeft: "8px",
                  color: "whitesmoke",
                  fontFamily: "cursive",
                }}
              >
                Items
              </Link>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={bill}>
                bill
              </Button>
              <Button variant="contained" color="warning" onClick={reset}>
                reset
              </Button>
            </div>
            <div className="toolBarWelcome">
              <Typography>Welcome</Typography>
              <Typography>{name}</Typography>
            </div>
          </Toolbar>
        </AppBar>

        <FormControl variant="filled" sx={{ m: 2, width: 150 }}>
          <InputLabel id="demo-simple-select-label">Samosa</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={samosa}
            label="samosa"
            onChange={(e) => {
              setSamosa(e.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 2, width: 150 }}>
          <InputLabel id="demo-simple-select-label">Aalochop</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={aalochop}
            label="aalochop"
            onChange={(e) => {
              setAalochop(e.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 2, width: 150 }}>
          <InputLabel id="demo-simple-select-label">Jalebi</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={jalebi}
            label="jalebi"
            onChange={(e) => {
              setJalebi(e.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Billing</DialogTitle>

        <DialogContent>
          {samosa ? (
            <Typography>
              Samosa : {samosa}p x ₹10 = {samosa * 10}
            </Typography>
          ) : (
            ""
          )}
          {aalochop ? (
            <Typography>
              Aalochop : {aalochop}p x ₹7 = {aalochop * 7}
            </Typography>
          ) : (
            ""
          )}
          {jalebi ? (
            <Typography>
              Jalebi : {jalebi}p x ₹8 = {jalebi * 8}
            </Typography>
          ) : (
            ""
          )}
          {total ? <Typography>Total : ₹{total}</Typography> : ""}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              alert("saved");
            }}
          >
            save
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            cencal
          </Button>
        </DialogActions>
      </Dialog>
      ;
    </>
  );
}

export default Home;
