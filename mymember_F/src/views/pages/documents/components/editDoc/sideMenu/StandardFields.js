import { Card } from '@mui/material'

import BtnSignature from '../Drags/Signiture/BtnSigniture';
import BtnInitial from '../Drags/Initial/BtnInitial';
import BtnStamp from '../Drags/Stamp/BtnStamp';
import BtnSignDate from '../Drags/SignDate/BtnSignDate';
import BtnName from '../Drags/Name/BtnName';
import BtnEmail from '../Drags/Email/BtnEmail';
import BtnCompany from '../Drags/Company/BtnCompany';
import BtnTitle from '../Drags/Title/BtnTitle';
import BtnText from '../Drags/Text/BtnText';
import BtnCheckbox from '../Drags/Checkbox/BtnCheckbox';
import BtnRadio from '../Drags/Radio/BtnRadio';
import BtnDropDown from '../Drags/DropDown/BtnDropDown';
import BtnDrawing from '../Drags/Drawing/BtnDrawing';
import BtnFormula from '../Drags/Formula/BtnFormula';
import BtnAttachment from '../Drags/Attachment/BtnAttachment';
import BtnNote from '../Drags/Note/BtnNote';
import BtnApprove from '../Drags/Approve/BtnApprove';
import BtnDecline from '../Drags/Decline/BtnDecline';
export default function SecondMenu() {

  return (
    <Card style={{borderRadius:"none"}}>
    <div className='card-body'>
    <h4>Standard Fields</h4>
    <BtnSignature />
    <br/>
    <BtnInitial />
    <br/>
    <BtnStamp/>
    <br/>
    <BtnSignDate/>
    <hr className='my-0 py-0'/>
    <BtnName/>
    <br/>
    <BtnEmail/>
    <br/>
    <BtnCompany/>
    <br/>
    <BtnTitle/>
    <hr className='my-0 py-0'/>
    <BtnText/>
    <br/>
    <BtnCheckbox/>
    <br/>
    <BtnDropDown/>
    <br/>
    <BtnRadio/>
    <hr className='my-0 py-0'/>
    <BtnDrawing/>
    <br/>
    <BtnFormula/>
    <br/>
   <BtnAttachment/>
    <br/>
   <BtnNote/>
    <br/>
    <BtnApprove/>
    <br/>
  <BtnDecline/>
    </div>
    
  </Card>
  )
}
