import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import getStyles from "./../../../../../../../lib/styles-dnd";
import { DragDropContext } from "../../../../../../../utility/context/DnD";

export default function SignDateBoard({ item }) {
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
      style={getStyles(item.left, item.top, isDragging)}
      id={item.id}
      ref={drag}
      onMouseUp={handleShowProps}
    >
      <p
        className="text-center border border-dark px-1"
        style={{ backgroundColor: state.recipient.color }}
      >
        Date Signed
      </p>
    </div>
  );
}
