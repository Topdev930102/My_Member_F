import React, { useEffect, useState } from 'react'
import { Button, Input, Select } from 'antd';
import {
  FormLabel, FormGroup,
} from '@material-ui/core';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Selectitems = ({
  members,
  handlenext
}) => {
  const [invoicelist, setinvoicelist] = useState(
    [{
      itemname: '',
      qnty: '',
      price: '',
      amount: ''

    }]
  )
  const handleAddRow = () => {
    const data = [...invoicelist]
    data.push(
      {
        itemname: '',
        qnty: '',
        price: '',
        amount: ''
      }
    )
    setinvoicelist(data)
  }
  const handledecriment = (i) => {
    const data = [...invoicelist]
    data.splice(i, 1);
    setinvoicelist(data)
  }

  return (
    <div>
      <div>
        <div className='d-flex justify-content-end'>
          <Button onClick={handleAddRow}
          >
            Add items
          </Button>
        </div>
        <div className='shadow-sm p-1 bg-white rounded'>
          <Row className='m-1'>
            <Col lg="1" md="1" sm="1">
              <FormLabel>#</FormLabel>
            </Col>
            <Col lg="4" md="4" sm="4">
              <FormLabel>Item Name</FormLabel>
            </Col>
            <Col lg="1" md="1" sm="1">
              <FormLabel>Qty</FormLabel>
            </Col>
            <Col lg="2" md="2" sm="2">
              <FormLabel>Price</FormLabel>
            </Col>
            <Col lg="2" md="2" sm="2">
              <FormLabel>Amount</FormLabel>
            </Col>
            <Col lg="1" md="1" sm="1">
              <FormLabel>Remove</FormLabel>
            </Col>
          </Row>
          {invoicelist.map((item, i) => {
            return (
              <Row className='m-1'>
                <Col lg="1" md="1" sm="1">
                  {i + 1}
                </Col>
                <Col lg="4" md="4" sm="4">
                  <FormGroup>
                    <Input
                      className='inputstyle'
                      type='text'
                    />
                  </FormGroup>
                </Col>
                <Col lg="1" md="1" sm="1">
                  <FormGroup>
                    <Input
                      className='inputstyle'
                      type='text'
                    />
                  </FormGroup>

                </Col>
                <Col lg="2" md="2" sm="2">
                  <FormGroup>
                    <Input
                      className='inputstyle'
                      type='text'
                    />
                  </FormGroup>
                </Col>
                <Col lg="2" md="2" sm="2">
                  <FormGroup>
                    <Input
                      className='inputstyle'
                      type='text'
                    />
                  </FormGroup>
                </Col>
                <Col lg="1" md="1" sm="1">
                  <FormGroup>
                    <Button onClick={handledecriment} type="text">
                      <RemoveCircleIcon
                        style={{
                          color: '#FF0000'
                        }} />
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            )
          })
          }
        </div>
        <div className='m-1'>
          <Row>
            <Col lg="4" md="4" sm="1">
              <FormGroup>
                <FormLabel>Discount</FormLabel>
                <Select
                  style={{
                    widht: '200px'
                  }} />
              </FormGroup>
            </Col>
            <Col lg="4" md="4" sm="1">
              <FormGroup>
                <FormLabel>Sales Tax</FormLabel>
                <Select
                  style={{
                    widht: '200px'
                  }} />
              </FormGroup>
            </Col>
            <Col lg="4" md="4" sm="1">
              <FormGroup>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  style={{
                    widht: '200px'
                  }} />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <Button
          onClick={handlenext}
          className="primary"
        >Create</Button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    members: state.member.list_member,
  }
}
export default connect(mapStateToProps)(Selectitems)