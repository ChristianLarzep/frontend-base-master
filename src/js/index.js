import 'airbnb-js-shims';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import client from './store/apolloClient';
import browserHistory from './browserHistory';
import '../scss/common.scss';
import Routes from './routes';
import Store from './store';

render(
  <ApolloProvider store={Store} client={client}>
    <Routes history={browserHistory} />
  </ApolloProvider>,
  document.getElementById('app'),
);
