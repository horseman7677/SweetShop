import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

function Home(props) {
  let { name } = useParams();
  //console.log(name);
  return (
    <>
      <div className="appBar">
        <AppBar color="secondary" position="sticky">
          <Toolbar className="toolBar">
            <div className="toolBarName">
              <Typography>Sweets Shop</Typography>
            </div>
            <div className="toolBarWelcome">
              <Typography>Welcome</Typography>
              <Typography >{name}</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default Home;
