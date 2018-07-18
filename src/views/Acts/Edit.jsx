import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from '@material-ui/icons/People';
import Delete from '@material-ui/icons/Delete';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'react-apollo';
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'


class Edit extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      acts: [],
      act: '',
      title: '',
      year: '',
      url: '',
     loading: false,
      userSubmited: false
    }
     };

  
   render() {
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <TextField
                name="act"
                 hintText="Act"
                 placeholder="ActNumber"
                 
                 floatingLabelFixed
               />
          </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="title"
                 hintText="title"
                 placeholder="Title"
                 
                 floatingLabelFixed
               />
         </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="year"
                 hintText="Year"
                 placeholder="Year"
                 
                  floatingLabelFixed
               />
         </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="url"
                 hintText="url"
                 placeholder="Url"
                 
                 floatingLabelFixed
               />
         </GridItem>
         <br />
         
         
    </GridContainer>
       <center style={{paddingTop:"30px"}}>
       <Button
          
          color="primary">
          Submit
            </Button>
            </center>

  </form>
  
    );
  }
}
export default Edit