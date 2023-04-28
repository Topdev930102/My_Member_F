import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateSmartlistedit from "./CreateSmartlistedit";
import CreatSmartList from "./components/creatsmartlistform/CreatSmartList";
export default function CreateSmartlistModal(props) {
  const [open, setOpen] = useState(true);
  const { userinformation, activeFolderdata } = props;
  const [smartList, setSmartList] = useState({
    ...props.item?.criteria,
  });
  const addToSmartList = (e, name, value) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      if (smartList[name] !== undefined) {
        setSmartList({
          ...smartList,
          [name]: [...smartList[name], value],
        });
      } else {
        setSmartList({
          ...smartList,
          [name]: [value],
        });
      }
    } else {
      removeToSmartList(name, value);
    }
  };

  const removeToSmartList = (name, value) => {
    setSmartList((prevSmartList) => {
      if (!prevSmartList[name]?.includes(value)) {
        return;
      }
      const newPrevSmartList = prevSmartList[name].slice();
      const itemIndex = newPrevSmartList.findIndex((item) => item === value);
      newPrevSmartList.splice(itemIndex, 1);
      return {
        ...prevSmartList,
        [name]: newPrevSmartList,
      };
    });
  };
  const isExit = (keyname, value) => {
    if (smartList[keyname]?.includes(value)) {
      return true;
    } else {
      return false;
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Smart List</DialogTitle>
        <DialogContent>
          <CreateSmartlistedit
            smartList={smartList}
            addToSmartList={addToSmartList}
            removeToSmartList={removeToSmartList}
            setSmartList={setSmartList}
            isExit={isExit}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: "#2796f3" }}
            variant="outlined"
          >
            Cancel
          </Button>
          <CreatSmartList
            smartList={smartList}
            item={props.item}
            setSmartList={setSmartList}
            isEdit={true}
            handleCloseformain={handleClose}
            userinformation={userinformation}
            activeFolderdata={activeFolderdata}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
