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
class GalleryDetails extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allGalleryItems: PropTypes.array,
      allGalleries:PropTypes.array
    }),
  }
  constructor(props) {
    super(props);
    this.state={
      galleries:[],
      id:'',
      image:'',
      loading:false
    }     
  }
  componentWillReceiveProps(newProps){
  let galleryId = this.props.match.params.id
   console.log(JSON.stringify(newProps)+ "gallery")
     console.log(JSON.stringify(newProps)+"GalleryItems ")         
      this.setState({
      galleries:newProps.allGalleryitems.allGalleryItems,
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
                data={this.state.galleries}
                filterable               
                columns={[
                  {
                    Header: "ID",
                    accessor: "id"
                  },
                  
                  {
                    Header: "Image",
                    accessor: "image"
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

const GALLERYDETAILS_QUERY = gql`
query allGalleryItems($id:ID){
    allGalleryItems(filter:{gallery:{id:$id}}) {
        id
        image
    },
    allGalleries (filter:{id:$id}){
      id
      image
      title
  }
}
`;
export default  withRouter(compose(graphql(GALLERYDETAILS_QUERY ,{
  name:'allGalleryitems',
  options:(ownProps)=>({
    variables: {
      id:ownProps.match.params.id
    }
  }) 
})) (GalleryDetails));