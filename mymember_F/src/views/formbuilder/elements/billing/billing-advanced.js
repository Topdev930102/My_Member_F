import React, {useEffect} from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;


const BillingAdvanced = ({ editor }) => {
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

  const handleRequireChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.required = newVal;
    // let value = placeHolder;
    // if(attributes.required == true) {
    //   if(value[value.length - 1] != '*') {
    //     value = value + '*';
    //   }
    // } else {
    //   if(value[value.length - 1] == '*') {
    //     value = value.slice(0, value.length - 1);
    //   }
    // }
    //
    // attributes.placeHolder = value;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addAttributes({ 'required': newVal });
    // element.addAttributes({ 'placeholder': value });
    // setPlaceHolder(value);
  }

  const handleToggleExtraChange = (newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes.toggleExtra = newVal;
    element.setAttributes(attributes);
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
          >Required</Typography>
        </div>
        <Select className='inputstyle' onChange={handleRequireChange}
                defaultValue={getSelectedHtmlElement().getAttributes().required}
                getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="required">Required</Option>
          <Option value="not required">Not Required</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Toggle Extra</Typography>
        </div>
        <Select className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().toggleExtra}
                onChange={handleToggleExtraChange}
                getPopupContainer={() => document.getElementById('inputAdvance')}>
          <Option value="full">Show Full Address</Option>
          <Option value="only_country">Only Country</Option>
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

    </div>
  )
}

export default BillingAdvanced
