import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd';
import {
  DialogTitle, Dialog,
  DialogContent,
  FormLabel, FormGroup, Switch,
  DialogActions,
  Stepper, Step,
  StepLabel
} from '@material-ui/core';
import { Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import Htmleditor from './Htmleditor';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ADD_INVOICE } from '../../../../../redux/actions/mymoney';
import { connect, useDispatch } from 'react-redux';
import { LIST_ALL_MEMBERS } from '../../../../../redux/actions/newstudent';
import { CustomInput } from 'reactstrap';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';


const Createinovoice = ({
  members,
  handlenext
}) => {
  const [isaddittional, setisaddittional] = useState(false)
  const [state, setState] = useState({})
  const [Notes, setNotes] = React.useState(
    EditorState.createEmpty()
  );
  const [termsconditions, setermsconditions] = React.useState(
    EditorState.createEmpty()
  );

  const disptach = useDispatch()
  const handlestate = (e) => {
    const { name, value } = e.target
    setState({
      ...state, [name]: value
    })
  }
  const handlechnage = (e) => {
    const { name, value } = e.target
    setState({
      ...state, [name]: value
    })
  }

  useEffect(() => {
    disptach(LIST_ALL_MEMBERS())
  }, [])

  return (
    <div>
      <FormGroup className='m-1'>
        <FormGroup >
          <FormLabel className='mb-1'>Type</FormLabel>
          <CustomInput
            onChange={handlestate}
            value={state?.project}
            type='select'
            name="project"
            required
            style={{
              widht: '500px'
            }}
          >
            <option value="Active Student">Active Member</option>
            <option value="Active Trial">Active Trial</option>
            <option value="Leads">Leads</option>
            <option value="Former Student">Former Member</option>
            <option value="Former Trial">Former Trial</option>
          </CustomInput>
        </FormGroup>
      </FormGroup>
      <FormGroup className='m-1'>
        <FormLabel className='mb-1'>Client Name</FormLabel>
        <CustomInput
          type='select'
          className='inputstyle'
          name="clientId"
          onChange={handlestate}
          value={state?.clientId}
          required
        >
          {members?.data?.map((item) => {
            return (
              <option key={item?._id} value={item?._id}>{`${item?.firstName || "No Name"} ${item?.lastName || "No Name"}`}</option>
            )
          })}
        </CustomInput>
      </FormGroup>
      <div className='d-flex justify-content-between'>
        <FormGroup className='m-1'>
          <FormLabel className="mb-1">Upload Logo</FormLabel>
          <Input
            type='file'
            name="uoloadlogo"
            required
            onChange={handlechnage}
          />
        </FormGroup>
        <FormGroup className='m-1'>
          <FormLabel className="mb-1">Invoice Date*</FormLabel>
          <Input
            type="date"
            value={state?.invoice_date}
            onChange={handlechnage}
            name="invoice_date"
            required
          />
        </FormGroup>
        <FormGroup className='m-1'>
          <FormLabel className="mb-1">Due Date*</FormLabel>
          <Input
            type='date'
            name="due_date"
            value={state?.due_date}
            required
            onChange={handlechnage}
          />
        </FormGroup>
      </div>
      <div className='d-flex justify-content-between m-1'>
        <Typography className='align-items-center mb-1'>Additional Information</Typography>
        <div>
          <Switch onChange={() => { setisaddittional(!isaddittional) }} />
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-center border m-1'>
        <div className='d-flex'>
          <LoopIcon />
          <Typography
            className='mb-0'>Recurring Invoice Option are available after an invoice has been created</Typography>
        </div>
      </div>
      {
        isaddittional && <div>
          <FormGroup className='m-1'>
            <FormLabel className="mb-1">Tags</FormLabel>
            <Input
              name="tags"
              onChange={handlechnage}
              value={state?.tags}
            />
          </FormGroup>
          <FormGroup className='m-1'>
            <FormLabel className="mb-1">Notes</FormLabel>
            <Htmleditor
              data={Notes}
              handlechnageeditor={setNotes} />
          </FormGroup>
          <FormGroup>
            <FormLabel className="mb-1">Terms and conditions</FormLabel>
            <Htmleditor
              data={termsconditions}
              handlechnageeditor={setermsconditions} />
          </FormGroup>
        </div>
      }
      <div className='d-flex justify-content-end'>
        <Button
          onClick={handlenext}
          className="primary"
        >Next</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    members: state.member.list_member,
  }
}
export default connect(mapStateToProps)(Createinovoice)