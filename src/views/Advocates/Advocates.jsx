import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Model from "./Model";
import { dataTable } from "variables/general.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'react-apollo';

class Advocates extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allAdvocateDatas: PropTypes.array,
    }),
  }
  constructor(props) {
    super(props);
    this.state={
      advocates:[],
      email:'',
      enrollmentNumber:'',
      homeAddress:'',
      name:'', 
      officeAddress:'',
      phone:'',
      actions: (
        // we've added some custom button actions
        <div className="actions-right">
          {/* use this button to add a edit kind of action */}
          <Button
            justIcon
            round
            simple
            color="warning"
            className="edit"
          >
            <Dvr />
          </Button>{" "}
          {/* use this button to remove the data row */}
          <Button
            justIcon
            round
            simple
            color="danger"
            className="remove"
          >
            <Close />
          </Button>{" "}
          
        </div>
      )
    }     
  }
  componentWillReceiveProps(newProps){
     console.log(JSON.stringify(newProps)+"Json Data")         
      this.setState({
      advocates:newProps.advocates.allAdvocateDatas
    })    
   }
 
  render() {
    const { classes } = this.props;
    return (
        <div>
        <Model/>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>            
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.advocates}
                filterable               
                columns={[
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "Enrollment Number",
                    accessor: "enrollmentNumber"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "HomeAddress",
                    accessor: "homeAddress"
                  },
                  {
                    Header: "OfficeAddress",
                    accessor: "officeAddress"
                  },
                  {
                    Header: "Phone",
                    accessor: "phone"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    
                    sortable: false,
                    filterable: false
                  }

                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"


              />
              
            </CardBody>

          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}

const ADVOCATES_QUERY = gql`
  query allAdvocateDatas {
    allAdvocateDatas {
      name 
      enrollmentNumber
      email
      homeAddress
      officeAddress
      phone
    }
  }
`;

export default compose(graphql(ADVOCATES_QUERY,
{name:"advocates"}))(Advocates);

