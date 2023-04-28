import { blue, orange, yellow } from '@mui/material/colors'
import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext } from '../../../../../../utility/context/DnD'

import StandardFields from './StandardFields'
import Users from './Users'
import Card from '@mui/material/Card';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ApprovalIcon from '@mui/icons-material/Approval';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {  IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import CustomFields from './CustomFields'
import PrefillTools from './PrefillTools'

export default function SideMenu() {
  const [menu,setmenu] = useState();
  
    const users = [
        {id:1,name:"Farnaz",active:false,color:yellow[600]},
        {id:2,name:"Jane",active:true,color:blue[600]},
        {id:3,name:"John",active:false,color:orange[400]}];
        const {setRecipients}=useContext(DragDropContext);
        useEffect(()=>{
          setRecipients(users)
        },[])
        const renderSideMenu=()=>{
          switch (menu) {
            case 1:
              return <StandardFields/>
            case 2:
              return <CustomFields/>
            case 3:
              return <PrefillTools/>
            default:
             return <StandardFields/>
          }
        }
  return (
    <div>
    <Users />
    <div className='row  mx-0'>
      <div className='col-lg-2 mx-0 px-0'>
      <Card sx={{backgroundColor: grey[300], minHeight:"100vh"}} className="mx-0 text-center " style={{borderRadius:"0px"}} >
      <IconButton size='small' sx={{color:grey[900]}} onClick={()=>setmenu(1)}>
      <BorderColorIcon fontSize='inherit'/>
      </IconButton>
      <hr className='my-0 py-0'/>
      <IconButton sx={{color:grey[900]}} size='small' onClick={()=>setmenu(2)}>
        <ApprovalIcon fontSize='inherit'/>
      </IconButton>
      <hr className='my-0 py-0'/>
      <IconButton sx={{color:grey[900]}} size='small' onClick={()=>setmenu(3)}>
        <CalendarTodayIcon fontSize='inherit'/>
      </IconButton>
    </Card>
      </div>
      <div className='col-lg-10 mx-0 px-0'>
      {renderSideMenu()}
      </div>
    </div>
  </div>
  )
}
