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
import ModelEdit from "./ModelEdit";
import { dataTable } from "variables/general.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'react-apollo';


class Acts extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allActs: PropTypes.array,
      deleteAct: PropTypes.func,
    }),
  }
  constructor(props) {
    super(props);
    this.state={
      acts:[],
      title:'',
      act:'',
      year:'',
      url:'', 
      actions: '',
      currentId:'',
      userSubmited: false
    }     
  }

  deleteAct(id) {
  
    this.props.deleteAct({
      variables:
        {
          id:id
          
        }
    })
      .then((user) => {
        alert(JSON.stringify(user) + "acts")
        this.setState({
          userSubmited: true,
          
        })
      })
  };
  componentWillReceiveProps(newProps){
     console.log(JSON.stringify(newProps)+"Json Data")
      var acts=newProps.acts.allActs.map((act) => {
                                      return {
                                        id: act.id,
                                        title: act.title,
                                        actNumber: act.actNumber,
                                        actYear: act.actYear,
                                        actUrl: act.actUrl,
                                        actions: (
                                          <div style={{display:"flex"}}>
                                            <div >
                                               <ModelEdit/>
                                            </div>
                                            <div>
                                                <Button
                                           justIcon
                                           round
                                           simple
                                           onClick={() => {
                                              alert(act.id)
                                             var data = this.state.acts;
                                             data.find((o, i) => {
                                               if (o.id === act.id) {
                                               alert(act.id)
                                                 // here you should add some custom code so you can delete the data
                                                 // from this component and from your server as well
                                                 data.splice(i, 1);
                                                 return true;
                                                
                                               }
                                               return false;
                                             });
                                             this.setState({acts: data });
                                           }}
                                           color="danger"
                                           className="remove"
                                         >
                                           <Close />
                                         </Button>{" "}
                                            </div>
                                            
                                          </div>
                                          
                                        )
                                      };
                                    })       
      this.setState({
        acts
      })    
   }
 
  render() {
    const { classes } = this.props;
    return (
        <div>
        <Model />
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>            
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.acts}
                filterable               
                columns={[
                  {
                    Header: "Title",
                    accessor: "title"
                  },
                  {
                    Header: "Act",
                    accessor: "actNumber"
                  },
                  {
                    Header: "Year",
                    accessor: "actYear"
                  },
                  {
                    Header: "Url",
                    accessor: "actUrl"
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

const ACTS_QUERY = gql`
  query allActs {
    allActs {
      id
      title 
      actNumber
      actYear
      actUrl
    }
  }
`;


const DELETE_ACTS = gql`
    mutation deleteAct( $id:ID! ){
         deleteAct(id:$id){
                              id           
                           }
                        } `

export default compose(
  graphql(ACTS_QUERY,{
name:"acts",
 /*options:(ownProps)=>({
    variables: {
    id:acts.id
    }
  })*/
}),
  graphql(DELETE_ACTS,{
  name:"delectAct"
  })
)(Acts);