import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import Main from "./main";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UpdateProfile from "./updateprofile";
import AddPlace from "./addplace";
import AllPlacesList from "./viewallleaves";
import UpdatePlace from "./updateplace";

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

export default function AdminDashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [adminInfo, setAdminInfo] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("adminTokken")) {
      setAdminInfo(localStorage.getItem("adminID"));
    } else {
      props.history.push("/adminlogin");
    }
  });

  const exit = e => {
    e.preventDefault();
    localStorage.removeItem("adminTokken");
    localStorage.removeItem("adminID");
    props.history.push("/adminlogin");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {"Admin Dashboard: " + adminInfo}
          </Typography>
          <IconButton onClick={exit} color="inherit">
            <Badge color="secondary">
              <ExitToAppIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button component={Link} to="/admindashboard">
              <ListItemIcon>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admindashboard/viewallplaces"
            >
              <ListItemIcon>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="View All Places" />
            </ListItem>
            <ListItem button component={Link} to="/admindashboard/addplace">
              <ListItemIcon>
                <PeopleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Add Place" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admindashboard/aupdateprofile"
            >
              <ListItemIcon>
                <NotificationImportantIcon fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Update Profile" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>

      <Switch>
        <Route exact path="/admindashboard" component={Main} />
        <Route
          exact
          path="/admindashboard/aupdateprofile"
          component={UpdateProfile}
        />
        <Route exact path="/admindashboard/addplace" component={AddPlace} />
        <Route
          exact
          path="/admindashboard/viewallplaces"
          component={AllPlacesList}
        />
        <Route
          exact
          path="/admindashboard/updateplace"
          component={UpdatePlace}
        />
      </Switch>
    </div>
  );
}
