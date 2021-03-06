import React from 'react';
import { shape, string, func, arrayOf } from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Grid, Button, Typography } from 'material-ui';
import IconAdd from 'material-ui-icons/Add';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { getAllTimers } from 'src/reducer';
import * as duckTimers from 'ducks/timers';
import Timer from 'components/Timer';

class Timers extends React.Component {
  renderTimers() {
    const {
      timers,
      onDestroyTimer,
      onStartTimer,
      onStopTimer,
    } = this.props;

    const nodeTimers = timers.map((timer) => {
      return (
        <Grid key={timer.id} item lg={2} md={3} sm={3} xs={4}>
          <Timer
            onDestroy={onDestroyTimer}
            onStart={onStartTimer}
            onStop={onStopTimer}
            timer={timer}
          />
        </Grid>
      );
    });

    return (
      <Grid container gutter={16}>
        { nodeTimers }
      </Grid>
    );
  }

  renderBtnAddTimer() {
    const { classes, onCreateTimer } = this.props;

    const options = {
      color: 'accent',
      className: classes.btnAddTimer,
      onClick: () => { onCreateTimer(); },
      fab: true,
    };

    return (
      <Button {...options}>
        <IconAdd />
      </Button>
    );
  }

  renderInstruction() {
    const { classes, onCreateTimer } = this.props;
    const optionsTitle = {
      type: 'display4',
      gutterBottom: true,
      align: 'center',
    };

    const optionsContainer = {
      className: classes.instruction,
      justify: 'center',
      direction: 'column',
      container: true,
      onClick: () => {
        onCreateTimer();
      },
    };

    return (
      <Grid {...optionsContainer}>
        <Typography {...optionsTitle}>
          Add new timer
        </Typography>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const { timers } = this.props;
    return (
      <div className={classes.container}>
        {
          timers.length === 0 ?
          this.renderInstruction() :
          this.renderTimers()
        }
        { timers.length !== 0 && this.renderBtnAddTimer() }
      </div>
    );
  }
}

Timers.propTypes = {
  classes: shape({
    container: string.isRequired,
    btnAddTimer: string.isRequired,
  }).isRequired,
  onCreateTimer: func.isRequired,
  onStartTimer: func.isRequired,
  onStopTimer: func.isRequired,
  onDestroyTimer: func.isRequired,
  timers: arrayOf(shape({})),
};

Timers.defaultProps = {
  timers: [],
};

const styleSheet = createStyleSheet('Timers', () => ({
  container: {
    backgroundColor: '#eee',
    padding: '8px',
    height: '100%',
  },

  btnAddTimer: {
    position: 'fixed',
    right: 25,
    bottom: 25,
    zIndex: 2,
  },

  instruction: {
    height: '100%',
    cursor: 'pointer',
  },
}));

const mapStateToProps = (state) => {
  const timers = getAllTimers(state);

  return {
    timers,
  };
};

const mapDispatchToProps = {
  onCreateTimer: duckTimers.create,
  onDestroyTimer: duckTimers.destroy,
  onStartTimer: duckTimers.start,
  onStopTimer: duckTimers.stop,
};

export default compose(
  withStyles(styleSheet),
  connect(mapStateToProps, mapDispatchToProps),
)(Timers);
