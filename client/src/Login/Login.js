import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Snack from "../Utilities/Snackbar";
import useKeyPress from "../Utilities/CustomHooks";
import { notification } from "antd";
import { GoogleLogin } from "react-google-login";

const openNotificationWithIcon = (type, message, desc, placement) => {
  notification[type]({
    message: [message],
    description: [desc],
    placement,
  });
};
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
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

const SignIn = (props) => {
  //for snackBar props

  const state = props.location.state;
  const refEnter = useRef(null);
  const refPass = useRef(null);
  const classes = useStyles();
  const pressedEnter = useKeyPress("Enter");
  const { from } = state || { from: { pathname: "/" } };
  const [values, setValues] = useState({});

  let warning = false;
  if (typeof state != "undefined" && state.needsLogin) warning = true;

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (pressedEnter) {
      console.log("Search for keywords: ");
      refEnter.current.focus();
    }
  }, [pressedEnter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let msg;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, values)
      .then(function (response) {
        const dt = response.data;

        if (dt.hasOwnProperty("message"))
          msg = ["error", "Login Failed", dt.message];
        else {
          msg = ["success", dt.user.name, "Welcome ", "bottomRight"];
          axios.defaults.headers.common = {
            Authorization: `Bearer ${dt.token}`,
          };
          localStorage.setItem("token", JSON.stringify(dt.token));
          localStorage.setItem("user", JSON.stringify(dt.user));
        }

        openNotificationWithIcon(...msg);
        props.history.push(`${from.pathname}`);
      })
      .catch(function (error) {
        openNotificationWithIcon("error", "Error", error.message);
        console.log("err:  ", error);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    setValues({
      name: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
    });
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link to="/" exact>
          <Typography>Home </Typography>
        </Link>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="user id"
              name="username"
              autoComplete="email"
              autoFocus
              onBlur={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              ref={refPass}
              onBlur={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              ref={refEnter}
            >
              Sign In
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/Join" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Snack
              message={"Not authorized!! Please log in."}
              warning={warning}
              severity={"error"}
            />
          </form>
        </div>
        <div>
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};
export default SignIn;
