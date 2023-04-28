import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import getStyles from "./../../../../../../../lib/styles-dnd";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import { DragDropContext } from "../../../../../../../utility/context/DnD";
export default function AttachmentBoard({ item}) {
  const [state, setState] = useState(item);
  const { openProps, setOpenProps, board } = useContext(DragDropContext);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "dragable",
        item: { ...item,_type:"board" },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
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
    <div className="border border-dark"  style={getStyles(item.left,item.top,isDragging)} id={item.id} ref={drag}>
    <div className="text-center" style={{width:"70px", height:"50px", backgroundColor:item.recipient.color}}>
      
      <DownloadIcon/><br/>
      <AttachFileIcon/>
    </div>
  </div>
  )
}
