import React, { useState }from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader, Divider } from '@mui/material';
import {  ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

const SidebarMenu = ({ header, name, path, children }) => {

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <>
      {header &&
        <ListSubheader component="div" id="nested-list-subheader">
          {header}
        </ListSubheader>
      }
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}

export default SidebarMenu;