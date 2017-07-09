import React from 'react';
import { CardActions, CardContent } from 'material-ui/Card';
import { Typography, Card } from 'material-ui';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    console.log('Timer created');
  }

  render() {
    // const { classes } = props;

    return (
      <Card>
        <CardContent>
          <Typography type="body1">
            Word of the Day
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
