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


class AddRow extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allActs: PropTypes.array,
      createAct: PropTypes.func,
      updateAct: PropTypes.func,
    }).isRequired,
  }
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

    this.onUpdateAct = this.onUpdateAct.bind(this);
    this.onUpdateTitle = this.onUpdateTitle.bind(this);
    this.onUpdateYear = this.onUpdateYear.bind(this);
    this.onUpdateUrl = this.onUpdateUrl.bind(this);


  };

  componentWillReceiveProps(newProps) {
    console.log(JSON.stringify(newProps) + "actsData")
    this.setState({
      acts: newProps.data.allActs,
      loading: true
    })
  };

  onUpdateAct(e) {
    this.setState({ act: e.target.value })
  };
  onUpdateTitle(e){
      this.setState({ title: e.target.value })
  };
  onUpdateYear(e){
      this.setState({ year:  e.target.value  })
  };
  onUpdateUrl(e){
      this.setState({ url:  e.target.value  })
  };

  createAct() {
    this.props.createAct({
      variables:
        {
          actNumber: this.state.act,
          title: this.state.title,
          actYear: this.state.year,
          actUrl: this.state.url,

        }
    })
      .then((user) => {
        alert(JSON.stringify(user) + "acts")
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
                name="act"
                 hintText="Act"
                 placeholder="ActNumber"
                 value={this.state.act}
                 onChange={this.onUpdateAct.bind(this)}
                 floatingLabelFixed
               />
          </GridItem>
       <br />
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
                 name="year"
                 hintText="Year"
                 placeholder="Year"
                 value={this.state.year}
                 onChange={this.onUpdateYear.bind(this)}
                  floatingLabelFixed
               />
         </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="url"
                 hintText="url"
                 placeholder="Url"
                 value={this.state.url}
                 onChange={this.onUpdateUrl.bind(this)}
                 floatingLabelFixed
               />
         </GridItem>
       <br />
    </GridContainer>
       <center style={{paddingTop:"30px"}}>
       <Button
          onClick={this.createAct.bind(this)}
          color="primary">
          Submit
            </Button>
            </center>

  </form>
    );
  }
}
const ACTS_QUERY = gql`
  query {
    allActs {
    	  id 
        actNumber
        title  
        actYear
        actUrl
       
    }
  }
`;
const ADD_ACTS = gql`
    mutation createAct( $actNumber: String,$title:String,$actYear:String,$actUrl: String, ){
         createAct(actNumber:$actNumber,title:$title,actYear:$actYear,actUrl:$actUrl){
                                            actUrl
                                            title     
                                            actYear
                                            actNumber
                                            
                                        }
                        } `
export default compose(
  graphql(ACTS_QUERY),
  graphql(ADD_ACTS, { name: 'createAct' })
)(AddRow);