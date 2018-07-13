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


class AddContact extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allContacts: PropTypes.array,
      createContact: PropTypes.func,
      updateContact: PropTypes.func,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      Contacts: [],
      address: '',
      phone: '',
      loading: false,
      userSubmited: false
    }

    this.onUpdateAddress = this.onUpdateAddress.bind(this);
    this.onUpdatePhone = this.onUpdatePhone.bind(this);
  };

  componentWillReceiveProps(newProps) {
    console.log(JSON.stringify(newProps) + "contactData")
    this.setState({
      contacts: newProps.data.allContacts,
      loading: true
    })
  };

  onUpdateAddress(e) {
    this.setState({ address: e.target.value })
  };
  onUpdatePhone(e){
      this.setState({ phone: e.target.value })
  };
 

  createContact() {
    this.props.createContact({
      variables:
        {
          address: this.state.address,
          phone: this.state.phone,

        }
    })
      .then((user) => {
        alert(JSON.stringify(user) + "contacts")
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
                name="address"
                 hintText="Address"
                 placeholder="Address"
                 value={this.state.address}
                 onChange={this.onUpdateAddress.bind(this)}
                 floatingLabelFixed
               />
          </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="phone"
                 hintText="phone"
                 placeholder="Phone"
                 value={this.state.phone}
                 onChange={this.onUpdatePhone.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
       <br />
         
         
    </GridContainer>
       <center style={{paddingTop:"30px"}}>
       <Button
          onClick={this.createContact.bind(this)}
          color="primary">
          Submit
            </Button>
            </center>

  </form>
  
    );
  }
}
const CONTACTS_QUERY = gql`
  query {
    allContacts {
    	  id 
        address
        phone 
        
       
    }
  }
`;
const ADD_CONTACTS = gql`
    mutation createContact( $address: String!,$phone:String!, ){
         createContact(address:$address,phone:$phone,){
                                            address
                                            phone     
                                        }
                        } `
export default compose(
  graphql(CONTACTS_QUERY),
  graphql(ADD_CONTACTS, { name: 'createContact' })
)(AddContact);