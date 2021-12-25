import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';
import SidebarMenu from './SidebarMenu';
import { sidebarRoutes } from '../../routers';
const useStyles = makeStyles({
  root: {
    marginTop: 100
  },
  
})

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      style={{marginTop: 60}}
      sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {sidebarRoutes.map(({ header, name, path, children }, index) => (
        <SidebarMenu 
          key={index}
          header={header}
          name={name}
          path={path}
          children={children}
        />
      ))}
    </List>
  );
}