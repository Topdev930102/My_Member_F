import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
} from "reactstrap";
import { ContextLayout } from "../../../../utility/context/Layout";
import { GET_ACTIVE_STUDENT } from "../../../../redux/actions/newstudent/index";
import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { ChevronDown } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";

class UsersLists extends React.Component {
  state = {
    rowData: null,
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    loading: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "",
        field: "",
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: "Photo",
        field: "memberprofileImage",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() =>
                history.push({
                  pathname: "/student-info",
                  state: {
                    userId: params.data.userId,
                    studentId: params.data._id,
                    data: params.data,
                  },
                })
              }
            >
              <img
                className="rounded-circle mr-50"
                src={params.value}
                alt="user avatar"
                height="50"
                width="50"
              />
              {/* <span>{params.data.name}</span> */}
            </div>
          );
        },
      },
      {
        headerName: "Full Name",
        field: "firstName",
        filter: true,
        width: 140,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{params.data.firstName}</span>
              <span>{params.data.lastName}</span>
            </div>
          );
        },
      },
      {
        headerName: "Candidate",
        field: "primaryPhone",
        filter: true,
        width: 170,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <Input type="select" size="sm">
                <option>Program1</option>
                <option>Program2</option>
              </Input>
            </div>
          );
        },
      },
      {
        headerName: "Candidate Status",
        field: "category",
        filter: true,
        width: 190,
        cellRendererFramework: (params) => {
          return params.value === "program3" ? (
            <div className="badge badge-pill badge-light-orange">Program3</div>
          ) : params.value === "Program 4" ? (
            <div className="badge badge-pill badge-light-grey">Program 4</div>
          ) : (
            <div className="badge badge-pill badge-light-light"></div>
          );
        },
      },
      {
        headerName: "Expiry Date",
        field: "createdAt",
        filter: true,
        width: 150,
      },

      {
        headerName: "Manage",
        field: "transactions",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Button className="badge badge-pill badge-light-danger">
                Remove
              </Button>
            </div>
          );
        },
      },
    ],
    getRowHeight: function (params) {
      return 70;
    },
  };

  componentDidMount() {
    this.props.GET_ACTIVE_STUDENT();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active_student !== this.props.active_student) {
      this.setState({
        rowData: this.props.active_student,
        loading: false,
      });
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column);
    var modelObj = null;
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val,
      };
    }
    filter.setModel(modelObj);
    this.gridApi.onFilterChanged();
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        pageSize: val,
      });
    }
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    this.setState({
      searchVal: val,
    });
  };

  refreshCard = () => {
    this.setState({ reload: true });
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All",
      });
    }, 500);
  };

  toggleCollapse = () => {
    this.setState((state) => ({ collapse: !state.collapse }));
  };
  onEntered = () => {
    this.setState({ status: "Opened" });
  };
  onEntering = () => {
    this.setState({ status: "Opening..." });
  };

  onEntered = () => {
    this.setState({ status: "Opened" });
  };
  onExiting = () => {
    this.setState({ status: "Closing..." });
  };
  onExited = () => {
    this.setState({ status: "Closed" });
  };
  removeCard = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          {/* <Breadcrumbs
            breadCrumbTitle="Active Student"
            breadCrumbParent="Home"
            breadCrumbActive="Active Student"
          /> */}
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} of 150
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="filter-actions d-flex">
                    <Input
                      className="w-70 mr-1 mb-1 mb-sm-0"
                      type="text"
                      placeholder="search..."
                      onChange={(e) => this.updateSearchQuery(e.target.value)}
                      value={this.state.searchVal}
                    />
                  </div>
                </div>
                {!this.state.loading ? (
                  <>
                    {this.state.rowData !== null ? (
                      <ContextLayout.Consumer>
                        {(context) => (
                          <AgGridReact
                            gridOptions={{}}
                            rowSelection="multiple"
                            defaultColDef={defaultColDef}
                            columnDefs={columnDefs}
                            rowData={rowData}
                            onGridReady={this.onGridReady}
                            colResizeDefault={"shift"}
                            animateRows={true}
                            floatingFilter={true}
                            pagination={true}
                            pivotPanelShow="always"
                            paginationPageSize={pageSize}
                            resizable={true}
                            getRowHeight={this.state.getRowHeight}
                            enableRtl={context.state.direction === "rtl"}
                          />
                        )}
                      </ContextLayout.Consumer>
                    ) : null}
                  </>
                ) : (
                  <div id="loading-bar">
                    <Spinner loading={true} />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    active_student: state.student.active_student,
  };
};

export default connect(mapStateToProps, { GET_ACTIVE_STUDENT })(UsersLists);
