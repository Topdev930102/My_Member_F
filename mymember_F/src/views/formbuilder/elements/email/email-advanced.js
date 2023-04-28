import React, {useEffect} from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;


const EmailAdvanced = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };


  const handleFontWeightChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes.fontWeight = newVal;
    element.setAttributes(attributes);
    element.getChildAt(0).getChildAt(1).addStyle({ 'font-weight': newVal })
  }

  const handleTextAlignChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.textAlign = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'text-align': newVal })
  }

  const handleCornersChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.borderRadius = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'border-radius': newVal })
  }

  const handleSubmitEnterChange = (newVal) => {

  }

  const handleBackgroundColorChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.background = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'background': newVal })
  }

  const handleIconChange = (newVal) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.icon = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
  }

  const handleIconStyleChange = (newVal) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.iconStyle = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
  }

  const handleIconPositionChange = (newVal) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.iconPosition = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
  }

  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }
  })
  return (
    <div id="inputAdvance">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Checkbox style</Typography>
        </div>
        <Select className='inputstyle' onChange={handleFontWeightChange}
                defaultValue={getSelectedHtmlElement().getAttributes().fontWeight}
                getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="normal">Normal</Option>
          <Option value="bold">Bold</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Text Align</Typography>
        </div>
        <Select className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().textAlign}
                onChange={handleTextAlignChange}
                getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="left">Left</Option>
          <Option value="center">Center</Option>
          <Option value="right">Center</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Corners</Typography>
        </div>
        <Select className='inputstyle'
                onChange={handleCornersChange}
                defaultValue={getSelectedHtmlElement().getAttributes().borderRadius}
                getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="0px">Square Edges</Option>
          <Option value="5px">5px</Option>
          <Option value="10px">10px</Option>
          <Option value="20px">20px</Option>
          <Option value="120px">120px</Option>
        </Select>
      </div>

      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >BG Color</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes().background}
          className='inputstyle' onChange={handleBackgroundColorChange} getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="white">White</Option>
          <Option value="grey">Grey</Option>
          <Option value="black">Black</Option>
          <Option value="linear-gradient(to bottom, #fff 0%, #efefef 100%)">Light Gradient</Option>
          <Option value="linear-gradient(to bottom, #ebebeb 0%, #f6f6f6 9%, white 100%)">Medium Gradient</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Icon</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes().icon}
          className='inputstyle' onChange={handleIconChange} getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="none">No Icon</Option>
          <Option value="phone">Phone Icon</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Icon Style</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes().iconStyle}
          className='inputstyle' onChange={handleIconStyleChange} getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="black">Black</Option>
          <Option value="white">White</Option>
          <Option value="color">Color</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Icon Position</Typography>
        </div>
        <Select
          defaultValue={getSelectedHtmlElement().getAttributes().iconPosition}
          className='inputstyle' onChange={handleIconPositionChange} getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="right">Right</Option>
          <Option value="left">Left</Option>
        </Select>
      </div>
    </div>
  )
}

export default EmailAdvanced
