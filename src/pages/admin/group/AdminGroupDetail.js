import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Grid,
  Paper as MuiPaper,
  Divider,
  Card,
  CardContent,
  TextField,
  Box,
  Typography
} from "@material-ui/core";
import {
  Delete, Save
} from "@material-ui/icons";
import { green, red } from '@material-ui/core/colors';

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import { getAdminGroupDetail } from "../../../redux/actions/groupActions";
import Loader from "../../../components/Loader";
import AlertDialog from "../../../components/common/dialogs/AlertDialog";
import AddressDialog from "../../../components/common/dialogs/AddressDialog";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("기관명을 입력하세요"),
});

const useStyles = makeStyles((theme) => ({
  
  button: {
    marginRight: 10,
  },
}));

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);


const Group = ({ initialGroup }) => {

  const classes = useStyles();
  const [group, setGroup] = useState(initialGroup);
  const [showDialog, setShowDialog] = useState({
    delete: false
  })

  const updateGroup = (e) => {
    e.preventDefault();
  }

  return (
    <Card mb={6}>
      <AlertDialog 
        title={"해당 기관을 삭제 하시겠습니까?"}
        desc={"삭제 후 복원 불가능합니다"}
        open={showDialog.delete} 
        onClose={() => { setShowDialog({...showDialog, delete: false}) }} 
        onConfirm={() => { alert(1) }}
      />
      <CardContent>
        <Formik
          initialValues={initialGroup}
          validationSchema={validationSchema}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            touched,
            values,
            status,
          }) => (
            <form onSubmit={updateGroup}>
              <Box pb={5}>
                <Typography variant="h6" gutterBottom>
                  기관정보
                </Typography>
              </Box>
              <Grid container spacing={6} m={5}>
                <Grid item md={6}>
                  <TextField
                    name="name"
                    label="기관명"
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    name="tel"
                    label="연락처"
                    value={values.tel}
                    error={Boolean(touched.tel && errors.tel)}
                    fullWidth
                    helperText={touched.tel && errors.tel}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6} m={5}>
                <Grid item md={6}>
                  <TextField
                    //InputProps={{readOnly: true}}
                    name="address"
                    label="주소"
                    value={values.address}
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      console.log(e.target);
                    }}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                   // InputProps={{readOnly: true}}
                    name="addressSub"
                    label="상세주소"
                    value={values.addressSub}
                    error={Boolean(touched.addressSub && errors.addressSub)}
                    fullWidth
                    helperText={touched.addressSub && errors.addressSub}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                  
              </Grid>
              <Grid justify="space-between" container spacing={6} m={5}>
                <Grid item>
                  <AddressDialog onComplete={(data) => { console.log(data) }}/>
                </Grid>
              </Grid>
              <Grid container spacing={6} m={5}>
                <Grid item md={4}>
                  <TextField
                    name="contactName"
                    label="담당자명"
                    value={values.contactName}
                    error={Boolean(touched.contactName && errors.contactName)}
                    fullWidth
                    helperText={touched.contactName && errors.contactName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    name="name"
                    label="담당자 연락처"
                    value={values.contactTel}
                    error={Boolean(touched.contactTel && errors.contactTel)}
                    fullWidth
                    helperText={touched.contactTel && errors.contactTel}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    name="name"
                    label="담당자 이메일"
                    value={values.contactEmail}
                    error={Boolean(touched.contactEmail && errors.contactEmail)}
                    fullWidth
                    helperText={touched.contactEmail && errors.contactEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
              </Grid>
              {/* <Grid
                justify="space-between" // Add it here :)
                container 
                spacing={24}
              >
                <Grid item/>
                <Grid item>
                  <div>
                    <Button raised color="accent">
                      Login
                    </Button>
                  </div>
                </Grid>
              </Grid> */}
              <Grid justify="space-between" container spacing={6} m={5}>
                <Grid item>
                  <Button variant="contained"color="primary" size="large" className={classes.button}>
                    회차코드 관리
                  </Button>
                </Grid>
                <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<Save/>}
                >
                  저장
                </Button>
                <DeleteButton
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<Delete/>}
                  onClick={() => { setShowDialog({...showDialog, delete: true}) }}
                >
                  삭제
                </DeleteButton>
                </Grid>
              </Grid>
            
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

const GroupCode = () => {

  return (
    <Card mb={6}>
      <CardContent>


      </CardContent>

    </Card>

  )
  

}

const AdminGroupDetail = ({ match }) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, selected } = useSelector(state => state.groupReducer);

  useEffect(() => {
    const groupIdx = match.params.idx;
    dispatch(getAdminGroupDetail(groupIdx));
  }, []);
  
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {selected && <Group initialGroup={selected}/>}
        </Grid>

        {/* <Grid item xs={12} md={4}>
          {selected && <Group initialGroup={selected}/>}
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default AdminGroupDetail;
