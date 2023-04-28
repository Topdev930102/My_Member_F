import { Drawer, makeStyles } from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListAllCategories from "./listCategories";

const useStyles = makeStyles(() => ({
  activeTab: {
    color: "#2796f3 !important",
  },
}));

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const DrawerEventAppoinment = (props) => {
  const classes = useStyles();
  const { open, handleCloseOpen } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Drawer
      anchor={"right"}
      PaperProps={{
        elevation: 0,
        style: {
          width: IsSmallDevise ? "100%" : "600px",
        },
      }}
      open={open}
      onClose={handleCloseOpen}
    >
      <div>
        <Paper square>
          <Tabs
            value={value}
            centered
            TabIndicatorProps={{
              style: { background: "#2796f3", height: "2px" },
            }}
            onChange={handleChange}
          >
            <Tab
              className={value === 0 ? classes.activeTab : ""}
              label="Settings"
            />
          </Tabs>
        </Paper>
        <div>
          <ListAllCategories editItem={props?.editItem} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerEventAppoinment;
