import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from '@material-ui/icons/People';
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


class AddDocumentsAndDeeds extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allDocumentCategories: PropTypes.array,
      createDocumentCategory: PropTypes.func,
      updateDocumentCategory: PropTypes.func,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      documents: [],
      categoryName: '',
      loading: false,
      userSubmited: false
    }
this.onUpdatecategoryName = this.onUpdatecategoryName.bind(this);
   };

  componentWillReceiveProps(newProps) {
    console.log(JSON.stringify(newProps) + "documents")
    this.setState({
      documents: newProps.data.allDocumentCategories,
      loading: true
    })
  };

  
  onUpdatecategoryName(e){
      this.setState({ categoryName: e.target.value })
  };
  
  createDocumentCategory() {
    this.props.createDocumentCategory({
      variables:
        {
          categoryName: this.state.categoryName,
        }

    })
      .then((user) => {
        alert(JSON.stringify(user) + "DocumentCategory")
        this.setState({
          userSubmited: true,
        })
      })
  };

  render() {
    return (
      <form>
        <GridContainer>
          
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="categoryName"
                 hintText="categoryName"
                 placeholder="Category Name"
                 value={this.state.categoryName}
                 onChange={this.onUpdatecategoryName.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
       <br />
         
         
         
    </GridContainer>
       <center style={{paddingTop:"30px"}}>
       <Button
          onClick={this.createDocumentCategory.bind(this)}
          color="primary">
          Submit
            </Button>
            </center>

  </form>
  
    );
  }
}
const DOCUMENTCATEGORY_QUERY = gql`
  query {
    allDocumentCategories {
    	  id
       categoryName
    }
  }
`;
const ADD_DOCUMENTCATEGORY = gql`
    mutation allDocumentCategories( $categoryName:String!){
         createDocumentCategory(categoryName:$categoryName){
                                             categoryName 
                                            
                                        }
                        } `
export default compose(
  graphql(DOCUMENTCATEGORY_QUERY),
  graphql(ADD_DOCUMENTCATEGORY, { name: 'createDocumentCategory' })
)(AddDocumentsAndDeeds);