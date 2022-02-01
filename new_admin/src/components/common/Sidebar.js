import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { makeStyles } from "@mui/styles";
import SidebarMenu from "./SidebarMenu";
import { sidebarRoutes } from "../../routers";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
const useStyles = makeStyles({
  root: {},
});

const Sidebar = () => {
  const classes = useStyles();
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List
          //style={{height: "100%", background: "#27313e", color: "#e1dada", position: "fixed", marginTop: "-8px"}}
          //sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {sidebarRoutes.map(
            ({ header, name, path, children, icon }, index) => (
              <SidebarMenu
                key={index}
                header={header}
                name={name}
                path={path}
                children={children}
                icon={icon}
              />
            )
          )}
        </List>
        {/* <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
