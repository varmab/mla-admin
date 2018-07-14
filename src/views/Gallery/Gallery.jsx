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

class Gallery extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allGalleries: PropTypes.array,
    }),
  }
  constructor(props) {
    super(props);
    this.state={
      galleries:[],
      title:'',
      id:'',
      image:'',
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
     console.log(JSON.stringify(newProps)+"Gallery Data")
      var galleries=newProps.galleries.allGalleries.map((gallery) => {
                                      return {
                                        id: gallery.id,
                                        title: gallery.title,
                                        image: gallery.image,
                                       
                                        actions: (
                                          <div >
                                            
                                            <Button
                                              justIcon
                                              round
                                              simple
                                              style={{color:"black"}}
                                            >
                                              Click 
                                            </Button>
                                          </div>
                                        )
                                      };
                                    })       
      this.setState({
        galleries
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
                data={this.state.galleries}
                filterable               
                columns={[
                  {
                    Header: "ID",
                    accessor: "id"
                  },
                  {
                    Header: "Title",
                    accessor: "title"
                  },
                  {
                    Header: "Image",
                    accessor: "image"
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

const GALLERIES_QUERY = gql`
  query allGalleries {
    allGalleries {
      title 
      id
      image
      


    }
  }
`;

export default compose(graphql(GALLERIES_QUERY,
{name:"galleries"}))(Gallery);

