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


class AddJournal extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allJournalss: PropTypes.array,
      createJournal: PropTypes.func,
      updateJournal: PropTypes.func,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      journals: [],
      code: '',
      publishedDate: '',
      year: '',
      url: '',
      loading: false,
      userSubmited: false
    }

    this.onUpdateCode = this.onUpdateCode.bind(this);
    this.onUpdatePublishedDate = this.onUpdatePublishedDate.bind(this);
    this.onUpdateYear = this.onUpdateYear.bind(this);
    this.onUpdateUrl = this.onUpdateUrl.bind(this);


  };

  componentWillReceiveProps(newProps) {
    
    this.setState({
     journals: newProps.data.allJournals,
      loading: true
    })
  };

  onUpdateCode(e) {
    this.setState({ code: e.target.value })
  };
  onUpdatePublishedDate(e){
      this.setState({ publishedDate: e.target.value })
  };
  onUpdateYear(e){
      this.setState({ year:  e.target.value  })
  };
  onUpdateUrl(e){
      this.setState({ url:  e.target.value  })
  };

  createJournal() {
    this.props.createJournal({
      variables:
        {
          code: this.state.code,
          publishedDate: this.state.publishedDate,
          year: this.state.year,
          url: this.state.url,

        }
    })
      .then((user) => {
        alert(JSON.stringify(user) + "journals")
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
                name="code"
                 hintText="Code"
                 placeholder="Code"
                 value={this.state.Code}
                 onChange={this.onUpdateCode.bind(this)}
                 floatingLabelFixed
               />
          </GridItem>
       <br />
         <GridItem xs={12} sm={12} md={6}>
               <TextField
                 name="publishedDate"
                 hintText="publishedDate"
                 placeholder="PublishedDate"
                 value={this.state.publishedDate}
                 onChange={this.onUpdatePublishedDate.bind(this)}
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
          onClick={this.createJournal.bind(this)}
          color="primary">
          Submit
            </Button>
            </center>

  </form>
  
    );
  }
}
const JOURNALS_QUERY = gql`
  query {
    allJournals {
        id 
        code
        publishedDate  
        year
        url
       
    }
  }
`;
const ADD_JOURNALS = gql`
    mutation createJournal( $code: String!,$publishedDate:String!,$year:String!,$url: String!, ){
         createJournal(code:$code,publishedDate:$publishedDate,year:$year,url:$url){
                                            code
                                            publishedDate    
                                            year
                                            url
                                            
                                        }
                        } `
export default compose(
  graphql(JOURNALS_QUERY),
  graphql(ADD_JOURNALS, { name: 'createJournal' })
)(AddJournal);