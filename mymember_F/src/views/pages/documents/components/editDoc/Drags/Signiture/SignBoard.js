import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import DownloadIcon from "@mui/icons-material/Download";
import getStyles from "./../../../../../../../lib/styles-dnd";
import { DragDropContext } from "../../../../../../../utility/context/DnD";

export default function SignBoard({ item }) {
  const [state, setState] = useState(item);
  const { setOpenProps, board,setSelectedItem } = useContext(DragDropContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "dragable",
    item: { ...item, _type: "board" },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleShowProps = () => {
    setOpenProps(true);
    setSelectedItem({...item,_type:"board"})
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
    <div
      className="border border-dark "
      onMouseUp={handleShowProps}
      style={getStyles(item.left, item.top, isDragging)}
      id={item.id}
      ref={drag}
    >
      <div
        className="text-center"
        style={{
          width: "70px",
          height: "50px",
          backgroundColor: state.recipient.color,
        }}
      >
        <p className="text-center my-0">Sign</p>
        <DownloadIcon />
      </div>
    </div>
  );
}
