import { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Paper,
  Divider,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MoodBadIcon from "@material-ui/icons/MoodBad";

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "100%"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function ForgotPasswordComponent() {
  const [state, setState] = useState({
    email: ""
  });

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Boolean(state.email) ? setDisabled(false) : setDisabled(true);
  }, [state.email]);

  const handleChange = e => {
    const { value } = e.target;
    setState(prevState => ({ ...prevState, email: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state.email);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h1" align="center">
          Forgot Your Password?
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Well, that sucks
        </Typography>
        <MoodBadIcon />
        <Typography color="textSecondary" align="center">
          Fill out your email address and we will send you instructions to reset
          your password
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            required
            placeholder="Enter your Email Address"
            variant="outlined"
            margin="normal"
            label="Email"
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            className={classes.submit}
            disabled={disabled}
          >
            Email me some help {""}
            <ArrowForwardIcon style={{ marginLeft: "5px" }} />
          </Button>
        </form>
        <Typography
          color="textSecondary"
          component="span"
          style={{ fontSize: "0.8rem", lineHeight: "1.2", marginTop: "15px" }}
        >
          If Issue isn't resolved, kindly reach out to technical support for
          help
        </Typography>
      </Paper>
    </div>
  );
}
