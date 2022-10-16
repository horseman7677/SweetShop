import {
  AppBar,
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
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Home.css";
import axios from "axios";

function Home() {
  let { name } = useParams();
  const [open, setOpen] = useState(false);
  const [samosa, setSamosa] = useState("");
  const [aalochop, setAalochop] = useState("");
  const [jalebi, setJalebi] = useState("");
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState();
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

  const getData = (data) => {
    console.log(data);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/items").then((res) => {
      //console.log(res.data);
      setItem(res.data);
    });
  }, []);

  // const handleChamge = (e) => {
  //   console.log(e.taget.value);
  // };

  const renderData = (item) => {
    // console.log(i);
    return (
      <div>
        {item?.map((i) => (
          <FormControl variant="filled" sx={{ m: 2, width: 150 }}>
            <InputLabel id="demo-simple-select-label" key={i.id}>
              {i.item}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                i.item === "samosa"
                  ? samosa
                  : "" || i.item === "aalochop"
                    ? aalochop
                    : "" || i.item === "jalebi"
                      ? jalebi
                      : ""
              }
              label={i.item}
              onChange={(e) => {
                console.log(i.item);
                if (i.item == "samosa") setSamosa(e.target.value);
                if (i.item == "aalochop") setAalochop(e.target.value);
                if (i.item == "jalebi") setJalebi(e.target.value);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="appBar">
        <AppBar color="secondary" position="sticky">

          <Toolbar className="toolBar">

            <div className="toolBarName">
              <Link
                to="/items"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "4px",
                  marginLeft: "8px",
                  color: "whitesmoke",
                }}
              >
                items
              </Link>

              <Link to="/dailyUpdate" style={{
                textDecoration: "none",
                textAlign: "center",
                fontSize: "20px",
                marginTop: "4px",
                marginLeft: "8px",
                color: "whitesmoke",
              }}>update
              </Link>
            </div>
            
            <div className="toolbarBrand">
              <Typography fontSize={25} fontFamily="fantasy">
                Aarvi Food Junction
              </Typography>
            </div>

            <div>
              <Button variant="contained" color="primary" onClick={bill}>
                bill
              </Button>
              <Button variant="contained" color="warning" onClick={reset}>
                reset
              </Button>
            </div>

            {/* <div className="toolBarWelcome">
              <Typography>Welcome :</Typography>
              <Typography>under dev</Typography>
            </div> */}
          </Toolbar>
        </AppBar>

        <div>{renderData(item)}</div>
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
