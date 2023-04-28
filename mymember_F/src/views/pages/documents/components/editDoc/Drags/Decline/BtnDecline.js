import React, { useContext,useState,useEffect } from "react";
import { Button } from "@mui/material";

import { grey, yellow } from "@mui/material/colors";
import { useDrag } from "react-dnd";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { DragDropContext } from "../../../../../../../utility/context/DnD";

export default function BtnDecline() {
  const { recipients } = useContext(DragDropContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [id, setId] = useState(1);
  const [{ isDragging,isDropped }, drag] = useDrag(
    () => ({
      type: "dragable",
      item: {
        id: id,
        left: x,
        top: y,
        type: "decline",
        _type: "btn",
        color:recipients.filter((x) => x.active === true)[0]?.color,
        dataLabel:`Decline ${id}`,
        title:"Decline",
        icon:<CancelOutlinedIcon/>,
        recipient:recipients.filter((x) => x.active === true)[0],
        formatting:100,
        tooltip:"",
        required:true,
        readOnly:false
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        isDropped: !!monitor.didDrop(),
      }),
    }),
    [recipients, x, y, id]
  );
  useEffect(() => {
    if (isDropped) {
      setId(id + 1);
    }
  }, [isDropped]);
  return (
    <>
      <Button
        ref={drag}
        sx={{ color: grey[900] }}
        startIcon={
          <CancelOutlinedIcon
            sx={{
              border: `solid 1px ${grey[400]}`,
              padding: "2px",
              borderRadius: "2px",
              backgroundColor: isDragging
                ? yellow[200]
                : recipients.filter((x) => x.active === true)[0]?.color,
              color: isDragging ? grey[200] : grey[900],
            }}
          />
        }
      >
        Decline
      </Button>
    </>
  );
}
