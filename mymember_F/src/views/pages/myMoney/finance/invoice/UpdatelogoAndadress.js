
import {
  Button,
  Typography,
  Grid,
  Drawer,
} from '@mui/material'
import React, { useState } from 'react'
import {
  Input,
  Select,
} from 'antd';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const UpdatelogoAndadress = ({ open, setopen }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Drawer
        open={open}
        onClose={() => setopen(!open)}
        anchor="right"
        PaperProps={{
          elevation: 0,
          style: {
            width: "600px",
          },
        }}
      >
        <div className='m-1 p-1'>
          <div>
            <h1>Organization Address</h1>
          </div>
          <div>
            <Grid spacing={2} container>
              <Grid
                item lg="3" md="3"
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Grid>
              <Grid
                item lg="6" md="6"
              >
                <div className='d-flex align-items-center'>
                  <Typography className='d-flex align-items-center'>This logo will appear on transactions and email notifications.</Typography>
                </div>
              </Grid>
            </Grid>
            <div className='divider' />
            <div className='p-1'>
              <Grid container spacing={2}>
                <Grid
                  item lg="12" md="12"
                >
                  <Input className='m-1' placeholder="Street 1" />
                </Grid>
                <Grid
                  item lg="12" md="12"
                >
                  <Input className='m-1' placeholder="Street 2" />
                </Grid>
                <Grid
                  item lg="4" md="4"
                >
                  <Input className='m-1' placeholder="City" />
                </Grid>
                <Grid
                  item lg="4" md="4"
                >
                  <Select className='m-1' placeholder="Karnataka" />
                </Grid>
                <Grid
                  item lg="4" md="4"
                >
                  <Input className='m-1' placeholder="Zip/Postal Code" />
                </Grid>
                <Grid
                  item lg="4" md="4"
                >
                  <Input className='m-1' placeholder="Phone" />
                </Grid>
                <Grid
                  item lg="4" md="4"
                >
                  <Input className='m-1' placeholder="Fax" />
                </Grid>
                <Grid
                  item lg="4" md="4"
                >
                  <Input className='m-1' placeholder="Website" />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className='d-flex justify-content-end m-1'>
            <Button className='primary'>Save</Button>
            <Button
              onClick={() => setopen(!open)}
            >Cancel</Button>
          </div>
        </div>
      </Drawer>
    </>

  )
}

export default UpdatelogoAndadress