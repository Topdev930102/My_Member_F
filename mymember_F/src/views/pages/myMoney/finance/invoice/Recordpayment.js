import {
  DialogActions, Dialog,
  FormControlLabel,
  Checkbox,
  DialogContent,
  FormGroup, FormLabel, DialogTitle, Drawer
} from '@material-ui/core'
import { UploadFileOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { Button, Input, Select, Tooltip, Typography, Upload, } from 'antd'
import React, { useState } from 'react'
const { TextArea } = Input

const Recordpayment = () => {
  const [open, setopen] = useState(false)
  return (
    <div>
      <Tooltip title="Recocord Payment">
        <Button
          onClick={() => { setopen(!open) }}
        >Recocord Payment</Button>
      </Tooltip>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          elevation: 0,
          style: {
            width: "600px",
          },
        }}
        onClose={() => { setopen(!open) }}
      >
        <div style={{
          width: '600px',
          padding: '1em',
          margin:'1em'
        }}>
          <div className='m-1'>
            <div>
              <h3>Payment for INV-000001</h3>
            </div></div>
          <div className='m-1 shadow-sm mb-1 bg-body rounded p-1'>
            <Grid spacing={2} container>
              <Grid item lg="6" md="6">
                <FormGroup>
                  <FormLabel>Amount Received (INR)</FormLabel>
                  <Input />
                </FormGroup>
              </Grid>
              <Grid item lg="6" md="6">
                <FormGroup>
                  <FormLabel>Bank Charges (if any)</FormLabel>
                  <Input />
                </FormGroup>
              </Grid>
            </Grid>
            <div className='m-1 shadow-none rounded"'>
              <Grid spacing={2} container>
                <Grid item lg="6" md="6">
                  <FormLabel>Customer Name</FormLabel>
                </Grid>
                <Grid item lg="6" md="6">
                  <FormGroup>
                    <Input />
                  </FormGroup>
                </Grid>
                <Grid item lg="6" md="6">
                  <FormLabel>Customer Name</FormLabel>
                </Grid>
                <Grid item lg="6" md="6">
                  <FormGroup>
                    <Input />
                  </FormGroup>
                </Grid>
              </Grid>
              <div className='divider' />
              <div className='d-flex justify-content-between align-items-center'>
                <Typography>
                  Tax deducted?
                </Typography>
                <FormControlLabel
                  label="No Tax deducted"
                  control={
                    <Checkbox
                    />
                  }
                />
                <FormControlLabel
                  label="Yes, TDS (Income Tax)"
                  control={
                    <Checkbox
                    />
                  }
                />
              </div>
            </div>
            <Grid spacing={2} container>
              <Grid item lg="6" md="6">
                <FormGroup>
                  <FormLabel>Payment Date</FormLabel>
                  <Input />
                </FormGroup>
              </Grid>
              <Grid item lg="6" md="6">
                <FormGroup>
                  <FormLabel>Payment Mode</FormLabel>
                  <Select>
                    <Select.Option> Cash</Select.Option>
                    <Select.Option> Check</Select.Option>
                    <Select.Option>Cridit Card</Select.Option>
                    <Select.Option>Bank Transfer</Select.Option>
                  </Select>
                </FormGroup>
              </Grid>
              <Grid item lg="12" md="12">
                <FormGroup>
                  <FormLabel>Reference#</FormLabel>
                  <Input />
                </FormGroup>
              </Grid>
              <Grid item lg="12" md="12">
                <FormGroup>
                  <FormLabel>Notes</FormLabel>
                  <TextArea
                    rows={4} />
                </FormGroup>
              </Grid>
              <Grid item lg="12" md="12">
                <FormGroup>
                  <FormLabel>Attach File(s)</FormLabel>
                  <Upload >
                    <Button icon={<UploadFileOutlined />}>Click to Upload</Button>
                  </Upload>
                </FormGroup>
              </Grid>
            </Grid>
          </div>
          <div>
            <div className='d-flex justify-content-end m-1'>
              <Button
                className='m-1 primary'>Recocord Payment</Button>
              <Button
                onClose={() => { setopen(!open) }}
                className='m-1'>Cancel</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Recordpayment