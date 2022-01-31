import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';
import SidebarMenu from './SidebarMenu';
import { sidebarRoutes } from '../../routers';
const useStyles = makeStyles({
  root: {
  },
  
})

const Sidebar = () =>  {
  const classes = useStyles();
 
  return (
    <List
      style={{height: "100%", background: "#27313e", color: "#e1dada", position: "fixed", marginTop: "-8px"}}
      sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {sidebarRoutes.map(({ header, name, path, children, icon }, index) => (
        <SidebarMenu 
          key={index}
          header={header}
          name={name}
          path={path}
          children={children}
          icon={icon}
        />
      ))}
    </List>
  );
}

export default Sidebar;