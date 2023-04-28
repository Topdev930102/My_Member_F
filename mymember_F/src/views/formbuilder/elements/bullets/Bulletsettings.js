import React, { useState } from 'react'
import { Select, Input, } from 'antd'
import { Typography, Slider } from '@mui/material';
import FontFamily from "../../configuration/fontfamily"

const { Option } = Select;

const Bulletsettings = ({ editor }) => {
  const [bulletspace, setbulletspace] = useState(0)

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e.target.value })
    if (name === "margin-top") {
      setbulletspace(e.target.value)
    }
  }
  const handlestyle2 = (e, name) => {
    let value = e.target.value;
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes[name] = value;
    getSelectedHtmlElement().setAttributes(attributes);
    let childModels = element.attributes.components.models;
    for (var i = 0; i < childModels.length; i++) {
      if(name == 'text-color') {
        childModels[i].addStyle({'color': value});
      } else  {
        let subChildModels = childModels[i].attributes.components.models;
        for (var j = 0; j < subChildModels.length; j++) {
          if(name == 'bold-color') {
            if(subChildModels[j].attributes.tagName == 'b') {
              subChildModels[j].addStyle({'color': value});
            }
          } else {
            if(subChildModels[j].attributes.tagName == 'i') {
              subChildModels[j].addStyle({'color': value});
            }
          }
        }
      }
    }
  }
  const handleaddoptionforULorOL = (e) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes.listType = e;
    getSelectedHtmlElement().setAttributes(attributes);
    if(e != 'order') {
      getSelectedHtmlElement().removeClass('order');
    } else {
      getSelectedHtmlElement().addClass('order');
    }

    let childModels = element.attributes.components.models;
    for (var i = 0; i < childModels.length; i++) {
      let subChildModels = childModels[i].attributes.components.models;
      for (var j = 0; j < subChildModels.length; j++) {
        if(subChildModels[j].attributes.tagName == 'i') {
          if(e == 'order') {
            subChildModels[j].setClass('fa fa-' + (i + 1));
          } else {
            subChildModels[j].setClass('fa fa-check');
          }
        }
      }
    }
  }

  const handleSpaceChange = (e) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes.space = e.target.value;
    getSelectedHtmlElement().setAttributes(attributes);
    setbulletspace(e.target.value)
    element.addStyle({'gap': e.target.value + 'px'})
  }

  const handlefontfamily = (event, newVal) => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes.fontFamily = newVal;
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'font-family': newVal})
  }
  return (
    <div id='bullets'>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          > List Type</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes().listType}
          getPopupContainer={() => document.getElementById('bullets')}
          onChange={(e) => { handleaddoptionforULorOL(e) }}>
          <Option value="order">Order List</Option>
          <Option value="icon">Icon List</Option>
        </Select>
      </div>
      <div className='sliderinputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '210px',
            color: '#828282'
          }}
        >
          <Typography
            className='mb-0'
          >Bullet Space</Typography>
        </div>
        <Slider
          size="small"
          valueLabelDisplay="auto"
          defaultValue={getSelectedHtmlElement().getAttributes().space}
          onChange={(e) => { handleSpaceChange(e) }} />
        <div className='countinputwrapper'
        >
          <Input className='countinput'
            defaultValue={getSelectedHtmlElement().getAttributes().space}
            onChange={(e) => { handleSpaceChange(e) }}
          />
        </div>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Font Family</Typography>
        </div>
        <Select
          className='inputstyle'
          defaultValue={getSelectedHtmlElement().getAttributes().fontFamily}
          getPopupContainer={() => document.getElementById('bullets')}
          onChange={handlefontfamily}>
          {FontFamily.families.map((item, i) => {
            return (
              <Option value={item} key={i}>{item}</Option>
            )
          })}
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'
          style={{
            width: '120px'
          }}
        >
          <Typography
            className='mr-2 mb-0'
          >Text Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          size="small"
          type="color"
          defaultValue={getSelectedHtmlElement().getAttributes()["text-color"]}
          onChange={(e) => { handlestyle2(e, 'text-color') }}
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
            className='mr-2 mb-0'
          >Bold Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          defaultValue={getSelectedHtmlElement().getAttributes()["bold-color"]}
          onChange={(e) => { handlestyle2(e, 'bold-color') }}
          size="small"
          type="color"
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
            className='mr-2 mb-0'
          >Icon Color</Typography>
        </div>
        <Input
          className='p-0'
          style={{
            width: 230,
            height: '40px'
          }}
          defaultValue={getSelectedHtmlElement().getAttributes()["icon-color"]}
          onChange={(e) => { handlestyle2(e, 'icon-color') }}
          size="small"
          type="color"
        />
      </div>
    </div>
  )
}

export default Bulletsettings
