import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
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

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [interestsList, setInterestsList] = React.useState([]);

  function handleChange(event) {
    setInterestsList(event.target.value);
    localStorage.setItem("interests", interestsList);
  }
  useEffect(() => {
    localStorage.setItem("interests", interestsList);
  });

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">Interests</InputLabel>
        <Select
          multiple
          value={interestsList}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
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
  );
}
