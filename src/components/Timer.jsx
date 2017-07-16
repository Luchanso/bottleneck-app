import React from 'react';
import { shape, string, func } from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import PlayIcon from 'material-ui-icons/PlayArrow';
import RestoreIcon from 'material-ui-icons/Restore';
import { CardContent, CardActions } from 'material-ui/Card';
import { Typography, TextField, Card, IconButton, Button } from 'material-ui';
import logger from 'src/logger';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    const log = logger(`${this.constructor.name}`);

    log('Create timer');

    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleDestroy() {
    this.props.onDestroy({ id: this.props.id });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardContent>
          <TextField
            color="secondary"
            id="name"
            label="Name"
            fullWidth
          />
          <Typography
            className={classes.time}
            align="center"
            type="display1"
          >
            000:00:00
          </Typography>
          <div className={classes.controls}>
            <Button fab color="primary" className={classes.btnToggle}>
              <PlayIcon />
            </Button>
          </div>
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
  id: string.isRequired,
  classes: shape({
    time: string.isRequired,
  }).isRequired,
  onDestroy: func.isRequired,
};

const styleSheet = createStyleSheet('Timer', theme => ({
  time: {
    marginTop: 16,
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
