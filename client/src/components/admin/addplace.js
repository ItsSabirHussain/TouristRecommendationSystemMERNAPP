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
import { useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import PlaceIcon from "@material-ui/icons/Place";

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

const names = ["Hotel", "GYM", "Beauty", "Shopping", "Dinning", "Education"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        Intelligent Tourist Guide{" "}
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
  const classes2 = useStyles2();
  const theme = useTheme();
  const [interestsList, setInterestsList] = React.useState([]);

  function handleChange(event) {
    setInterestsList(event.target.value);
  }

  const classes = useStyles();
  const [placeInfo, setPlaceInfo] = useState({
    Name: "",
    Category: "",
    Latitude: "",
    Longitude: "",
    City: "",
    Tags: []
  });

  const onClick = e => {
    e.preventDefault();
    console.log(interestsList);
    axios
      .post("/addplace", {
        Name: placeInfo.Name,
        Category: placeInfo.Category,
        Latitude: placeInfo.Latitude,
        Longitude: placeInfo.Longitude,
        City: placeInfo.City,
        Tags: interestsList
      })
      .then(res => {
        props.history.push("/admindashboard/viewallplaces");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <br></br>
      <br></br>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PlaceIcon />
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
              <div className={classes2.root}>
                <FormControl className={classes2.formControl}>
                  <InputLabel htmlFor="select-multiple-chip">
                    Interests
                  </InputLabel>
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
