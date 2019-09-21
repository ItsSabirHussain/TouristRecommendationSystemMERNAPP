import React, { useEffect, useState } from "react";
import { usePosition } from "use-position";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Geocode from "react-geocode";

const API_KEY = "AIzaSyDWpi_sAXeY7VB7_Btf1dUHjE5y6sEg03w";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.

// set response language. Defaults to english.

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.

// Enable or disable logs. Its optional.
Geocode.enableDebug();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Inteligent Turist Guide
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Main(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({
    FullName: "",
    Email: "",
    Interests: []
  });

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/updateccity", { ID: localStorage.getItem("userID"), City: place })
      .then(res => {
        props.history.push("/userdashboard/rplaces");
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (userInfo.FullName === "") {
      axios
        .post("/getuser", { ID: localStorage.getItem("userID") })
        .then(res => {
          console.log(res);
          localStorage.setItem("updateID", res._id);
          setUserInfo({
            Email: res.data.Email,
            FullName: res.data.FullName,
            Interests: res.data.Interests
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });

  const [place, setPlace] = useState("");
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* User Details */}
          <Grid item xs={12}>
            <Jumbotron>
              <h1 className="display-6">{"User Name: " + userInfo.FullName}</h1>
              <p className="lead">{"Email: " + userInfo.Email}</p>
              <p className="lead">{"Interests: " + userInfo.Interests}</p>

              <hr className="my-2" />
              <p></p>
              <p className="lead"></p>
            </Jumbotron>
            <Grid item xs={12} md={8} lg={9}>
              <br></br>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Enter City Here"
                  autoFocus
                  onChange={e => setPlace(e.target.value)}
                />
              </Grid>
              <br></br>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onClick}
                >
                  Update City
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </main>
  );
}
