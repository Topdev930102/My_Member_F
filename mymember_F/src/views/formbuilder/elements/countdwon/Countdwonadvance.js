import React from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;
const selectAfter = (
  <Select className="select-after">
  </Select>
);
const Countdwonadvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    const selectedElement = editor.getSelected();
    return selectedElement.getChildAt(0);

  }

  const handleSizeChange = (value) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.size = value;
    getSelectedHtmlElement().setAttributes(attributes);
    const element = getSelectedHtmlElement();
    element.removeClass('size-large');
    element.removeClass('size-small');
    element.addClass('size-' + value);
  }

  const handleAlignChange = (value) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.align = value;
    getSelectedHtmlElement().setAttributes(attributes);
    getSelectedHtmlElement().addStyle({ 'justify-content': value});
  }

  const handleWeightChange = (value) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.weight = value;
    getSelectedHtmlElement().setAttributes(attributes);
    const element = getSelectedHtmlElement();
    if(value == 'bold') {
      element.addClass('label-bold');
    } else {
      element.removeClass('label-bold');
    }

  }

  return (
    <div id="countdwon">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Size</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handleSizeChange(e) }}
          defaultValue={getSelectedHtmlElement().getAttributes()["size"]}
          getPopupContainer={() => document.getElementById('countdwon')}>
          <Option value="medium">Medium</Option>
          <Option value="small">Small</Option>
          <Option value="large">Large</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Align</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handleAlignChange(e) }}
          defaultValue={getSelectedHtmlElement().getAttributes()["align"]}
          getPopupContainer={() => document.getElementById('countdwon')}>
          <Option value="left">Left</Option>
          <Option value="right">Right</Option>
          <Option value="center">Center</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Label Weight</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handleWeightChange(e) }}
          defaultValue={getSelectedHtmlElement().getAttributes()["weight"]}
          getPopupContainer={() => document.getElementById('countdwon')}>
          <Option value="normal">Normal</Option>
          <Option value="bold">Bold</Option>
        </Select>
      </div>
    </div>
  )
}

export default Countdwonadvance
