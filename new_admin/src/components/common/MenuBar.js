import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { Box, Breadcrumbs, Divider, Grid, Typography } from '@mui/material';
import { commonLayoutRoutes } from '../../routers';

const MenuBar = ({ match }) => {
  const [menuInfo, setMenuInfo] = useState({});

  useEffect(() => {
    commonLayoutRoutes.forEach(route => {
      const { name, path, children } = route;

      if (children) {
        children.forEach(child => {
          const fullName = `${name} / ${child.name}`;
          const fullPath = path + child.path;
          if (fullPath === match.path) {
            setMenuInfo({
              name: fullName,
            });
          }
        });
      } else {
        if (path === match.path) {
          setMenuInfo({
            name: name,
          });
          return;
        }
      }
    });
  }, []);

  return (
    <>
      <Grid item>
        <Typography variant="h5">{menuInfo.name}</Typography>
        {/*     <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Typography>1</Typography>
          <Typography>2</Typography>
          <Typography>3</Typography>
        </Breadcrumbs> */}
      </Grid>
      <Box mb={2} mt={2}>
        {/* <Divider /> */}
      </Box>
    </>
  );
};

export default MenuBar;
