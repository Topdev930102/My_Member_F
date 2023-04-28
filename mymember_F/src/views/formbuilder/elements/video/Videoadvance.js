import React from 'react'
import { Select } from 'antd'
import { Typography } from '@mui/material';
const { Option } = Select
const paddingArray = [0, 5, 10, 15, 20, 25, 50];

const Videoadvance = ({ editor }) => {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ [name]: e })
    let attributes = element.getAttributes();
    attributes[name] = e;
    element.setAttributes(attributes);
  }
  return (
    <div id="video">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Width</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => { handlestyle(e, "width") }}
          defaultValue={getSelectedHtmlElement().getAttributes()["width"]}
          getPopupContainer={() => document.getElementById('video')}>
          <Option value="100%">Full width</Option>
          <Option value="75%">3/4 Width</Option>
          <Option value="50%">Half width</Option>

        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Sticky on Scroll</Typography>
        </div>
        <Select
          className='inputstyle'
          getPopupContainer={() => document.getElementById('video')}>
          <Option value="on">on</Option>
          <Option value="of">Off</Option>
        </Select>
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Padding</Typography>
        </div>
        <Select
          className="inputstyle"
          onChange={(e) => { handlestyle(e, "padding") }}
          defaultValue={getSelectedHtmlElement().getAttributes()["padding"]}
          getPopupContainer={() => document.getElementById('video')}>
          {paddingArray?.map((padding) => {
            return (
              <Option value={padding + 'px'} key={padding}>
                {padding} px
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  )
}

export default Videoadvance
