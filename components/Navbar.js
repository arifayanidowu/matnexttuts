import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Drawer, Button, Avatar, Icon, Tooltip } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Fade from "@material-ui/core/Fade";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import NProgress from "nprogress";
import axios from "axios";
import { handleLogOut } from "../lib/auth";
import SidebarNavList from "./SidebarNavList";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    textTransform: "uppercase",
    textDecoration: "none",
    color: theme.palette.text,
    fontSize: theme.spacing(2.5),
    // display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      display: "block"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  avatar: {
    margin: 10
  },
  smallAvatar: {
    width: "20px",
    height: "20px"
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Navbar = ({ id, name, avatar }) => {
  const classes = useStyles();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    auth: false
  });

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (id) {
      setState(prevState => ({ ...prevState, auth: true }));
    } else {
      setState(prevState => ({ ...prevState, auth: false }));
    }
  }, [state.auth]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const isActive = path => {
    return router.pathname === path;
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const signOut = async () => {
    await axios.get("/api/auth/signout");
    handleLogOut();
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div className={classes.flex}>
        <Avatar
          alt={name}
          src={avatar}
          className={classes.avatar}
          style={{ marginLeft: "-75px" }}
        />
        <Typography
          variant="h5"
          component="h1"
          style={{ padding: "20px", marginLeft: "-15px" }}
        >
          <span style={{ textDecoration: "capitalize" }}>
            {name.charAt(0).toUpperCase() + name.substring(1)}
          </span>
        </Typography>
      </div>
      <Divider light />
      <SidebarNavList />
    </div>
  );
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {state.auth && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link href="/">
            <a
            // className={classes.title}
            // style={{
            //   color: isActive("/") ? "#009688" : "#fff",
            //   fontWeight: "700"
            // }}
            >
              RS Library
            </a>
          </Link>

          <div className={classes.grow} />
          <div>
            {state.auth && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            )}
            {!state.auth && (
              <>
                <Button
                  color={isActive("/signup") ? "secondary" : "inherit"}
                  onClick={() => router.push("/signup")}
                  style={{ fontWeight: "700" }}
                >
                  Signup
                </Button>
                <Button
                  color={isActive("/login") ? "secondary" : "inherit"}
                  onClick={() => router.push("/login")}
                  style={{ fontWeight: "700" }}
                >
                  Login
                </Button>
              </>
            )}
          </div>

          {state.auth && (
            <>
              <div>
                <IconButton
                  aria-label="show 3 new collections"
                  color="inherit"
                  onClick={() => router.push(`/bookcollections?id=${id}`)}
                >
                  <Badge badgeContent={3} color="secondary">
                    <Icon className="fas fa-shopping-bag" />
                  </Badge>
                </IconButton>
              </div>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="Avatar" onClick={handleClick}>
                  <Avatar src={avatar} className={classes.avatar} alt={name} />{" "}
                </IconButton>

                <Menu
                  id="fade-menu-desktop"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => router.push(`/profile?id=${id}`)}>
                    Profile
                  </MenuItem>

                  <MenuItem onClick={() => router.push(`/account?id=${id}`)}>
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.push(`/bookcollections?id=${id}`)}
                  >
                    My Collections
                  </MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-haspopup="true"
                  aria-controls={mobileMenuId}
                  onClick={handleClick}
                >
                  <MoreIcon />
                </IconButton>

                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => router.replace(`/profile?id=${id}`)}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.replace(`/account?id=${id}`)}>
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.replace(`/bookcollections?id=${id}`)}
                  >
                    My Collections
                  </MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {state.auth && (
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {sideList("left")}
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
