import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    Email: ""
  });
  const [currentCity, setCurrentCity] = React.useState({ City: "" });

  var pos = {
    lat: 40.7809261,
    lng: -73.9637594
  };
  const onClick = e => {
    e.preventDefault();
    axios
      .post("/addplace", { City: currentCity.City })
      .then(res => {
        props.history.push("/admindashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userInfo.FullName === "") {
      axios
        .post("/getuser", { ID: localStorage.getItem("userID") })
        .then(res => {
          console.log(res);
          setUserInfo({
            Email: res.data.Email,
            FullName: res.data.FullName
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* User Details */}
          <Grid item xs={12} md={8} lg={9}>
            <Jumbotron>
              <h1 className="display-6">{"User Name: " + userInfo.FullName}</h1>
              <p className="lead">{"Email: " + userInfo.Email}</p>
              <hr className="my-2" />
              <p></p>
              <p className="lead"></p>
            </Jumbotron>
            <Grid item xs={12} md={8} lg={9}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label={"City eg: Perth"}
                  name="city"
                  autoComplete="city"
                  onChange={e =>
                    setCurrentCity({
                      currentCity: e.target.value
                    })
                  }
                />{" "}
              </Grid>
              <br></br>
              <Grid item xs={12} md={8} lg={9}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onClick}
                >
                  Update Profile
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
