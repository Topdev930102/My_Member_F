import React from 'react'
import TopNav from "./TopNav";
import SideMenu from "./sideMenu/SideMenu";
import PdfViewer from "./pdfViewer/PdfViewer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropProvider } from '../../../../../utility/context/DnD';
import { grey } from '@mui/material/colors';
export default function EditDoc() {
  return (
   <DragDropProvider>
     <DndProvider backend={HTML5Backend}>
      <div >
        <TopNav />
        <div className="row pt-1" style={{backgroundColor:grey[100]}}>
          <div className="col-lg-2 ">
            <SideMenu />
          </div>
          <div className="col-lg-10">
          
            <PdfViewer url="/test.pdf" />
          </div>
        </div>
      </div>
    </DndProvider>
   </DragDropProvider>
  )
}
