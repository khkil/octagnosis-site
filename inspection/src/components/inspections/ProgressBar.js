import React, { memo, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import Timer from '../questions/Timer';

const ProgressBar = memo(({ inspectionName, totalPage, page }) => {

  const currentProgress = useMemo(() => (100 / totalPage * (page - 1) ), [page]);
  const overallProgress = useMemo(() => 100 - currentProgress, [currentProgress]);

  return (
    <>
      <Timer/>
      <Grid className="progress">
        <p className="txt">{inspectionName}</p>
        <Grid className="bar-wrap">
          <Grid className="bar" style={{ marginRight: `${overallProgress}%` }}/>
          <Grid className="value" style={{ marginLeft: `${currentProgress}%` }}>
            {`${currentProgress}%`}
          </Grid>
        </Grid>
      </Grid>
    </>
      
  )
});

export default ProgressBar;