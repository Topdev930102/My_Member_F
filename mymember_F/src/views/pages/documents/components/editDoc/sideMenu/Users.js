import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { DragDropContext } from "../../../../../../utility/context/DnD";

export default function Users({item}) {
  const initVal={id:0,name:"",active:true,color:''}
  const { recipients, setRecipients,board,setBoard } = useContext(DragDropContext);
  const [value, setValue] = useState(
    initVal
  );
  const handleOnchange = (e) => {
    console.log("item",item);
    console.log("e",e.target.value)
    if (item) {

      
      const next = board.map((x) => {
        if (x.id===item.id && x.type===item.type && x._type===item._type) {
          x.recipient = e.target.value;
          console.log("x",x)
        } 
        return x;
      });
      setBoard(next);
      setValue(e.target.value)
    }
    else{
      const next = recipients.map((x) => {
        if (x === e.target.value) {
          x.active = true;
        } else {
          x.active = false;
        }
        return x;
      });
      //setValue(e.target.value);
      setRecipients(next);
    }
    
  };
  
  useEffect(()=>{
    if (item) {
      setValue(item.recipient)
    }
    else{
      setValue(recipients.find((x) => x.active === true));
      console.log("recipient", recipients);
    }
  },[recipients])
  return (
    <div>
      <FormControl fullWidth  >
        
        <Select  value={value} onChange={handleOnchange} variant="outlined" className="border" size="small" sx={{ m: 0,p:0 }} >
          {recipients && recipients.map((item) => (
            <MenuItem value={item} key={item.id} className="w-100" >
            <FiberManualRecordIcon sx={{ color: item.color }} />
             {"  "} {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
    </div>
  );
}
