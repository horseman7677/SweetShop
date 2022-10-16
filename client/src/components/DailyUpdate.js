import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const field = {
    product: "",
    quantity: "",
    unit: "",
    createdAt: ""
}

const columns = [
    { field: "product", headerName: "Product", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "unit", headerName: "unit", width: 130 },
    { field: "createdAt", headerName: "Date", width: 130 },

];

let rows = [];

const filterDate = (date) => {

    let store = date.split("-")
    //console.log(store[2].slice(0,2));
    let extractDate = store[2].slice(0, 2) + "-" + store[1] + "-" + store[0]
    //console.log(extractDate);
    return extractDate
}
//------------------------------------------------------------------------------------------------------------------------------------------
function DailyUpdate() {

    const [update, setUpdate] = useState()
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(field);

    console.log(data);
    useEffect(() => {

        axios.get("http://localhost:3001/update").then((res) => {
            //console.log(res.data);
            setUpdate(res.data)

            for (let i = 0; i < res.data.length; i++) {
                const feed = {
                    id: res.data[i].id,
                    product: res.data[i].product,
                    quantity: res.data[i].quantity,
                    unit: res.data[i].unit,
                    createdAt: filterDate(res.data[i].createdAt)

                }
                rows = [...rows, feed];
                //console.log(feed);
            }
            let clean = rows.filter(
                (rows, idx, self) => idx === self.findIndex((t) => t.id === rows.id)
            );
            //console.log(clean);
            rows = clean;
        })
    }, [])

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
                            <Button variant="contained" color="primary" onClick={add}>
                                Add
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div>

                </div>
            </div>
            <div>
                <Typography align="center">here you can update daily expenditure</Typography>
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
                        label="Product"
                        variant="filled"
                        name="product"
                        value={data.product}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        type="number"
                        variant="filled"
                        name="quantity"
                        value={data.quantity}
                        onChange={handleChange}
                    />
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name="unit"
                        value={data.unit}
                        onChange={handleChange}
                    >
                        <MenuItem value={"kg"}>Kg</MenuItem>
                        <MenuItem value={"gram"}>Gram</MenuItem>
                        <MenuItem value={"piece"}>Piece</MenuItem>

                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            // alert("saved");
                            axios.post("http://localhost:3001/update", data).then(() => {
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
    )
}

export default DailyUpdate