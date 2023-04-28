import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import getStyles from "./../../../../../../../lib/styles-dnd";
import { yellow } from "@mui/material/colors";
import { DragDropContext } from "../../../../../../../utility/context/DnD";

export default function DeclineBoard({ item}) {
  const [state, setState] = useState(item);
  const { openProps, setOpenProps, board } = useContext(DragDropContext);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "dragable",
        item: { ...item,_type:"board" },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
      useEffect(() => {
        setState(
          board.find(
            (x) =>
              x.id === item.id && x.type === item.type && x._type === item._type
          )
        );
      }, [board]);
      const handleShowProps = () => {
        setOpenProps(true);
      };
  return (
    <div style={getStyles(item.left, item.top, isDragging)} id={item.id} ref={drag} onMouseUp={handleShowProps}>
    <div className=" border border-dark px-2 rounded " style={{backgroundColor:state.recipient.color,paddingBottom:"5px", paddingTop:"5px"}}>Decline</div>
  </div>
  )
}
