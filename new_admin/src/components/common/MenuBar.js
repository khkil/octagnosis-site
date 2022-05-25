import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { Box, Breadcrumbs, Divider, Grid, Typography } from '@mui/material';
import { commonLayoutRoutes } from '../../routers';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  menuName: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
}));

const MenuBar = ({ match, thirdText }) => {
  const classes = useStyles();
  const [menuInfo, setMenuInfo] = useState({});

  console.log(match.path);
  console.log(commonLayoutRoutes);
  useEffect(() => {
    commonLayoutRoutes.forEach(route => {
      const { name, path, children } = route;

      if (children) {
        children.forEach(child => {
          const fullPath = path + child.path;
          if (fullPath === match.path) {
            setMenuInfo({
              route: route,
              name: child.name,
            });
          }
        });
      } else {
        if (path === match.path) {
          setMenuInfo({
            route: route,
            name: name,
          });
          return;
        }
      }
    });
  }, []);

  if (!menuInfo.route) return null;
  return (
    <Box pb={2}>
      <p className={classes.menuName}>{menuInfo.name}</p>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="Breadcrumb" separator="›">
          <Typography>{menuInfo.route.name}</Typography>
          <Typography>{menuInfo.name}</Typography>
          {thirdText && <Typography>{thirdText}</Typography>}
        </Breadcrumbs>
      </Grid>
      <Box mb={2} mt={2}>
        <Divider />
      </Box>
    </Box>
  );
};

export default MenuBar;
