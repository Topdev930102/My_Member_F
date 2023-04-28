import { Button, Slider, Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, {useEffect, useState} from 'react'
import FontFamily from "../../configuration/fontfamily"

const Option = { Select }

const BillingSettings = ({ editor, onChangeEvent }) => {
  const getAddressHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(0).getChildAt(1);
  };

  const getCityHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(1).getChildAt(1);
  };

  const getCountryHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(2).getChildAt(1);
  };

  const getStateHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(3).getChildAt(0).getChildAt(1);
  };

  const getZipHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(3).getChildAt(1).getChildAt(1);
  };

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };


  const handleFontSizeChange = (value, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes.fontSize = newVal;
    element.setAttributes(attributes);
    element.addStyle({ 'font-size': newVal })
  }




  const handleAddressTextChange = (e) => {
    const element = getAddressHtmlElement();
    let attributes = element.getAttributes();
    attributes.placeHolder = e.target.value;
    element.setAttributes(attributes);
    element.components(e.target.value);
  }
  const handleCityTextChange = (e) => {
    const element = getCityHtmlElement();
    let attributes = element.getAttributes();
    attributes.placeHolder = e.target.value;
    element.setAttributes(attributes);
    element.components(e.target.value);
  }

  const handleStateTextChange = (e) => {
    const element = getStateHtmlElement();
    let attributes = element.getAttributes();
    attributes.placeHolder = e.target.value;
    element.setAttributes(attributes);
    element.components(e.target.value);
  }

  const handleZipTextChange = (e) => {
    const element = getZipHtmlElement();
    let attributes = element.getAttributes();
    attributes.placeHolder = e.target.value;
    element.setAttributes(attributes);
    element.components(e.target.value);
  }



  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }

  })
  return (
    <div id="button">

      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >Address Text</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getAddressHtmlElement().getAttributes().placeHolder || "Full Address..."}
          onChange={(e) => { handleAddressTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >City Text</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getCityHtmlElement().getAttributes().placeHolder || "City Name..."}
          onChange={(e) => { handleCityTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >State Text</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getStateHtmlElement().getAttributes().placeHolder || "State/Province..."}
          onChange={(e) => { handleStateTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >Zip Text</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getZipHtmlElement().getAttributes().placeHolder || "Zip Code..."}
          onChange={(e) => { handleZipTextChange(e) }}
        />
      </div>



      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
        >
          <Typography
            className='inputlablewarrper m-b'
          >Font Size</Typography>
        </div>
        <Slider
          size="small"
          onChange={handleFontSizeChange}
          defaultValue={getSelectedHtmlElement().getAttributes().fontSize}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput p-0'
                 value={getSelectedHtmlElement().getAttributes().fontSize}
                 onChange={handleFontSizeChange}
          />
        </div>
      </div>


    </div>
  )
}

export default BillingSettings
