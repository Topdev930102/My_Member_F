import { Button, Slider, Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, {useEffect, useState} from 'react'
import FontFamily from "../../configuration/fontfamily"

const Option = { Select }

const EmailSettings = ({ editor, onChangeEvent }) => {
  const getCheckBoxHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(0).getChildAt(1);
  };

  const getNoticeHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(2);
  };

  const getFieldHtmlElement = () => {
    return editor.getSelected().getChildAt(0).getChildAt(1);
  };

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handleFontFamily = (e, name) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.fontFamily = e;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ [name]: e })
  }
  const handleCheckBoxColorChange = (e, name) => {
    const element = getCheckBoxHtmlElement();
    let attributes = element.getAttributes();
    attributes[name] = e.target.value;
    element.setAttributes(attributes);
    element.addStyle({ [name]: e.target.value })
  }

  const handleNoticeColorChange = (e, name) => {
    const element = getNoticeHtmlElement();
    let attributes = element.getAttributes();
    attributes[name] = e.target.value;
    element.setAttributes(attributes);
    element.addStyle({ [name]: e.target.value })
  }
  const handleCheckBoxFontSizeChange = (value, newVal) => {
    const element = getCheckBoxHtmlElement();
    let attributes = element.getAttributes();
    attributes.fontSize = newVal;
    element.setAttributes(attributes);
    element.addStyle({ 'font-size': newVal })
  }

  const handleFieldFontSizeChange = (value, newVal) => {
    const element = getFieldHtmlElement();
    let attributes = element.getAttributes();
    attributes.fontSize = newVal;
    element.setAttributes(attributes);
    element.addStyle({ 'font-size': newVal })
  }

  const handleNoticeFontSizeChange = (value, newVal) => {
    const element = getNoticeHtmlElement();
    let attributes = element.getAttributes();
    attributes.fontSize = newVal;
    element.setAttributes(attributes);
    element.addStyle({ 'font-size': newVal })
  }


  const handleCheckBoxTextChange = (e) => {
    const element = getCheckBoxHtmlElement();
    let attributes = element.getAttributes();
    attributes.text = e.target.value;
    element.setAttributes(attributes);
    element.components(e.target.value);
  }
  const handlePhoneFieldBoxTextChange = (e) => {
    const element = getFieldHtmlElement();
    let attributes = element.getAttributes();
    attributes.placeHolder = e.target.value;

    element.setAttributes(attributes);
    element.addAttributes({ 'placeholder': e.target.value });
  }

  const handleNoticeTextChange = (e) => {
    const element = getNoticeHtmlElement();
    let attributes = element.getAttributes();
    attributes.text = e.target.value;
    element.setAttributes(attributes);
    element.components(e.target.value);
  }

  useEffect(() => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if(!attributes) {
      attributes = {};
      getSelectedHtmlElement().setAttributes(attributes);
    }
    console.log(getSelectedHtmlElement());
    console.log(attributes);
  })
  return (
    <div id="button">

      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >SMS CHECKBOX</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getCheckBoxHtmlElement().getAttributes().text || "I Would Like to Receive an SMS Text Alert Before The Event Starts"}
          onChange={(e) => { handleCheckBoxTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >PHONE FIELD</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getFieldHtmlElement().getAttributes().placeHolder || "Enter Mobile Phone Here"}
          onChange={(e) => { handlePhoneFieldBoxTextChange(e) }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >SMS NOTICE</Typography>
        </div>
        <Input
          className='inputstyle'
          defaultValue={getNoticeHtmlElement().getAttributes().text || "(Optional but high recommended) Select Your Country Code and Enter Your Mobile phone ' +\n" +
          "                              'number to Receive a Text Alert Reminder 15 Minutes Before Webinar Starts"}
          onChange={(e) => { handleNoticeTextChange(e) }}
        />
      </div>

      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper m-b'
          >Font </Typography>
        </div>
        <Select
          showSearch
          className='inputstyle'
          placeholder="select font"
          defaultValue={getSelectedHtmlElement().getAttributes().fontFamily }
          onChange={(e) => { handleFontFamily(e, "font-family") }}
          getPopupContainer={() => document.getElementById('button')}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {FontFamily.families.map((item, i) => {
            return (
              <Option value={item} key={i}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
        >
          <Typography
            className='inputlablewarrper m-b'
          >INPUTS</Typography>
        </div>
        <Slider
          size="small"
          onChange={handleFieldFontSizeChange}
          defaultValue={getFieldHtmlElement().getAttributes().fontSize}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput p-0'
                 value={getFieldHtmlElement().getAttributes().fontSize}
                 onChange={handleFieldFontSizeChange}
          />
        </div>
      </div>

      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
        >
          <Typography
            className='inputlablewarrper m-b'
          >CHECKBOX TEXT</Typography>
        </div>
        <Slider
          size="small"
          onChange={handleCheckBoxFontSizeChange}
          defaultValue={getCheckBoxHtmlElement().getAttributes().fontSize}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput p-0'
                 value={getCheckBoxHtmlElement().getAttributes().fontSize}
                 onChange={handleCheckBoxFontSizeChange}
          />
        </div>
      </div>
      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
        >
          <Typography
            className='inputlablewarrper m-b'
          >NOTICE TEXT</Typography>
        </div>
        <Slider
          size="small"
          onChange={handleNoticeFontSizeChange}
          defaultValue={getNoticeHtmlElement().getAttributes().fontSize}
          valueLabelDisplay="auto" />
        <div className='countinputwrapper'
        >
          <Input className='countinput p-0'
                 value={getNoticeHtmlElement().getAttributes().fontSize}
                 onChange={handleNoticeFontSizeChange}
          />
        </div>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='inputlablewarrper m-b'
          >SMS CHECKBOX</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          defaultValue={getCheckBoxHtmlElement().getAttributes().color}
          onChange={(e) => { handleCheckBoxColorChange(e, "color") }}
        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='inputlablewarrper m-b'
          >SMS NOTICE</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          defaultValue={getNoticeHtmlElement().getAttributes().color}
          onChange={(e) => { handleNoticeColorChange(e, "color") }}
        />
      </div>
    </div>
  )
}

export default EmailSettings
