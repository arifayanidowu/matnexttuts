import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CollectionsIcon from "@material-ui/icons/Collections";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import Router, { useRouter } from "next/router";
import { fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  //   flex: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     flexDirection: "column",
  //     width: "100%"
  //   },
  bottomPosition: {
    position: "absolute",
    bottom: "0",
    color: fade(theme.palette.common.black, 0.7),
    display: "inline-block",
    margin: "10px 20px"
  }
}));

export default function SidebarNavList() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      <>
        <List>
          <ListItem button onClick={() => router.replace("/")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Add Books" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Book Collections" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Permissions" />
          </ListItem>
        </List>
      </>
      <span className={classes.bottomPosition}>
        &copy; {new Date().getFullYear()}, Copyright, RSLIBRARY
      </span>
    </div>
  );
}
