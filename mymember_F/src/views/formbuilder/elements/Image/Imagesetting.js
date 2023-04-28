import { TextField, Button, Slider, Typography } from '@mui/material'
import { Select, Input } from 'antd'
import React, { useState } from 'react'
import Icon from "@ant-design/icons";
import Image from "../../../../assets/img/image.png"
const Option = { Select }
const Imagesetting = ({ editor }) => {


    const getSelectedHtmlElement = () => {
        return editor.getSelected().getChildAt(0);
    };

    const handleSrcChange = (event) => {
        const element = getSelectedHtmlElement();
        console.log(element);
        let attributes = element.getAttributes();
        attributes.src = event.target.value;
        element.setAttributes(attributes);
        element.src = event.target.value;
    }

    const handleAltChange = (event) => {
      const element = getSelectedHtmlElement();
      let attributes = element.getAttributes();
      attributes.alt = event.target.value;
      element.setAttributes(attributes);
      element.alt = event.target.value;
    }

    const handleSizeChange = (event, name) => {
      const element = getSelectedHtmlElement();
      let attributes = element.getAttributes();
      attributes[name] = event.target.value;
      element.setAttributes(attributes);
      element.addStyle({ [name]: event.target.value + 'px' })
    }

    const handleLinkChange = (value, name) => {
      const element = getSelectedHtmlElement();
      let attributes = element.getAttributes();
      attributes[name] = value;
      element.setAttributes(attributes);
    }


    return (
        <div id='image'>
            <div className='d-flex m-1' >
                <Typography
                    className='inputlablewarrper mb-0'>
                    Bg Image</Typography>
                <TextField
                    style={{
                        border: "1px solid #b8c2cc",
                        height: '40px'
                    }}
                    variant={"outlined"}
                    size="small"
                    type="text"
                    placeholder="Image URL"
                    defaultValue={getSelectedHtmlElement().getAttributes()["src"]}
                    onChange={(e) => { handleSrcChange(e) }}
                />
                <Button
                    className='bgsecondary'>
                    <Icon component={() => <img src={Image} />} />
                </Button>
            </div>

            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Alt Text</Typography>
                </div>
                <Input
                    className='inputstyle'
                    defaultValue={getSelectedHtmlElement().getAttributes()["alt"]}
                    onChange={(e) => { handleAltChange(e) }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Image Width</Typography>
                </div>
                <Input
                    className='inputstyle'
                    type="number"
                    defaultValue={getSelectedHtmlElement().getAttributes()["width"] ?? 200}
                    onChange={(e) => { handleSizeChange(e, "width") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Image Height</Typography>
                </div>
                <Input
                    className='inputstyle'
                    type="number"
                    defaultValue={getSelectedHtmlElement().getAttributes()["height"] ?? 200}
                    onChange={(e) => { handleSizeChange(e, "height") }}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Link URL</Typography>
                </div>
              <Select
                defaultValue={getSelectedHtmlElement().getAttributes()["link_url"]}
                onChange={(e) => { handleLinkChange(e, "link_url") }}
                className="inputstyle"
                getPopupContainer={() => document.getElementById('image')}>
                <Option value="open_popup">Open PopUp</Option>
                <Option value="submit_form">Submit Form</Option>
                <Option value="next_url">Next URL</Option>
                <Option value="close_popup">Close PopUp</Option>
                <Option value="yes_link">Yes Link</Option>
                <Option value="no_link">No Link</Option>
              </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Link URL Target</Typography>
                </div>
                <Select
                  defaultValue={getSelectedHtmlElement().getAttributes()["link_target"]}
                  onChange={(e) => { handleLinkChange(e, "link_target") }}
                  className="inputstyle"
                  getPopupContainer={() => document.getElementById('image')}>
                  <Option value="same">Normal</Option>
                  <Option value="other">New Tab/Window</Option>
                </Select>
            </div>
        </div>
    )
}

export default Imagesetting
