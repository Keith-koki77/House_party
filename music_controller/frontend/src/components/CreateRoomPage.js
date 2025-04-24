import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true",
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Grid
        container
        spacing={2}
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography component="h4" variant="h4" align="center">
                Create A Room
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormHelperText>
                  <div align="center">Guest Control of Playback State</div>
                </FormHelperText>
                <RadioGroup
                  row
                  defaultValue="true"
                  onChange={this.handleGuestCanPauseChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="Play/Pause"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio color="secondary" />}
                    label="No Control"
                    labelPlacement="bottom"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <TextField
                  required
                  type="number"
                  onChange={this.handleVotesChange}
                  defaultValue={this.defaultVotes}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                  }}
                />
                <FormHelperText>
                  <div align="center">Votes Required To Skip Song</div>
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleRoomButtonPressed}
                fullWidth
              >
                Create A Room
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/"
                fullWidth
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}