import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import getStyles from "../../../../../../../lib/styles-dnd";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DragDropContext } from "../../../../../../../utility/context/DnD";
export default function RadioBoard({item }) {
  const [state, setState] = useState(item);
  const { openProps, setOpenProps, board } = useContext(DragDropContext);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: "", id: "0", value: "item0" },
    { label: "", id: "1", value: "item1" },
  ]);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "dragable",
    item: { ...item,_type:"board" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddRadio = () => {
    setItems([...items, { label: "",id:items.length.toString(),value:`item${items.length.toString()}` }]);
  };
  const handleShowProps = () => {
    setOpenProps(true);
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
    // <FormControlLabel control={<Radio  />} label={text}  />
    <div    onMouseUp={handleShowProps} id={item.id} ref={drag} style={getStyles(item.left, item.top, isDragging)}>
      <div style={{backgroundColor:state.recipient.color}}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={value}
          onChange={handleOnChange}
        >
          {items.map((i) => {
            return (
              <FormControlLabel
                value={i.value}
                control={<Radio />}
                label={i.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <br/>
      <IconButton color="primary" onClick={handleAddRadio}>
        <AddBoxIcon />
      </IconButton>
      </div>
    </div>
  );
}
