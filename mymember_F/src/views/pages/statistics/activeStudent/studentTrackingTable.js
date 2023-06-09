import React from "react"
import {
  Card,
  CardBody,
 DropdownItem,UncontrolledButtonDropdown,DropdownToggle,DropdownMenu
} from "reactstrap"
import DataTable from "react-data-table-component"
import {  ChevronDown} from "react-feather"
import "../../../../assets/scss/pages/users.scss"

// const CustomHeader = props => {
//   return (
//     <div className="d-flex flex-wrap justify-content-between">
//       <div className="add-new">
//         <Button.Ripple color="primary">Add New</Button.Ripple>
//       </div>
//       <div className="position-relative has-icon-left mb-1">
        
        
//       </div>
//     </div>
//   )
// }

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Type",
        selector: "name",
        sortable: true,
        minWidth: "50px",
        maxWidth: "50px",
        // cell: row => (
        //   <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
        //     <div className="user-img ml-xl-0 ml-2">
        //       <img
        //         className="img-fluid rounded-circle"
        //         height="36"
        //         width="36"
        //         src={row.image}
        //         alt={row.name}
        //       />
        //     </div>
        //     <div className="user-info text-truncate ml-xl-50 ml-0">
        //       <span
        //         title={row.name}
        //         className="d-block text-bold-500 text-truncate mb-0">
        //         {row.name}
        //       </span>
        //       <small title={row.email}>{row.email}</small>
        //     </div>
        //   </div>
        // )
      },
      {
        name: "Dec",
        selector: "Dec",
        sortable: true,
        minWidth: "50px",
        maxWidth: "50px",
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
        )
      },
      {
        name: "2019",
        selector: "id",
        sortable: true,
        minWidth: "40px",
        maxWidth: "40px",
       
      },
      {
        name: "2020",
        selector: "id",
        sortable: true,
        minWidth: "40px",
        maxWidth: "40px",
        
      }
    ],
    data: [
      {
        id:1,
        name: "Alyss Lillecrop",
        email: "alillecrop0@twitpic.com",
        date: "May 13, 2018",
        status: "active",
        revenue: "$32,000",
        ratings: "good"
      },
      {
        id:2,
        name: "Shep Pentlow",
        email: "spentlow1@home.pl",
        date: "June 5, 2019",
        status: "active",
        revenue: "$50,000",
        ratings: "good"
      },
      {
       
        name: "Gasper Morley",
        email: "gmorley2@chronoengine.com",
        date: "December 24, 2019",
        status: "active",
        revenue: "$78,000",
        ratings: "average"
      },
      {
        name: "Phaedra Jerrard",
        email: "pjerrard3@blogs.com",
        date: "November 30, 2018",
        status: "inactive",
        revenue: "$10,000",
        ratings: "bad"
      },
      
    ],
    filteredData: [],
    value: ""
  }

 

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Card>
        <CardBody className="rdt_Wrapper pd-body">
        <div className="ag-theme-material">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                  </div>
                  <h6 className="th-fixd">Student Tracking</h6>
                    <div className="dropdown actions-dropdown">
                      <UncontrolledButtonDropdown>
                        <DropdownToggle className="px-2 py-75" color="white">
                          Month
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag="a">
                          
                            <span className="align-middle ml-50">January</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            
                            <span className="align-middle ml-50">Febuary</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                           
                            <span className="align-middle ml-50">March</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            
                            <span className="align-middle ml-50">April</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                      <UncontrolledButtonDropdown>
                        <DropdownToggle className="px-2 py-75" color="white">
                          Year
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag="a">
                          
                            <span className="align-middle ml-50">2020</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            
                            <span className="align-middle ml-50">2019</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                           
                            <span className="align-middle ml-50">2018</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            
                            <span className="align-middle ml-50">2017</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                  </div>
                </div>
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            
            // pagination
            
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableCustom
