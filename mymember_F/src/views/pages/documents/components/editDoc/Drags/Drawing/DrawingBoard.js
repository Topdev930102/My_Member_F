import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import getStyles from "./../../../../../../../lib/styles-dnd";
import GestureIcon from "@mui/icons-material/Gesture";
import { DragDropContext } from "../../../../../../../utility/context/DnD";
export default function DrawingBoard({ item }) {
  const [state, setState] = useState(item);
  const { openProps, setOpenProps, board } = useContext(DragDropContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "dragable",
    item: { ...item, _type: "board" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
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
    <div
      className="border border-dark"
      style={getStyles(item.left, item.top, isDragging)}
      id={item.id}
      ref={drag}
      onMouseUp={handleShowProps}
    >
      <div
        style={{
          width: "150px",
          height: "70px",
          backgroundColor: state.recipient.color,
        }}
      >
        <GestureIcon /> Drawing
      </div>
    </div>
  );
}
