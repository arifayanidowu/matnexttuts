import {
  Typography,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  Button,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LockIcon from "@material-ui/icons/Lock";
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { handleLogin } from "../lib/auth";
import Link from "next/link";
import { fade } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import baseUrl from "../lib/baseUrl";
import fetch from "isomorphic-unfetch";

const INITIAL_STATE = {
  email: "",
  password: ""
};

export default function Login() {
  const [state, setState] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    Transition: Fade,
    openError: false,
    error: ""
  });

  useEffect(() => {
    const isUser = Object.values(state).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [state]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const showError = err => {
    const error = (err.response && err.response.data) || err.message;
    setSnack({ error, openError: true });
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setSnack({
        error: ""
      });
      const payload = {
        email: state.email,
        password: state.password
      };
      const response = await axios.post(`${baseUrl}/auth/signin`, payload);
      // const res = await fetch(`/api/auth/signin`, {
      //   method: "POST",
      //   body: JSON.stringify(payload)
      // });
      const data = response.data;
      console.log(data);
      handleLogin(data);
    } catch (err) {
      showError(err);
    }
  };

  const handleClose = () => {
    setSnack({
      ...snack,
      openError: false
    });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        {snack.error && (
          <Snackbar
            open={snack.openError}
            onClose={handleClose}
            TransitionComponent={snack.Transition}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <span id="message-id" style={{ color: "red" }}>
                {snack.error}
              </span>
            }
          />
        )}
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              name="email"
              type="email"
              value={state.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={state.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            disabled={loading || disabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <span className={classes.flex}>
                Loading... <CircularProgress size="1rem" />
              </span>
            ) : (
              <span>Login</span>
            )}
          </Button>
          <div className={classes.gridIt}>
            <Link href="/signup">
              <a>Don't have an account? Sign up</a>
            </Link>
            <Link href="/forgotpassword">
              <a>Forgot password?</a>
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

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
    padding: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.light
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
  },
  forgotPass: {
    float: "right",
    display: "inline-block",
    marginTop: "7px"
  },
  gridIt: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 20
  }
}));
