import React, { useState } from "react";
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
import MultipleSelect from "./multiselect";

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

export default function AddPlace(props) {
  const classes = useStyles();
  const [placeInfo, setPlaceInfo] = useState({
    Name: "",
    Category: "",
    Latitude: "",
    Longitude: "",
    City: "",
    Tags: localStorage.getItem("tags")
  });

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/addplace", placeInfo)
      .then(res => {
        props.history.push("/admindashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onClickk = e => {
    e.preventDefault();
    props.history.push("/admindashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Place
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
                label="Name"
                autoFocus
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, Name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Category / Type"
                name="category"
                autoComplete="category"
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, Category: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="latiude"
                label="Latitude"
                name="latitude"
                autoComplete="latitude"
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, Latitude: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="longitude"
                label="Longitude"
                type="text"
                id="longitude"
                autoComplete="current-Key"
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, Longitude: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
                autoComplete="current-Key"
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, City: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <br></br>
              <h6>Place relevent tags: </h6>
              <MultipleSelect />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Add Place
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
