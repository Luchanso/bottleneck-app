import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red, orange, indigo } from 'material-ui/colors';
import createPalette from 'material-ui/styles/palette';
import store from 'store';
import Router from 'containers/Router';

const theme = createMuiTheme({
  palette: createPalette({
    primary: orange,
    accent: indigo,
    error: red,
  }),
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
