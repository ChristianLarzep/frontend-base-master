import 'airbnb-js-shims';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import gql from 'graphql-tag';

import client from './store/apolloClient';
import browserHistory from './browserHistory';
import '../scss/common.scss';
import Routes from './routes';
import Store from './store';

client
  .query({
    query: gql`
      {
        allEmployees {
          id
          name
          position
          image
          phone
          email
        }
      }
    `,
  })
  .then(({ data }) => console.log({ data }));
render(
  <Provider store={Store}>
    <ApolloProvider client={client}>
      <Routes history={browserHistory} />
    </ApolloProvider>
  </Provider>,
  document.getElementById('app'),
);
