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

import { dataTable } from "variables/general.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';
class Documents extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allDocuments: PropTypes.array,
      allDocumentCategories:PropTypes.array
    }),
  }
  constructor(props) {
    super(props);
    this.state={
      documents:[],
      docName:'',
      docNumber:'',
      s3Url:'',
      loading:false
    }     
  }
  componentWillReceiveProps(newProps){
  let documentCategoryId = this.props.match.params.id
   console.log(JSON.stringify(newProps)+ "document")
      this.setState({
      documents:newProps.allDocuments.allDocuments,
      loading : true
    })    
   }
 
  render() {
    const { classes } = this.props;
    return (
        <div>
        
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>            
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.documents}
                filterable               
                columns={[
                  {
                    Header: "Doc Name",
                    accessor: "docName"
                  },
                  
                  {
                    Header: "Doc Number",
                    accessor: "docNumber"
                  },
                  {
                    Header: "s3 Url",
                    accessor: "s3Url"
                  },
                  
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

const DOCUMENTS_QUERY = gql`
query allDocuments($id:ID){
    allDocuments(filter:{documentCategory:{id:$id}}) {
        docName
        docNumber
        s3Url
    },
    allDocumentCategories (filter:{id:$id}){
      id
      
  }
}
`;
export default  withRouter(compose(graphql(DOCUMENTS_QUERY ,{
  name:'allDocuments',
  options:(ownProps)=>({
    variables: {
      id:ownProps.match.params.id
    }
  }) 
})) (Documents));