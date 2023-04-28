import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import getStyles from "../../../../../../../lib/styles-dnd";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DragDropContext } from "../../../../../../../utility/context/DnD";

export default function CheckboxBoard({ item }) {
  const [state, setState] = useState(item);
  const { openProps, setOpenProps, board } = useContext(DragDropContext);
  const [checkboxes, setCheckboxes] = useState([
    {
      checked:false,
      id:"0"
    },
  ]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "dragable",
    item: {  ...item,_type:"board"},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleAddCheckbox = () => {
    setCheckboxes([...checkboxes, { label: "",checked:false,id:checkboxes.length.toString() }]);
  };
  const handleOnChecked = (e)=>{
    
    //setCheckboxes({...checkboxes,[checkboxes[index]]:checkedItem})
    const nextCheckboxes = checkboxes.map((item)=>{
      if (item.id===e.target.id) {
        item.checked = e.target.checked;
        
      }
      return item;
    })
    
    setCheckboxes(nextCheckboxes);
  }
  const handleShowProps = () => {
    setOpenProps(true);
    console.log("function Called");
  };
  useEffect(() => {
    setState(
      board.find(
        (x) =>
          x.id === item.id && x.type === item.type && x._type === item._type
      )
    );
  }, [board]);
  return (
    <div ref={drag} style={getStyles(item.left, item.top, isDragging)} id={item.id}>
      <div style={{backgroundColor:item.color}}>
      {checkboxes.map((i) => (
        <>
        <FormControlLabel control={<Checkbox onChange={handleOnChecked} id={i.id} checked={i.checked} />} label={i.label} />
        <br/>
        </>
      ))}

      <IconButton color="primary" onClick={handleAddCheckbox}>
        <AddBoxIcon />
      </IconButton>
      </div>
    </div>
  );
}
