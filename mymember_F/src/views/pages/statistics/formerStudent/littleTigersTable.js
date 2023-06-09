import React from "react"
import {  Card, CardBody} from "reactstrap"
import DataTable from "react-data-table-component"
import "../../../../assets/scss/pages/users.scss"
const columns = [
  {
    name: "Little Tigers",
    selector: "first_name",
    sortable: true
  },
  {
    name: "Total",
    selector: "id",
    sortable: true
  }
]

const data = [
  {
    id: 1,
    first_name: "Alyss",
    last_name: "Lillecrop",
    email: "alillecrop0@twitpic.com",
    gender: "Female"
  },
  {
    id: 2,
    first_name: "Shep",
    last_name: "Pentlow",
    email: "spentlow1@home.pl",
    gender: "Male"
  },
  {
    id: 3,
    first_name: "Gasper",
    last_name: "Morley",
    email: "gmorley2@chronoengine.com",
    gender: "Male"
  },
  {
    id: 4,
    first_name: "Phaedra",
    last_name: "Jerrard",
    email: "pjerrard3@blogs.com",
    gender: "Female"
  },
  {
    id: 5,
    first_name: "Conn",
    last_name: "Plose",
    email: "cplose4@geocities.com",
    gender: "Male"
  },
  {
    id: 6,
    first_name: "Tootsie",
    last_name: "Brandsma",
    email: "tbrandsma5@theatlantic.com",
    gender: "Female"
  },
  {
    id: 7,
    first_name: "Sibley",
    last_name: "Bum",
    email: "sbum6@sourceforge.net",
    gender: "Female"
  },
  {
    id: 8,
    first_name: "Kristoffer",
    last_name: "Thew",
    email: "kthew7@amazon.com",
    gender: "Male"
  },
  {
    id: 9,
    first_name: "Fay",
    last_name: "Hasard",
    email: "fhasard8@java.com",
    gender: "Female"
  },
  {
    id: 10,
    first_name: "Tabby",
    last_name: "Abercrombie",
    email: "tabercrombie9@statcounter.com",
    gender: "Female"
  }
]
const customStyles = {
 
  headCells: {
    style: {
      background:"#1387b0",
      color:"#fff"
    },
  }
};
class DataTableFixedHeader extends React.Component {
  render() {
    return (
      <Card>
        <CardBody className="cd-body-rm pd-body">
          <DataTable
            data={data}
            columns={columns}
            noHeader
            fixedHeader
            fixedHeaderScrollHeight="300px"
            customStyles={customStyles}
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableFixedHeader

 


