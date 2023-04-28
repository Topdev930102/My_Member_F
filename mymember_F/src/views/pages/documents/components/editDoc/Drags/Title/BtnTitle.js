import React, { useContext ,useState,useEffect} from "react";
import { Button } from "@mui/material";

import { grey, yellow } from "@mui/material/colors";
import { useDrag } from "react-dnd";
import WorkIcon from "@mui/icons-material/Work";
import { DragDropContext } from "../../../../../../../utility/context/DnD";


export default function BtnTitle() {
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
        
        type: "title",
        _type: "btn",
        color: recipients.filter((x) => x.active === true)[0]?.color,
        dataLabel:`Title ${id}`,
        title:"Title",
        icon:<WorkIcon/>,
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
          <WorkIcon
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
        Title
      </Button>
    </>
  );
}
