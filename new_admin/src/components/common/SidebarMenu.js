import React, { useState, useMemo, useEffect }from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader, Divider } from '@mui/material';
import {  ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom';

const SidebarMenu = ({ header, name, path, children, icon }) => {



  const { pathname } = useLocation();
  const history = useHistory();

  const isActived = useMemo((path) => (path === pathname), [pathname]);

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  }

  const goPage = (path) => {
    history.push(path);
  }

  useEffect(() => {
    
  }, [])
  
  return (
    <>
      {header &&
        <ListSubheader component="div" id="nested-list-subheader" style={{background: "#405064", color: "#c7c7c7"}}>
          {header}
        </ListSubheader>
      }
      <ListItemButton onClick={handleClick} style={{background: "#344152"}}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => { goPage(child.path) }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={child.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}

export default SidebarMenu;