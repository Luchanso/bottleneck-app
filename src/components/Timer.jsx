import React from 'react';
import { shape, string, func, bool } from 'prop-types';
import classnames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import RestoreIcon from 'material-ui-icons/Restore';
import { CardContent, CardActions } from 'material-ui/Card';
import { Typography, TextField, Card, IconButton, Button } from 'material-ui';
import logger from 'src/logger';
import { calculateTotalTime } from 'src/utils';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    const log = logger(`${this.constructor.name}`);

    log('Create timer');
    log('timer.id', props.timer.id);

    this.updateLoop = null;

    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleToggleState = this.handleToggleState.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timer.isStart && this.props.timer.isStop) {
      this.updateLoop = setInterval(() => {
        this.forceUpdate();
      }, 1000);
    } else if (nextProps.timer.isStop && this.props.timer.isStart) {
      clearInterval(this.updateLoop);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateLoop);
  }

  handleDestroy() {
    this.props.onDestroy({ id: this.props.timer.id });
  }

  handleToggleState() {
    const { isStart, isStop } = this.props.timer;

    if (isStop) {
      this.handleStart();
    } else if (isStart) {
      this.handleStop();
    }
  }

  handleStart() {
    this.props.onStart({ id: this.props.timer.id });
  }

  handleStop() {
    this.props.onStop({ id: this.props.timer.id });
  }

  renderTextfieldName() {
    const { name } = this.props.timer;

    return (
      <TextField
        color="secondary"
        id="name"
        label="Name"
        fullWidth
        value={name}
      />
    );
  }

  renderStopwatch() {
    const { classes, timer } = this.props;
    const { intervals, isStart } = timer;

    const summary = calculateTotalTime(intervals);

    let seconds = Math.floor(summary / 1000) % 60;
    let minutes = Math.floor(summary / 1000 / 60) % 60;
    const hours = Math.floor(summary / 1000 / 60 / 60);
    let formatedString = '';

    if (seconds < 10 || seconds === 0) {
      seconds = `0${seconds}`;
    }

    if (minutes < 10 || minutes === 0) {
      minutes = `0${minutes}`;
    }

    if (hours === 0) {
      formatedString = `${minutes}:${seconds}`;
    } else {
      formatedString = `${hours}:${minutes}:${seconds}`;
    }

    const options = {
      className: classnames(classes.time, {
        [classes.activeColor]: isStart,
      }),
      align: 'center',
      type: 'display1',
    };

    return (
      <Typography
        {...options}
      >
        { formatedString }
      </Typography>
    );
  }

  renderBtnSwitchState() {
    const { classes, timer } = this.props;
    const { isStart, isStop } = timer;
    const options = {
      fab: true,
      color: 'primary',
      className: classes.btnToggle,
      onClick: this.handleToggleState,
    };

    return (
      <div className={classes.controls}>
        <Button {...options}>
          { isStop && <PlayIcon /> }
          { isStart && <PauseIcon /> }
        </Button>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardContent>
          { this.renderTextfieldName() }
          { this.renderStopwatch() }
          { this.renderBtnSwitchState() }
        </CardContent>
        <CardActions disableActionSpacing className={classes.cardActions}>
          <IconButton
            className={classes.btnReset}
            aria-label="Reset"
          >
            <RestoreIcon />
          </IconButton>
          <IconButton
            className={classes.btnDelete}
            aria-label="Delete"
            onClick={this.handleDestroy}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

Timer.propTypes = {
  classes: shape({
    time: string.isRequired,
  }).isRequired,
  onDestroy: func.isRequired,
  onStart: func.isRequired,
  onStop: func.isRequired,
  timer: shape({
    id: string.isRequired,
    isStart: bool.isRequired,
    isStop: bool.isRequired,
  }).isRequired,
};

const styleSheet = createStyleSheet('Timer', theme => ({
  time: {
    marginTop: 16,
  },

  activeColor: {
    color: theme.palette.primary[500],
  },

  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },

  btnToggle: {
    color: 'white',
  },

  btnDelete: {
    color: red[500],
  },
}));

export default withStyles(styleSheet)(Timer);
