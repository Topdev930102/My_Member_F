import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChangeTemplate from './ChangeTemplate';
import UpdateTermsandConditions from "./UpdateTermsandConditions";
import { Button } from "antd";
import UpdatelogoAndadress from "./UpdatelogoAndadress";

const EditDelet = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openChangeTemplate, setopenChangeTemplate] = React.useState(false)
  const [opentermsandcontion, setopentermsandcontion] = React.useState(false)
  const [openupdateadress, setopenupdateadress] = React.useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        // icon={<DownOutlined />}
        onClick={handleClick}>
        Customize
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem
          onClick={() => { setopenChangeTemplate(!openChangeTemplate) }}
        >
          Change Template
        </MenuItem>
        <MenuItem
        >
          Edit Template
        </MenuItem>
        <MenuItem
          onClick={() => { setopenupdateadress(!openupdateadress) }}
        >
          Update logo and Address
        </MenuItem>
        <MenuItem
          onClick={() => { setopentermsandcontion(!opentermsandcontion) }}>
          Terms And conditions
        </MenuItem>
      </Menu>
      <ChangeTemplate
        setopenChangeTemplate={setopenChangeTemplate}
        openChangeTemplate={openChangeTemplate}
      />
      <UpdateTermsandConditions
        open={opentermsandcontion}
        setopen={setopentermsandcontion}
      />
      <UpdatelogoAndadress
        open={openupdateadress}
        setopen={setopenupdateadress}
      />
    </div>
  );
};
export default EditDelet;