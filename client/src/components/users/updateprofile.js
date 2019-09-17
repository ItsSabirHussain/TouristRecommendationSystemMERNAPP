import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import MultipleSelect from "../userlogin/multiselect";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        The website{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function UpdateProfile(props) {
  const classes = useStyles();

  const onClick = e => {
    axios
      .post("/updateprofile", userInfo)
      .then(res => {
        props.history.push("/userdashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [userInfo, setUserInfo] = React.useState({
    FullName: "",
    Email: "",
    ID: "",
    Key: "",
    Interests: localStorage.getItem("interests")
  });
  useEffect(() => {
    if (userInfo.FullName === "") {
      axios
        .post("/getuser", { ID: localStorage.getItem("userID") })
        .then(res => {
          console.log(res);
          setUserInfo({
            Email: res.data.Email,
            FullName: res.data.FullName,
            ID: res.data.ID,
            Interests: res.data.Interests
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  console.log(userInfo.FullName);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label={"Name: " + userInfo.FullName}
                autoFocus
                onChange={e =>
                  setUserInfo({ ...userInfo, FullName: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={"Email: " + userInfo.Email}
                name="email"
                autoComplete="email"
                onChange={e =>
                  setUserInfo({ ...userInfo, Email: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Key"
                label="Key"
                type="password"
                id="Key"
                autoComplete="current-Key"
                onChange={e =>
                  setUserInfo({ ...userInfo, Key: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Grid item xs={12}>
            <br></br>
            <h6>Select your interests</h6>
            <MultipleSelect />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Update Profile
          </Button>
          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
