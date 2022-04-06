import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';
import SidebarMenu from './SidebarMenu';
import { sidebarRoutes } from '../../routers';
import { Box, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const drawerWidth = 240;
  const { menuReducer } = useSelector(({ menu }) => ({
    menuReducer: menu,
  }));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          height: '1500px',
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: 'auto',
          background: '#27313e',
          color: '#e1dada',
          height: '100%',
        }}
      >
        {sidebarRoutes.map(({ header, name, path, children, icon }, index) => (
          <SidebarMenu
            key={index}
            header={header}
            name={name}
            path={path}
            children={children}
            icon={icon}
            menuReducer={menuReducer}
          />
        ))}
      </Box>
    </Drawer>
  );
};
export default Sidebar;
