import React from 'react';
import { shape, string } from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red, white } from 'material-ui/colors';
import DeleteIcon from 'material-ui-icons/Delete';
import PlayIcon from 'material-ui-icons/PlayArrow';
import RestoreIcon from 'material-ui-icons/Restore';
import { CardContent, CardActions } from 'material-ui/Card';
import { Typography, TextField, Card, IconButton, Button } from 'material-ui';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    console.log('Timer created');
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
  cardActions: {
    // justifyContent: 'flex-end',
  },
}));

export default withStyles(styleSheet)(Timer);
