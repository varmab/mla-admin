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

class DocumentsAndDeeds extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allDocumentCategories: PropTypes.array,
    }),
  }
  constructor(props) {
    super(props);
    this.state={
      documents:[],
      categoryName:'',
      id:'',
      
      
    }     
  }
 
   componentWillReceiveProps(newProps){
     console.log(JSON.stringify(newProps)+"DocumentCategory Data")
      var documents=newProps.documents.allDocumentCategories.map((DocumentCategory) => {
                                      return {
                                        id: DocumentCategory.id,
                                        categoryName: DocumentCategory.categoryName,
                                        
                                       
                                        actions: (
                                          

                                          <div className="col mt-5" key={DocumentCategory.id}>
                                <h6 className="title" style={{cursor:"pointer"}}onClick={this.gotoDocumentCategory.bind(this,DocumentCategory.id)}>Click</h6>
                            </div>
                                        )
                                      };
                                    })       
      this.setState({
        documents
      })    
   }
    
 gotoDocumentCategory(id){
        this.props.history.push('/Documents/' +id);
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
                data={this.state.documents}
                filterable               
                columns={[
                  {
                    Header: "ID",
                    accessor: "id"
                  },
                  {
                    Header: "CategoryName",
                    accessor: "categoryName"
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

const DOCUMENTCATEGORY_QUERY = gql`
  query allDocumentCategories {
    allDocumentCategories {
       
      id
      categoryName
      


    }
  }
`;

export default compose(graphql(DOCUMENTCATEGORY_QUERY,
{name:"documents"}))(DocumentsAndDeeds);

