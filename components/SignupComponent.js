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
import PersonIcon from "@material-ui/icons/Person";
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { handleSignup } from "../lib/auth";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  isLoading: false,
  showPassword: false,
  error: ""
};

export default function Signup() {
  const [state, setState] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const user = {
      name: state.name,
      email: state.email,
      password: state.password
    };
    let isValid = Object.values(user).every(el => Boolean(el));
    isValid ? setDisabled(false) : setDisabled(true);
  }, [state.name, state.email, state.password]);

  const handleChange = e => {
    const { target } = e;
    setState(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      const payload = {
        name: state.name,
        email: state.email,
        password: state.password
      };
      await axios.post("/api/auth/signup", payload);
      handleSignup();
    } catch (error) {
      console.error(error);
      setState(prevState => ({ ...prevState, isLoading: false, error }));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="name"
              type="text"
              value={state.name}
              onChange={handleChange}
            />
          </FormControl>
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
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={state.isLoading || disabled}
          >
            {state.isLoading ? "Signing up..." : "Sign Up"}
          </Button>
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
  }
}));
