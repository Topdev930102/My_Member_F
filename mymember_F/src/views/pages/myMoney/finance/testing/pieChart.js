import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap"
import Chart from "react-apexcharts"
import NewCategoryModal from "./CategoryManagement"

class Productorders extends React.Component {
  state = {
    options: {
      chart: {
        dropShadow: {
          enabled: false,
          blur: 5,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [this.props.primary, this.props.warning, this.props.danger],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: [
            this.props.primaryLight,
            this.props.warningLight,
            this.props.dangerLight
          ]
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      stroke: {
        width: 5
      },
      labels: ["Rent", "Payroll", "Others"]
    },
    series: [690, 258, 149]
  }
  render() {
    return (
      <Card>
        <CardHeader className="pd-add cd-h3">
          <CardTitle style={{color:"white"}}>Expenses By Category</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            height={290}          />
        </CardBody>
        <ListGroup flush>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-primary"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px"
                }}
              />
              <span className="text-bold-600">Rent</span>
            </div>
            <div className="product-result">
              <span>690</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-warning"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px"
                }}
              />
              <span className="text-bold-600">Payroll</span>
            </div>
            <div className="product-result">
              <span>258</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-danger"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px"
                }}
              />
              <span className="text-bold-600">Others</span>
            </div>
            <div className="product-result">
              <span>149</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
                <NewCategoryModal/>
          </ListGroupItem>
          
        </ListGroup>
      </Card>
    )
  }
}
export default Productorders
