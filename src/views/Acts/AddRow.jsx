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

    this.onUpdate = this.onUpdate.bind(this);
  };

  componentWillReceiveProps(newProps) {
    console.log(JSON.stringify(newProps) + "actsData")
    this.setState({
      acts: newProps.data.allActs,
      loading: true
    })
  };

  onUpdate(e) {
    this.setState({ act: e.target.value })
    this.setState({ title: this.title.value })
    this.setState({ year: this.year.value })
    this.setState({ url: this.url.value })
  };

  createAct() {
    console.log(JSON.stringify(this.refs.act.value))
    this.props.createAct({
      variables:
        {
          actNumber: this.refs.act.value,
          title: this.state.title,
          year: this.state.year,
          url: this.state.url,

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
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              ref="act"
              placeholder="Act"
              labelText="Act"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              id="title"
              value={this.state.title}
              placeholder="Title"
              onChange={this.onUpdate.bind(this)}
              labelText="Title"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              id="year"
              value={this.state.year}
              placeholder="Year"
              onChange={this.onUpdate.bind(this)}
              labelText="Year"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              id="url"
              value={this.state.url}
              placeholder="Url"
              onChange={this.onUpdate.bind(this)}
              labelText="Url"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
        <Button
          onClick={this.createAct.bind(this)}
          color="primary">
          Submit
            </Button>
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
    mutation createAct( $actNumber: Int,$title:String,$actYear:Int,$actUrl: String, ){
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