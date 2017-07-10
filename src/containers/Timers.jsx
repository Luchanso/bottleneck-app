import React from 'react';
import { shape, string } from 'prop-types';
import { Grid } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Timer from 'components/Timer';

const Timers = props => (
  <div className={props.classes.container}>
    <Grid container gutter={16}>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
      <Grid item lg={2} md={3} sm={3} xs={4}>
        <Timer />
      </Grid>
    </Grid>
  </div>
);

Timers.propTypes = {
  classes: shape({
    container: string.isRequired,
  }).isRequired,
};

const styleSheet = createStyleSheet('Timers', () => ({
  container: {
    backgroundColor: '#eee',
    marginTop: 8,
    padding: '0 8px',
    height: '100%',
  },
}));

export default withStyles(styleSheet)(Timers);
