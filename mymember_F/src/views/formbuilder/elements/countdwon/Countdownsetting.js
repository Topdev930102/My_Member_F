import React, {useEffect} from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FontFamily from "../../configuration/fontfamily";

const { Option } = Select;

const selectAfter = (
    <Select className="select-after">
    </Select>
);
const Countdownsetting = ({ editor }) => {

    const getSelectedHtmlElement = () => {
        const selectedElement = editor.getSelected();
        return selectedElement.getChildAt(0);
    }
    const handlestyle = (event, name) => {
        const element = getSelectedHtmlElement();
        element.addStyle({ [name]: event.target.value })

    }
    const handleaddAttributes = (event, name) => {
        const element = getSelectedHtmlElement();
        element.setComponents({ [name]: event })
    }

    const handleEndDateChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.endDate = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }
    const handleEndTimeChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.endTime = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleTimeZoneChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.timeZone = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleTranslateChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.translate = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleExpireActionChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.expireAction = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }
    const handlefontfamily = (event, newVal) => {
      const element = getSelectedHtmlElement();
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.fontFamily = newVal;
      getSelectedHtmlElement().setAttributes(attributes);
      element.addStyle({ 'font-family': newVal})
    }

    const handleTitleColorChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.titleColor = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleLabelColorChange = (value) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes.labelColor = value;
      getSelectedHtmlElement().setAttributes(attributes);
    }

    const handleShowStatusChange = (name, status) => {
      let attributes = getSelectedHtmlElement().getAttributes();
      attributes["show-" + name] = status;
      getSelectedHtmlElement().setAttributes(attributes);
      const element = getSelectedHtmlElement();
      for(let i = 0; i < 7; i ++) {
        let child = element.getChildAt(i);
        let childAttribute = child.getAttributes();
        let type = childAttribute["type"]
        if(type == name.toUpperCase()) {
          childAttribute.hidden = !status;
          child.setAttributes(childAttribute);
        }
      }
    }

    useEffect(() => {
      let attributes = getSelectedHtmlElement().getAttributes();
      if(attributes["show-days"] == undefined) {
        attributes["show-days"] = true;
        attributes["show-minutes"] = true;
        attributes["show-seconds"] = true;
      }
      getSelectedHtmlElement().setAttributes(attributes);
    });
    return (
        <div id="countDownSetting">
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >End Date</Typography>
                </div>
                <Input
                    className='inputstyle'
                    defaultValue={getSelectedHtmlElement().getAttributes().endDate}
                    placeholder='Full Name'
                    type='date'
                    onChange={e => {handleEndTimeChange(e)}}
                />
            </div>
            <div className='inputwarrper'>
              <div
                className='inputlablewarrper'>
                <Typography
                  className='mb-0'
                >End Time</Typography>
              </div>
              <Select
                className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().endTime}
                getPopupContainer={() => document.getElementById('countDownSetting')}
                onChange={handleEndTimeChange}
              >
                <Option value={0}>12 AM</Option>
                {Array.apply(1, Array(12)).map(function (x, i) {
                  return <Option value={i} key={i}>{i} AM</Option>
                })}

                <Option value={12}>12 PM</Option>

                {Array.apply(1, Array(12)).map(function (x, i) {
                  return <Option value={i + 12} key={i}>{i} PM</Option>
                })}
              </Select>
            </div>
            <div className='inputwarrper'>
              <div
                className='inputlablewarrper'>
                <Typography
                  className='mb-0'
                >Time Zone</Typography>
              </div>
              <Select
                className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().timeZone}
                getPopupContainer={() => document.getElementById('countDownSetting')}
                onChange={handleTimeZoneChange}
              >
                <Option value="est">EST</Option>
                <Option value="pst">PST</Option>
                <Option value="cst">CST</Option>
                <Option value="mst">MST</Option>

              </Select>
            </div>
            <div className='inputwarrper'>
              <div
                className='inputlablewarrper'>
                <Typography
                  className='mb-0'
                >Translate</Typography>
              </div>
              <Select
                className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().translate}
                getPopupContainer={() => document.getElementById('countDownSetting')}
                onChange={handleTranslateChange}
              >
                <Option value="en">English</Option>
                <Option value="fr">French</Option>
                <Option value="es">Spanish</Option>
                <Option value="de">German</Option>
                <Option value="ru">Russian</Option>
                <Option value="jp">Japanese</Option>
                <Option value="cn">Chinese</Option>
                <Option value="ko">Korean</Option>
                <Option value="ar">Arabic</Option>
                <Option value="nl">Dutch</Option>
                <Option value="it">Italian</Option>
                <Option value="sv">Swedish</Option>


              </Select>
            </div>
            <div className='inputwarrper'>
              <div
                className='inputlablewarrper'>
                <Typography
                  className='mb-0'
                >EXPIRE ACTION</Typography>
              </div>
              <Select
                className='inputstyle'
                defaultValue={getSelectedHtmlElement().getAttributes().expireAction}
                getPopupContainer={() => document.getElementById('countDownSetting')}
                onChange={handleExpireActionChange}
              >
                <Option value="redirect">Redirect To URL</Option>
                <Option value="hide">Show & Hide Elements</Option>



              </Select>
            </div>

            <div className="bgsecondary d-flex align-items-center"
                style={{
                    height: "40px"
                }}>
                <Typography className='mb-0 p-1'>Customize Display</Typography>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Years</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-years"]}
                        onChange={e => {handleShowStatusChange('years', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Months</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-months"]}
                        onChange={e => {handleShowStatusChange('months', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Weeks</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-weeks"]}
                        onChange={e => {handleShowStatusChange('weeks', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Days</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-days"]}
                        onChange={e => {handleShowStatusChange('days', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Hours</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-hours"]}
                        onChange={e => {handleShowStatusChange('hours', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Minutes</Typography>
                </div>
                <div>
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-minutes"]}
                        onChange={e => {handleShowStatusChange('minutes', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Show Seconds</Typography>
                </div>
                <div>
                    <Checkbox

                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: '#828282' } }}
                        defaultChecked={getSelectedHtmlElement().getAttributes()["show-seconds"]}
                        onChange={e => {handleShowStatusChange('seconds', e.target.checked)}}
                        size='large' />
                </div>
            </div>
            <div className='inputwarrper mt-0'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Font Family</Typography>
                </div>
                <Select
                  className='inputstyle'
                  defaultValue={getSelectedHtmlElement().getAttributes().fontFamily}
                  getPopupContainer={() => document.getElementById('inputSetting')}
                  onChange={handlefontfamily}
                >
                  {FontFamily.families.map((item, i) => {
                    return (
                      <Option value={item} key={i}>{item}</Option>
                    )
                  })}
                </Select>
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Time Units Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    onChange={e => {handleTitleColorChange(e.target.value)}}
                    defaultValue={getSelectedHtmlElement().getAttributes().titleColor}
                />
            </div>
            <div className='inputwarrper'>
                <div
                    className='inputlablewarrper'>
                    <Typography
                        className='mb-0'
                    >Label Color</Typography>
                </div>
                <Input
                    className='p-0'
                    style={{
                        width: 240,
                        height: '40px'
                    }}
                    size="small"
                    type="color"
                    onChange={e => {handleLabelColorChange(e.target.value)}}
                    defaultValue={getSelectedHtmlElement().getAttributes().labelColor}
                />
            </div>
        </div >
    )
}

export default Countdownsetting
