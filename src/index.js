import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";

const hist = createBrowserHistory();
const link = new HttpLink(
  { uri: 'https://api.graph.cool/simple/v1/cjaxht0s52dbg01421uxhdzxv' },
  {
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTIwMzYyNTYsImNsaWVudElkIjoiY2o2dTg3eGo4MG11ajAxMTB6Y3Zud3V5ciJ9.e-64yVqF2D5M6BNujT2Ci9c4gocnLE2xibqMAk1IFCc',
    }
  }
)
const cache = new InMemoryCache();

//Create Apollo Client
const client = new ApolloClient({
  link,
  cache
});
ReactDOM.render(
  <Router history={hist}>
    <ApolloProvider client={client}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
