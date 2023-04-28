
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import {
  Drawer,
  Button,
} from '@mui/material'
import React from 'react'
import {
  Input,
  Checkbox,
} from 'antd';
import { FormGroup, Label } from 'reactstrap';
const { TextArea } = Input
const UpdateTermsandConditions = ({ open, setopen }) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={() => setopen(!open)}
        anchor="right"
        PaperProps={{
          elevation: 0,
          style: {
            width: "600px",
          },
        }}
      >
        <div className='m-1 p-1'>
          <div>
            <h1>Update Terms & Conditions</h1>
          </div>
          <div>
            <FormGroup className='mb-0 mt-1'>
              <Label>Customer Notes</Label>
              <TextArea
                maxLength={200}
                rows={2}
              />
            </FormGroup>
            <Checkbox>Use this in future for all invoices of all customers.
            </Checkbox>
            <FormGroup className='mb-0 mt-1'>
              <Label>Terms & Conditions</Label>
              <TextArea
                maxLength={200}
                rows={4}
              />

            </FormGroup>
            <Checkbox>Use this in future for all invoices of all customers.
            </Checkbox>
          </div>
          <div className='d-flex justify-content-end m-1'>
            <Button className='primary'>Save</Button>
            <Button
              onClick={() => setopen(!open)}
            >Cancel</Button>
          </div>
        </div>
      </Drawer>
    </>

  )
}

export default UpdateTermsandConditions