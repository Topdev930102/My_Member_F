import React, { useState, useEffect, useCallback, useContext } from "react";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import { DragDropContext } from "../../../../../../utility/context/DnD";
import PropertiesMenu from "./../Drags/PropertiesMenu";
import SignBoard from "./../Drags/Signiture/SignBoard";
import { useDrop } from "react-dnd";
import TextBoard from "./../Drags/Text/TextBoard";
import StampBoard from "./../Drags/Stamp/StampBoard";
import SignDateBoard from "./../Drags/SignDate/SignDateBoard";
import NameBoard from "./../Drags/Name/NameBoard";
import EmailBoard from "./../Drags/Email/EmailBoard";
import CompanyBoard from "./../Drags/Company/CompanyBoard";
import TitleBoard from "./../Drags/Title/TitleBoard";
import InitialBoard from "./../Drags/Initial/InitialBoard";
import CheckboxBoard from "./../Drags/Checkbox/CheckboxBoard";
import RadioBoard from "./../Drags/Radio/RadioBoard";
import DropDownBoard from "./../Drags/DropDown/DropDownBoard";
import DrawingBoard from "./../Drags/Drawing/DrawingBoard";
import FormulaBoard from "./../Drags/Formula/FormulaBoard";
import AttachmentBoard from "./../Drags/Attachment/AttachmentBoard";
import NoteBoard from "./../Drags/Note/NoteBoard";
import ApproveBoard from "./../Drags/Approve/ApproveBoard";
import DeclineBoard from "./../Drags/Decline/DeclineBoard";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

export default function PdfViewer({ url }) {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [indexUndoRedo, setIndexUndoRedo] = useState(1);
  const [isChanged, setIsChanged] = useState(false);
  const [zoom, setZoom] = useState(1000);
  const [dropWidth, setDropWidth] = useState("100%");
  const [dropHeight, setDropHeight] = useState("100%");
  const {
    board,
    setBoard,
    openProps,
    setOpenProps,
    boardAll,
    setBoardAll,
    selectedItem,
  } = useContext(DragDropContext);
  const [itemProps, setItemProps] = useState({});
  const renderPage = useCallback(
    (pageNum, pdfRef, zoom) => {
      if (pdfRef != null && pageNum > 0) {
        let scale = zoom;
        pdfRef.getPage(pageNum).then(function (page) {
          //This gives us the page's dimensions at full scale
          if (scale === 1000) {
            scale = 1;
          }
          const viewport = page.getViewport({ scale: scale });

          var canvas = document.getElementById("mainCanvas");
          if (typeof canvas != "undefined" && canvas != null) {
            //exists
            //c.id = "mainCanvas";

            canvas.style.position = "absolute";
            setDropHeight(`${viewport.height}px`);
            setDropWidth(`${viewport.width}px`);
            if (zoom === 1000) {
              canvas.remove();
              canvas = document.createElement("canvas");
              canvas.id = "mainCanvas";
              setDropHeight("100%");
              setDropWidth("100%");
            }
          } else {
            //create a canvas for each page to draw it on
            canvas = document.createElement("canvas");
            canvas.id = "mainCanvas";
            setDropHeight(`${viewport.height}px`);
            setDropWidth(`${viewport.width}px`);
          }
          canvas.style.display = "block";
          let context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          //Draw it on the canvas
          page.render({ canvasContext: context, viewport: viewport });

          //Add it to the web page
          document
            .getElementById("pdfShow")
            .insertBefore(canvas, document.getElementById("dropDiv"));

          console.log(pageCnt);
        });
      }
    },
    [pdfRef]
  );

  const renderPages = useCallback(
    (pdfRef) => {
      if (pdfRef != null && pageCnt > 0) {
        for (let index = 1; index <= pageCnt; index++) {
          pdfRef.getPage(index).then(function (page) {
            //This gives us the page's dimensions at full scale
            const viewport = page.getViewport({ scale: 0.2 });

            //create a canvas for each page to draw it on
            var btn = document.createElement("button");
            btn.className = "btn btn-outline-secondary w-100 d-block my-2";

            var p = document.createElement("p");
            p.innerHTML = index;
            var canvas = document.createElement("canvas");
            canvas.style.display = "block";
            var context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            //Draw it on the canvas
            page.render({ canvasContext: context, viewport: viewport });

            //Add it to the web page
            btn.appendChild(p);
            btn.appendChild(canvas);
            btn.onclick = () => console.log("clicked");
            document.getElementById("parent").appendChild(btn);
            console.log(pageCnt);
          });
        }
      }
    },
    [pageCnt]
  );

  useEffect(() => {
    
  }, [board]);
  useEffect(() => {
    if (pdfRef != null) {
      renderPage(currentPage, pdfRef, zoom);
    }
  }, [currentPage, pdfRef, renderPage, zoom]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
        setPageCnt(loadedPdf.numPages);
      },
      function (reason) {
        console.error(reason);
      }
    );
  }, [url]);

  useEffect(() => {
    if (pdfRef != null && pageCnt > 0) {
      renderPages(pdfRef);
    }
  }, [renderPages]);
  //---------------------drop

  //drop
  const [isOver, drop] = useDrop(
    () => ({
      accept: "dragable",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        item.left = Math.round(item.left + delta.x);
        item.top = Math.round(item.top + delta.y);
        if (item.top < 0) {
          item.top = 0;
        }
        if (item.left < 0) {
          item.left = 0;
        }

        if (item._type === "btn") {
          setBoard((board) => [...board, item]);
        } else if (item._type === "board") {
          setBoard((board) =>
            board.map((b) => {
              if (b.id === item.id && b.type === item.type) {
                b = item;
              }
              return b;
            })
          );
        }
        setItemProps(item);
        setBoardAll((boardAll) => [...boardAll, item]);
        setIsChanged(true);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    
    if (isOver.isOver===false && itemProps & Object.keys(itemProps).length != 0) {
      setOpenProps(true);
      
    }
  }, [isOver]);

  //button functions
  const OnClickUndo = () => {
    console.log("index", indexUndoRedo);
    var index = indexUndoRedo;
    if (isChanged) {
      index = 1;
    }
    console.log("undo index", index);
    if (board.length > 0 && boardAll.length - index - 1 >= 0) {
      //if boardAll.last === any of b
      //find boardAll.last item in b
      //change board item with board all prev item
      var undo = boardAll[boardAll.length - index - 1];
      var last = boardAll[boardAll.length - index];
      setBoard((board) =>
        board.map((x) => {
          // if(last.id===undo.id && last.type===undo.type){

          // }
          // else{
          //   if(x.id===undo.id && x.type===undo.type){
          //     x = boardAll[boardAll.length - indexUndoRedo - 2]
          //   }
          // }
          if (x.id === last.id && x.type === last.type) {
            console.log("x==last");
            x = undo;
          }
          return x;
        })
      );

      setIndexUndoRedo(index + 1);
      setIsChanged(false);
      //bAll.pop();
      //setBoardAll(bAll);
    } else if (board.length > 0 && boardAll.length - index - 1 < 0) {
      setBoard(() => []);
      setIndexUndoRedo(1);
      setIsChanged(false);
    }
  };
  const OnClickRedo = () => {
    console.log("index", indexUndoRedo);
    var index = indexUndoRedo;
    if (isChanged) {
      index = 1;
    }
    console.log("redo index", index);
    if (boardAll.length - index + 1 >= 0) {
      //if boardAll.last === any of b
      //find boardAll.last item in b
      //change board item with board all prev item
      var redo = boardAll[boardAll.length - index + 1];
      var last = boardAll[boardAll.length - index];
      setBoard((board) =>
        board.map((x) => {
          // if(last.id===undo.id && last.type===undo.type){

          // }
          // else{
          //   if(x.id===undo.id && x.type===undo.type){
          //     x = boardAll[boardAll.length - indexUndoRedo - 2]
          //   }
          // }
          if (x.id === last.id && x.type === last.type) {
            console.log("x==last");
            x = redo;
          }
          return x;
        })
      );

      setIndexUndoRedo(index + 1);
      setIsChanged(false);
    }
  };
  const onCopy = () => {
    selectedItem.x = selectedItem.x + 20;
    selectedItem.y = selectedItem.y + 20;
    selectedItem._type = "board";
    selectedItem.id++;
    selectedItem.dataLabel = `${selectedItem.dataLabel}_copy`;

    setItemProps(selectedItem);
    setBoardAll((boardAll) => [...boardAll, selectedItem]);
    setIsChanged(true);
    setBoard((board) => [...board, selectedItem]);
  };
  const handleChangeZoom = (e) => {
    setZoom(e.target.value);
  };

  useEffect(()=>{
    if(board){
      setBoard((board)=>board.map((i)=>{
        if(zoom === 1000){
          return i;
        }
        else{
          i.x = i.x * zoom;
          i.y = i.y*zoom;
          return i;
        }
      }))
    }
  },[zoom])
  return (
    <>
      <div className="row">
        <div className="col-lg-10">
          <div className="d-flex justify-content-center">
            <IconButton
              size="small"
              sx={{ color: grey[900] }}
              onClick={OnClickUndo}
            >
              <UndoIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: grey[900] }}
              onClick={OnClickRedo}
            >
              <RedoIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" sx={{ color: grey[900] }} onClick={onCopy}>
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
            <div>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={zoom}
                  onChange={handleChangeZoom}
                >
                  <MenuItem value={0.25} className="d-block px-2">
                    25 %
                  </MenuItem>
                  <MenuItem value={0.5} className="d-block px-2">
                    50 %
                  </MenuItem>
                  <MenuItem value={0.75} className="d-block px-2">
                    75 %
                  </MenuItem>
                  <MenuItem value={1.0} className="d-block px-2">
                    100 %
                  </MenuItem>
                  <MenuItem value={1.25} className="d-block px-2">
                    125 %
                  </MenuItem>
                  <MenuItem value={1.5} className="d-block px-2">
                    150 %
                  </MenuItem>
                  <MenuItem value={2.0} className="d-block px-2">
                    200 %
                  </MenuItem>
                  <MenuItem value={4.0} className="d-block px-2">
                    400 %
                  </MenuItem>
                  <MenuItem value={1000} className="d-block px-2">
                    Fit to window
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <IconButton size="small" sx={{ color: grey[900] }}>
              <MarkChatUnreadOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>
          {/* viewer */}
          <div className="card" id="pdfShow">
            {/* <Drop/> */}
            <div
              className="Board border-primary mx-0"
              style={{
                position: "absolute",
                display: "block",
                width: `${dropWidth}`,
                height: `${dropHeight}`,
              }}
              ref={drop}
              id="dropDiv"
            >
              {board.length > 0 &&
                board.map((item, idx) => {
                  switch (item?.type) {
                    case "sign":
                      return <SignBoard key={idx} item={item} />;
                    case "initial":
                      return <InitialBoard key={idx} item={item} />;
                    case "stamp":
                      return <StampBoard key={idx} item={item} />;
                    case "signDate":
                      return <SignDateBoard key={idx} item={item} />;
                    case "name":
                      return <NameBoard key={idx} item={item} />;
                    case "email":
                      return <EmailBoard key={idx} item={item} />;
                    case "company":
                      return <CompanyBoard key={idx} item={item} />;
                    case "title":
                      return <TitleBoard key={idx} item={item} />;
                    case "text":
                      return <TextBoard key={idx} item={item} />;

                    case "checkbox":
                      return <CheckboxBoard key={idx} item={item} />;
                    case "radio":
                      return <RadioBoard key={idx} item={item} />;
                    case "dropdown":
                      return <DropDownBoard key={idx} item={item} />;
                    case "drawing":
                      return <DrawingBoard key={idx} item={item} />;
                    case "formula":
                      return <FormulaBoard key={idx} item={item} />;
                    case "attachment":
                      return <AttachmentBoard key={idx} item={item} />;
                    case "note":
                      return <NoteBoard key={idx} item={item} />;
                    case "approve":
                      return <ApproveBoard key={idx} item={item} />;
                    case "decline":
                      return <DeclineBoard key={idx} item={item} />;

                    default:
                      return <></>;
                  }
                })}
            </div>
          </div>
        </div>
        <div className="col-lg-2 mt-3">
          <PropertiesMenu open={openProps} item={itemProps} />

          <div id="parent"></div>
        </div>
      </div>
    </>
  );
}
