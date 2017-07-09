import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import store from 'store';
import Router from 'containers/Router';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
