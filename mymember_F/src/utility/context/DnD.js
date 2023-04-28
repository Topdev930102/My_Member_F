import React, { createContext, useState } from "react";

export const DragDropContext = createContext(null);

export const DragDropProvider = (props) => {
const [board,setBoard] = useState([]);
const [boardAll,setBoardAll] = useState([]);
const [openProps,setOpenProps] = useState(false);
const[recipients,setRecipients] =useState([]);
const[selectedItem,setSelectedItem] =useState({});
  return (
    <DragDropContext.Provider value={{board,setBoard,setRecipients,recipients,openProps,setOpenProps,boardAll,setBoardAll ,selectedItem,setSelectedItem}}>
      {props.children}
    </DragDropContext.Provider>
  );
};
