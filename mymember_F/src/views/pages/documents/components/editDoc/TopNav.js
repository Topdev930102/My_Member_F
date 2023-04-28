import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button, Divider, IconButton } from "@mui/material";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
export default function TopNav() {
  const handleChange = () => {};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white shadow">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="rounded-pill btn btn-dark">Back</button>
          </li>
        </ul>

        <ul className="navbar-nav justify-content-end">
          <li className="nav-item">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </li>
          <li className="nav-item dropdown">
            <FormControl fullWidth style={{minWidth:"150px"}}>
              <InputLabel >ACTIONS</InputLabel>
              <Select  onChange={handleChange}>
                <MenuItem value={10}>
                  <Button>Save & Close</Button>
                </MenuItem>
                <MenuItem value={20}>
                  <Button>Discard</Button>
                </MenuItem>
                <Divider/>
                <MenuItem value={30}>Edit Message</MenuItem>
                <MenuItem value={30}>Edit Recipient</MenuItem>
                <MenuItem value={30}>Edit Document</MenuItem>
                <MenuItem value={30}>Edit Advance Options</MenuItem>
              </Select>
            </FormControl>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-secondary rounded-pill mx-2">
              Preview
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-primary">SEND</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
