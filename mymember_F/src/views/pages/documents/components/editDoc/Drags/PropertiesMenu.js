import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import Users from "../sideMenu/Users";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { FormControl } from "@mui/material";
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

export default function PropertiesMenu({ open, item }) {
  
  const [state, setState] = useState(open);
  const [required, setRequired] = useState(item.required);
  //console.log("properties", title);
  const toggleDrawer = (o) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(o);
  };
  const handleCollapse = (e) => {
    e.preventDefault();
    var area = e.target.getAttribute("aria-controls");
    console.log("area", area);
    console.log("classList", document.getElementById(area).classList);
    if (document.getElementById(area).classList.contains("show")) {
      document.getElementById(area).classList.remove("show");
    } else {
      document.getElementById(area).classList.add("show");
    }
  };
  const handleRequireChange = (e) => {
    setRequired(e.target.checked);
  };
  useEffect(() => {
 
    if(open===true){
      setState(open);
    }
  }, [open]);
  const list = () => (
    <Box sx={{ width: 250, minHeight: "100vh" }} role="presentation">
      <div className="accordion" style={{ borderRadius: "none" }}>
        <div className="accordion-item" style={{ borderRadius: "none" }}>
          <h2 className="accordion-header" id="headingTitle">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseTitle"
              style={{ backgroundColor: grey[100], color: grey[700] }}
            >
              {item.icon}
              <span className="ps-1">{item.title}</span>
            </button>
          </h2>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingRecipient">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseRecipient"
              onClick={handleCollapse}
              style={{ backgroundColor: grey[200], color: grey[700] }}
            >
              Recipient
            </button>
          </h2>
          <div
            id="collapseRecipient"
            className="accordion-collapse collapse show"
            aria-labelledby="headingRecipient"
          >
            <div className="accordion-body">
              <Users item={item} />
              <FormControlLabel
                control={
                  <Checkbox checked={required} onChange={handleRequireChange} />
                }
                label="Required Field"
              />
              {["company","title","text","checkbox","dropdown","radio"].includes(item.type) &&
                <FormControlLabel
                control={
                  <Checkbox />
                }
                label="Read Only"
              />
              }
            </div>
          </div>
        </div>
        {[
          "sign",
          "initial",
          "signDate",
          "name",
          "email",
          "company",
          "title",
          "text",
          "checkbox",
          "dropdown",
          "radio",
          "formula",
          "note",
          "approve",
          "decline",
        ].includes(item.type) && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFormating">
              <button
                className="accordion-button"
                type="button"
                aria-expanded="true"
                aria-controls="collapseFormating"
                onClick={handleCollapse}
                style={{ backgroundColor: grey[200], color: grey[700] }}
              >
                Formating
              </button>
            </h2>
            <div
              id="collapseFormating"
              className="accordion-collapse collapse show"
              aria-labelledby="headingFormating"
            >
              <div className="accordion-body">
                {["sign", "initial"].includes(item.type) && (
                  <div className="row">
                    <div className="col-6">
                    <TextField
                    
                      variant="outlined"
                      value={item.formatting}
                      className="border py-0"
                      size="small"
                    />
                    </div>
                    <div className="col-6 my-auto">
                    <span>Scale %</span>
                    </div>
                    
                    
                  </div>
                )}
                {[
                  "signDate",
                  "name",
                  "email",
                  "company",
                  "title",
                  "text",
                  "checkbox",
                  "dropdown",
                  "radio",
                  "formula",
                  "note",
                  "approve",
                  "decline",
                ].includes(item.type) && (
                  <div>
                    <FormControl fullWidth>
                      <Select label="Font" className="border py-0">
                        <MenuItem value={10}>font1</MenuItem>
                        <MenuItem value={20}>font2</MenuItem>
                        <MenuItem value={30}>font3</MenuItem>
                      </Select>
                    </FormControl>
                    <div className="row">
                      <div className="col-5">
                        <FormControl fullWidth>
                          <Select label="size" className="border py-0">
                            <MenuItem value={10}>9</MenuItem>
                            <MenuItem value={20}>10</MenuItem>
                            <MenuItem value={30}>11</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-7">
                        <IconButton>
                          <FormatBoldIcon />
                        </IconButton>
                        <IconButton>
                          <FormatItalicIcon />
                        </IconButton>
                        <IconButton>
                          <FormatUnderlinedIcon />
                        </IconButton>
                      </div>
                    </div>
                    <FormControl fullWidth>
                      <Select label="Color">
                        <MenuItem value={10}>red</MenuItem>
                        <MenuItem value={20}>black</MenuItem>
                        <MenuItem value={30}>blue</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingDataLabel">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseDataLabel"
              onClick={handleCollapse}
              style={{ backgroundColor: grey[200], color: grey[700] }}
            >
              Data Label
            </button>
          </h2>
          <div
            id="collapseDataLabel"
            className="accordion-collapse collapse show"
            aria-labelledby="headingDataLabel"
          >
            <div className="accordion-body">
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={item.dataLabel}
                className="border py-0"
                      size="small"
              />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTooltip">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseTooltip"
              onClick={handleCollapse}
              style={{ backgroundColor: grey[200], color: grey[700] }}
            >
              Tooltip
            </button>
          </h2>
          <div
            id="collapseTooltip"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTooltip"
          >
            <div className="accordion-body">
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={item.tooltip}
                className="border py-0"
                      size="small"
              />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingLocation">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseLocation"
              onClick={handleCollapse}
              style={{ backgroundColor: grey[200], color: grey[700] }}
            >
              Location
            </button>
          </h2>
          <div
            id="collapseLocation"
            className="accordion-collapse collapse show"
            aria-labelledby="headingLocation"
          >
            <div className="accordion-body">
              <div className="row">
                <div className="col-5">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={item.left}
                  className="border py-0"
                      size="small"
                />
                
                </div>
                <div className="col-7 my-auto">
                <span>Location from left</span>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={item.top}
                  className="border py-0"
                      size="small"
                />
              
                </div>
                <div className="col-7 my-auto">
                <span>Location from top</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingAutoplace">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseAutoplace"
              onClick={handleCollapse}
              style={{ backgroundColor: grey[200], color: grey[700] }}
            >
              Autoplace
            </button>
          </h2>
          <div
            id="collapseAutoplace"
            className="accordion-collapse collapse show"
            aria-labelledby="headingAutoplace"
          >
            <div className="accordion-body">
              <Button>Setup</Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{ position: "relative", right: "0px", bottom: "0px" }}
      >
        <div className="card-body">
          <Button>Save as custom field</Button>
          <Button>Delete</Button>
        </div>
      </div>
    </Box>
    // <h6 style={{paddingLeft:"20px"}}>{titleIcon} {title} </h6>
  );
  return (
    <div>
      <React.Fragment>
        
        <Drawer
          anchor="right"
          open={state}
          onClose={toggleDrawer(false)}
          variant="persistent"
          sx={{
            "& .MuiDrawer-root": {
              position: "absolute",
            },
            "& .MuiPaper-root": {
              position: "absolute",
            },
            
          }}
          PaperProps={{}}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
