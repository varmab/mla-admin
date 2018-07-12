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


class AddGallery extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allGalleries: PropTypes.array,
      createGallery: PropTypes.func,
      updateGallery: PropTypes.func,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      galleries: [],
      image: '',
      title: '',
      loading: false,
      userSubmited: false
    }

    
    this.onUpdateTitle = this.onUpdateTitle.bind(this);
    this.onUpdateImage = this.onUpdateImage.bind(this);


  };

  componentWillReceiveProps(newProps) {
    console.log(JSON.stringify(newProps) + "galleriesData")
    this.setState({
      galleries: newProps.data.allGalleries,
      loading: true
    })
  };

  
  onUpdateTitle(e){
      this.setState({ title: e.target.value })
  };
  onUpdateImage(e){
      this.setState({ image:  e.target.value  })
  };
  

  createGallery() {
    this.props.createGallery({
      variables:
        {
          
          title: this.state.title,
          
          image: this.state.image,

        }

    })
      .then((user) => {
        alert(JSON.stringify(user) + "Gallery")
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
                 name="title"
                 hintText="title"
                 placeholder="Title"
                 value={this.state.title}
                 onChange={this.onUpdateTitle.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
       <br />
         
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="image"
                 hintText="image"
                 placeholder="Image"
                 value={this.state.image}
                 onChange={this.onUpdateImage.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
         <br />
         
    </GridContainer>
       <center style={{paddingTop:"30px"}}>
       <Button
          onClick={this.createGallery.bind(this)}
          color="primary">
          Submit
            </Button>
            </center>

  </form>
  
    );
  }
}
const GALLERIES_QUERY = gql`
  query {
    allGalleries {
    	  id
        title  
        image
       
    }
  }
`;
const ADD_GALLERIES = gql`
    mutation createGallery( $title:String!,$image:String!){
         createGallery(title:$title,image:$image){
                                            
                                            title     
                                            image
                                            
                                        }
                        } `
export default compose(
  graphql(GALLERIES_QUERY),
  graphql(ADD_GALLERIES, { name: 'createGallery' })
)(AddGallery);