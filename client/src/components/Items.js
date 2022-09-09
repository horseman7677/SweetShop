import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";

const field = {
  item: "",
  price: "",
};

const columns = [
  { field: "itemName", headerName: "Items Name", width: 130 },
  { field: "itemPrice", headerName: "Price ₹", width: 130 },
];
let rows = [];

function Items() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(field);
  const [items, setItems] = useState();

  console.log(data);
  useEffect(() => {
    axios.get("http://localhost:3001/items").then((res) => {
      setItems(res.data);
      console.log(res.data.length);

      for (let i = 0; i < res.data.length; i++) {
        const feed = {
          id: res.data[i].id,
          itemName: res.data[i].item,
          itemPrice: res.data[i].price,
        };
        rows = [...rows, feed];
        console.log(feed);
      }

      let clean = rows.filter(
        (rows, idx, self) => idx === self.findIndex((t) => t.id === rows.id)
      );
      //console.log(clean);
      rows = clean;
    });
  }, []);

  const add = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <AppBar color="secondary" position="sticky">
          <Toolbar className="toolBar">
            <div className="toolBarName">
              <Typography fontSize={25} fontFamily="fantasy">
                Aarvi Food Junction
              </Typography>
              <Link
                to="/home/:name"
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
                Home
              </Link>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={add}>
                Add
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Dialog
        maxWidth="xl"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Add Items</DialogTitle>

        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Item Name"
            variant="filled"
            name="item"
            value={data.item}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="filled"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // alert("saved");
              axios.post("http://localhost:3001/items", data).then(() => {
                alert("Items added");
                setData(field);
                setOpen(false);
              });
            }}
          >
            save
          </Button>
          <Button
            onClick={() => {
              setData(field);
              setOpen(false);
            }}
          >
            cencal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Items;
