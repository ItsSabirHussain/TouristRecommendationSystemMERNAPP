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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { useTheme } from "@material-ui/core/styles";

const names = ["Hotel", "GYM", "Beauty", "Shopping", "Dinning", "Education"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const useStyles2 = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Intelligent Turist Guide </Link>
      {""} {new Date().getFullYear()}
      {""}
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

export default function UpdatePlace(props) {
  const classes2 = useStyles2();
  const classes = useStyles();
  const theme = useTheme();

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/updateplace", {
        Name: placeInfo.Name,
        Category: placeInfo.Category,
        Latitude: placeInfo.Latitude,
        Longitude: placeInfo.Longitude,
        City: placeInfo.City,
        Tags: interestsList,
        _id: placeInfo._id
      })
      .then(res => {
        props.history.push("/admindashboard/viewallplaces");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [placeInfo, setPlaceInfo] = React.useState({
    Name: "",
    Category: "",
    Latitude: "",
    Longitude: "",
    City: "",
    _id: "",
    Tags: []
  });
  const [interestsList, setInterestsList] = React.useState([]);

  function handleChange(event) {
    setInterestsList(event.target.value);
  }
  useEffect(() => {
    if (placeInfo.Name === "") {
      axios
        .post("/getPlace", { _id: localStorage.getItem("ep_id") })
        .then(res => {
          console.log(res);
          setPlaceInfo({
            ...placeInfo,
            Category: res.data.Category,
            Name: res.data.Name,
            Latitude: res.data.Latitude,
            Longitude: res.data.Longitude,
            City: res.data.City,
            _id: res.data._id
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  console.log(placeInfo.Name);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Place
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
                label={"Name: " + placeInfo.Name}
                autoFocus
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, Name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label={"Category: " + placeInfo.Category}
                autoFocus
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
                id="email"
                label={"Latitude: " + placeInfo.Latitude}
                name="email"
                autoComplete="email"
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
                name="Key"
                label={"Longitude: " + placeInfo.Longitude}
                id="Key"
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
                name="Key"
                label={"City: " + placeInfo.City}
                id="Key"
                autoComplete="current-Key"
                onChange={e =>
                  setPlaceInfo({ ...placeInfo, City: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Grid item xs={12}>
            <br></br>
            <h6>Select your interests</h6>
          </Grid>
          <div className={classes2.root}>
            <FormControl className={classes2.formControl}>
              <InputLabel htmlFor="select-multiple-chip">Interests</InputLabel>
              <Select
                multiple
                value={interestsList}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes2.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes2.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, interestsList, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Update Place
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
