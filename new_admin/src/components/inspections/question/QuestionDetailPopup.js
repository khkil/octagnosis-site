import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import { Cancel, Close, Save } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FETCH_QUESTION_DETAIL } from '../../../modules/question';

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const QuestionDetailPopup = ({ showDetailPopup, setShowDetailPopup }) => {
  const { loading, questionDetail } = useSelector(({ loading, question }) => ({
    loading: loading[FETCH_QUESTION_DETAIL] === undefined || Boolean(loading[FETCH_QUESTION_DETAIL]),
    questionDetail: question.selected,
  }));

  const handleClose = () => {
    setShowDetailPopup(false);
  };

  const { questionIdx, questionNumber, questionText } = questionDetail;

  if (loading) return null;

  return (
    <Dialog maxWidth="xl" aria-labelledby="customized-dialog-title" open={showDetailPopup}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography variant="h6">{`${questionNumber}. ${questionText}`}</Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>{JSON.stringify(questionDetail)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" size="large" startIcon={<Save />} onClick={handleClose}>
          저장
        </Button>
        <Button color="error" variant="contained" size="large" startIcon={<Cancel />} onClick={handleClose}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDetailPopup;
