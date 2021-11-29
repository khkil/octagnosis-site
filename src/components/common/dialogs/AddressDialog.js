import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Box, DialogContentText, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloseIcon } from '@material-ui/data-grid';
import DaumPostcode from "react-daum-postcode";


const useStyles = makeStyles((theme) => ({
 
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const AddressDialog = ({ onComplete }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <Box>
      <Button variant="contained" color="default" size="small" className={classes.button} onClick={handleClickOpen}>
        주소찾기
      </Button>
      <Dialog open={open} fullWidth maxWidth={"xl"} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle >
          <Typography variant="h4" component="div">주소 찾기</Typography>
          <IconButton aria-label="close" className={classes.closeBtn} onClick={handleClose} children={<CloseIcon />} />
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            주소를 검색하신 후 클릭 해주세요.
          </DialogContentText>
          <DaumPostcode onComplete={onComplete} onClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AddressDialog;