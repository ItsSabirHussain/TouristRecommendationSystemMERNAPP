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
      .post("/aupdateprofile", adminInfo)
      .then(res => {
        props.history.push("/admindashboard");
      })
      .catch(error => {
        console.log(error);
      });
    localStorage.setItem("adminID", adminInfo.ID);
  };

  const [adminInfo, setAdminInfo] = React.useState({
    IDD: localStorage.getItem("adminID"),
    FullName: "",
    Email: "",
    ID: "",
    Key: ""
  });
  useEffect(() => {
    if (adminInfo.FullName === "") {
      axios
        .post("/getadmin", { ID: localStorage.getItem("adminID") })
        .then(res => {
          console.log(res);
          setAdminInfo({
            ...adminInfo,
            Email: res.data.Email,
            FullName: res.data.FullName,
            ID: res.data.ID,
            Key: res.data.Key
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label={"Name: " + adminInfo.FullName}
                autoFocus
                onChange={e =>
                  setAdminInfo({ ...adminInfo, FullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"ID: " + adminInfo.ID}
                autoFocus
                onChange={e =>
                  setAdminInfo({ ...adminInfo, ID: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={"Email: " + adminInfo.Email}
                name="email"
                autoComplete="email"
                onChange={e =>
                  setAdminInfo({ ...adminInfo, Email: e.target.value })
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
                  setAdminInfo({ ...adminInfo, Key: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}></Grid>
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
