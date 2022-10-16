import { AppBar, Toolbar, Typography } from '@mui/material'
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

function DailyUpdate() {

    const [update, setUpdate] = useState()

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

                    </Toolbar>
                </AppBar>
                <div>

                </div>
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

        </>
    )
}

export default DailyUpdate