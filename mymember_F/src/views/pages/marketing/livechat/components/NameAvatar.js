import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  nameAvatar: {
    borderRadius: "50%",
    // backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    backgroundColor: (value) => "#" + value,
    color: "white",
    height: "40px",
    width: "47px",
    padding: "auto",
    display: "flex",
    fontSize: "16px",
    alignItems: "center",
    justifyContent: "center",
  },
  color: (props) => props.color,
});

const NameAvatar = (props) => {
  const displayNames = props.displayName?.split(" ");
  let result = 1;
  if(displayNames.length === 1) result = (displayNames[0].charCodeAt(0) - 64) * (displayNames[0].charCodeAt(0) - 64);
  if(displayNames.length === 2) result = (displayNames[0].charCodeAt(0) - 64) * (displayNames[1].charCodeAt(0) - 64);
  
  const classes = useStyles(10030032 + result * 2400); // TODO:  Need to be more smooth

  return <div className={classes.nameAvatar}>{displayNames?.map((item) => item.charAt())}</div>;
};

export default NameAvatar;
