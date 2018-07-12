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


class AddRow extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allAdvocateDatas: PropTypes.array,
      createAdvocateData: PropTypes.func,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      advocates: [],
      name: '',
      enrollmentNumber: '',
      email: '',
      homeAddress: '',
      officeAddress:'',
      phone:'',
      loading: false,
      userSubmited: false
    }

    this.onUpdateName = this.onUpdateName.bind(this);
    this.onUpdateEnrollment = this.onUpdateEnrollment.bind(this);
    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onUpdateHomeAddress = this.onUpdateHomeAddress.bind(this);
    this.onUpdateOfficeAddress = this.onUpdateOfficeAddress.bind(this);
    this.onUpdatePhone = this.onUpdatePhone.bind(this);
  };

  componentWillReceiveProps(newProps) {
    console.log(JSON.stringify(newProps) + "actsData")
    this.setState({
      acts: newProps.data.allActs,
      loading: true
    })
  };

  onUpdateName(e) {
    this.setState({ name: e.target.value })
  };
  onUpdateEnrollment(e){
      this.setState({ enrollmentNumber: e.target.value })
  };
  onUpdateEmail(e){
      this.setState({ email:  e.target.value  })
  };
  onUpdateHomeAddress(e){
      this.setState({ homeAddress:  e.target.value  })
  };
  onUpdateOfficeAddress(e){
    this.setState({ officeAddress:  e.target.value  })
};
onUpdatePhone(e){
    this.setState({ phone:  e.target.value  })
};

createAdvocateData() {
    this.props.createAdvocateData({
      variables:
        {
          name: this.state.name,
          enrollmentNumber: this.state.enrollmentNumber,
          email: this.state.email,
          homeAddress: this.state.homeAddress,
          officeAddress: this.state.officeAddress,
          phone: this.state.phone,


        }
    })
      .then((user) => {
        alert(JSON.stringify(user) + "advocates")
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
                name="name"
                 hintText="Name"
                 placeholder="Name"
                 value={this.state.name}
                 onChange={this.onUpdateName.bind(this)}
                 floatingLabelFixed
               />
          </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="enrollmentNumber"
                 hintText="EnrollmentNumber"
                 placeholder="EnrollmentNumber"
                 value={this.state.enrollmentNumber}
                 onChange={this.onUpdateEnrollment.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="email"
                 hintText="Email"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={this.onUpdateEmail.bind(this)}
                  floatingLabelFixed
               />
         </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="homeAddress"
                 hintText="homeAddress"
                 placeholder="Home Address"
                 value={this.state.homeAddress}
                 onChange={this.onUpdateHomeAddress.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
         <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="officeAddress"
                 hintText="officeAddress"
                 placeholder="Office Address"
                 value={this.state.officeAddress}
                 onChange={this.onUpdateOfficeAddress.bind(this)}
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
         
    </GridContainer>
       <center style={{paddingTop:"30px"}}>
       <Button
          onClick={this.createAdvocateData.bind(this)}
          color="primary">
          Submit
            </Button>
            </center>

  </form>
  
    );
  }
}
const ADVOCATES_QUERY = gql`
  query {
    allAdvocateDatas {
    	  id 
        name
        enrollmentNumber  
        email
        homeAddress
        officeAddress
        phone
       
    }
  }
`;
const ADD_ADVOCATES = gql`
    mutation createAdvocateData( $name: String!,$enrollmentNumber:String!,$email:String!,$homeAddress: String!,$officeAddress: String!,$phone: String! ){
        createAdvocateData(name:$name,enrollmentNumber:$enrollmentNumber,email:$email,homeAddress:$homeAddress,officeAddress:$officeAddress,phone:$phone){
                                            name
                                            enrollmentNumber     
                                            email
                                            homeAddress
                                            officeAddress
                                            phone
                                            
                                        }
                        } `
export default compose(
  graphql(ADVOCATES_QUERY),
  graphql(ADD_ADVOCATES, { name: 'createAdvocateData' })
)(AddRow);