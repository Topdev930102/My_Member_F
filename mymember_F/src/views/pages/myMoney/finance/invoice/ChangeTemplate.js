
import { DialogTitle } from '@material-ui/core';
import {
  MenuItem,
  Drawer,
} from '@mui/material'
import React from 'react'

const ChangeTemplate = ({openChangeTemplate,setopenChangeTemplate}) => {
  return (
    <>
     <Drawer
        anchor={"right"}
        open={openChangeTemplate}
        PaperProps={{
          elevation: 0,
          style: {
            width:"600px",
          },
        }}
        onClose={()=>setopenChangeTemplate(!openChangeTemplate)}
      >
        <div>
          <Template/>
        </div>
      </Drawer>
    </>

  )
}

export default ChangeTemplate