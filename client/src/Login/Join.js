import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { notification } from "antd";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    margin: theme.spacing(4, 0, 4),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${process.env.REACT_APP_SERVER_URL}/signup`, values);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signup`, values)
      .then(function (response) {
        openNotificationWithIcon(
          "success",
          "Thanks for registration",
          "Please log in."
        );
        props.history.push(`/login`);
      })
      .catch(function (error) {
        openNotificationWithIcon(
          "error",
          "Error!",
          "Register failed, try again"
        );
        console.log("err:", error);
      });
  };
  const openNotificationWithIcon = (type, message, desc) => {
    notification[type]({
      message: [message],
      description: [desc],
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link to="/" exact>
          <h3>NetMiner365</h3>
        </Link>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="comp"
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  placeholder="your company code"
                  autoFocus
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="id"
                  autoFocus
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onBlur={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Link to="/" exact>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="default"
                className={classes.submit}
              >
                Cancel
              </Button>
            </Link>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
