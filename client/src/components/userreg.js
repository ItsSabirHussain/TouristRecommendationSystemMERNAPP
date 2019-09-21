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

const names = [
  "Air sports",
  "Archery",
  "Astronomy",
  "Backpacking",
  "BASE jumping",
  "Baseball",
  "Basketball",
  "Beekeeping",
  "Bird watching",
  "Blacksmithing",
  "BMX",
  "Board sports",
  "Bodybuilding",
  "Butterfly watching",
  "Camping",
  "Canoeing",
  "Canyoning",
  "Caving",
  "Composting",
  "Dowsing",
  "Driving",
  "Fishing",
  "Flag football",
  "Flower growing",
  "Flying",
  "Flying disc",
  "Foraging",
  "Freestyle football",
  "Gardening",
  "Geocaching",
  "Ghost hunting",
  "Gold prospecting",
  "Graffiti",
  "Handball",
  "Herbalism",
  "Herping",
  "High-power rocketry",
  "Hiking",
  "Hobby horsing",
  "Hooping",
  "Horseback riding",
  "Hunting",
  "Inline skating",
  "Jogging",
  "Kayaking",
  "Kite flying",
  "Kitesurfing",
  "Lacrosse",
  "LARPing",
  "Letterboxing",
  "Longboarding",
  "Martial arts",
  "Metal detecting",
  "Meteorology",
  "Motor sports",
  "Mountain biking",
  "Nordic skating",
  "Orienteering",
  "Paintball",
  "Parkour",
  "Photography",
  "Podcast hosting",
  "Polo",
  "Powerlifting",
  "Rugby",
  "Running",
  "Sailing",
  "Sand art",
  "Scouting",
  "Scuba diving",
  "Sculling or rowing",
  "Shooting",
  "Shopping",
  "Skateboarding",
  "Skiing",
  "Skimboarding",
  "Skydiving",
  "Slacklining",
  "Snowboarding",
  "Soccer",
  "Stone skipping",
  "Sun bathing",
  "Surfing",
  "Survivalism",
  "Swimming",
  "Taekwondo",
  "Tai chi",
  "Topiary",
  "Travel",
  "Urban exploration",
  "Vacation",
  "Vegetable farming",
  "Vehicle restoration",
  "Walking",
  " Water sports",
  "Rafting",
  "Rappelling",
  "Road biking",
  "Rock climbing",
  " Roller skating"
];

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

export default function UserReg(props) {
  const classes2 = useStyles2();
  const theme = useTheme();
  const [interestsList, setInterestsList] = React.useState([]);

  function handleChange(event) {
    setInterestsList(event.target.value);
  }

  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    Name: "",
    ID: "",
    Email: "",
    Key: "",
    Interests: []
  });

  const onClick = e => {
    e.preventDefault();
    console.log(interestsList);
    axios
      .post("/userreg", {
        FullName: userInfo.Name,
        ID: userInfo.ID,
        Email: userInfo.Email,
        Key: userInfo.Key,
        Interests: interestsList
      })
      .then(res => {
        props.history.push("/userdashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
                  setUserInfo({ ...userInfo, Name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label="ID"
                name="category"
                autoComplete="category"
                onChange={e => setUserInfo({ ...userInfo, ID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="latiude"
                label="Email"
                name="latitude"
                autoComplete="latitude"
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
                name="longitude"
                label="Key"
                type="text"
                id="longitude"
                autoComplete="current-Key"
                onChange={e =>
                  setUserInfo({ ...userInfo, Key: e.target.value })
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/userlogin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
