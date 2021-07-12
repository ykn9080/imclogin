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
import { currentsetting } from "../config/index.js";
import Snack from "../utilities/Snackbar";
import { notification } from "antd";
import useKeyPress from "../functions/CustomHooks";

const openNotificationWithIcon = (type, message, desc, placement) => {
  console.log(type, message, desc, placement);
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
      {"."}
    </Typography>
  );
}
function appendPid(menu) {
  //append pid for
  menu.map((k, i) => {
    if (!k.hasOwnProperty("pid")) k.pid = "";
    menu.slice(i, 1, k);
    return false;
  });
  return menu;
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
  let warning = false;
  const state = props.location.state;
  const refEnter = useRef(null);
  const refPass = useRef(null);
  if (typeof state != "undefined" && state.needsLogin) warning = true;
  const { from } = state || { from: { pathname: "/" } };

  //const dispatch = useDispatch();
  const [values, setValues] = useState({});
  let pressedEnter = useKeyPress("Enter");

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    console.log(values);
  };

  useEffect(() => {
    if (pressedEnter) {
      console.log("Search for keywords: ");
      refEnter.current.focus();
    }
  }, [pressedEnter]);

  const handleSubmit = async (e) => {
    console.log("submitted", values);
    e.preventDefault();
    let msg;
    axios
      .post(`${currentsetting.webserviceprefix}login`, values)
      .then(function (response) {
        const dt = response.data;
        console.log("response.data:  ", dt);
        if (dt.hasOwnProperty("message"))
          msg = ["error", "Login Failed", dt.message];
        else
          msg = ["success", dt.user.id, "Welcome to IMCMaster", "bottomRight"];
        openNotificationWithIcon(...msg);

        const menu = appendPid(JSON.parse(dt.menu));
        // dispatch(persistVariable({ token: dt.token }));
        // dispatch(persistVariable({ menu: menu }));
        // dispatch(persistVariable({ adminmenu: dt.adminmenu }));
        //dispatch(globalVariable({ control: dt.control }));
        //dispatch(persistVariable({ login: dt.user }));
        axios.defaults.headers.common = { Authorization: `Bearer ${dt.token}` };
        localStorage.setItem("openmenu", JSON.stringify(dt.openmenu));
        localStorage.setItem("menu", JSON.stringify(menu));
        localStorage.setItem("token", JSON.stringify(dt.token));
        //dispatch(globalVariable({ token: dt.token }));
        props.history.push(`${from.pathname}`);
      })
      .catch(function (error) {
        openNotificationWithIcon("error", "Error", error.message);
        console.log("err:  ", error);
      });
  };

  // const { values, handleChange, handleSubmit, handleSubmitCallback } = useForm(
  //   remotelogin,
  //   props
  // );
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link to="/" exact>
          {" "}
          <Typography>IMCMaster </Typography>
          {/* <Grid container className={classes.logo} justify="flex-start">
            <Grid item>
              <img
                src={logo}
                className="d-inline-block align-bottom"
                width="60"
              />
            </Grid>
            <Grid item>
              <img src={imclogo} className="d-inline-block align-top" />
            </Grid>
          </Grid> */}
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
              name="id"
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
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};
// export function isLoggedIn() {
//   const token = useSelector(state => state.global.token);
//   return(

//   )
//   if (token != "") return true;
//   else return false;
// }
// export function getToken() {
//   return useSelector(state => state.global.token);
// }
// export function removeToken() {
//   const dispatch = useDispatch();
//   dispatch(globalVariable({ token: "" }));
// }
export default SignIn;
