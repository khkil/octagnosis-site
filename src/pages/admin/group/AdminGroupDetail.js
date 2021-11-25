import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
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
  TextField
 
} from "@material-ui/core";

import { green, orange } from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import { getAdminGroupDetail } from "../../../redux/actions/groupActions";

const Paper = styled(MuiPaper)(spacing);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("기관명을 입력하세요"),
});

const AdminGroupDetail = ({ match }) => {
  
  const dispatch = useDispatch();
  const { selected } = useSelector(state => state.groupReducer);
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const groupIdx = match.params.idx;
    dispatch(getAdminGroupDetail(groupIdx));
  }, []);

  
  if(!selected) return null;
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
        <Grid item>
          <Button variant="contained" color="primary">
            <AddIcon />
            기관 추가
          </Button>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Card mb={6}>
        <CardContent>
          <Formik
            initialValues={selected}
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
              <form onSubmit={handleSubmit}>
                {JSON.stringify(selected)}
                {JSON.stringify(touched)}
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
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
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
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} m={5}>
                  <Grid item md={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    수정
                  </Button>
                  </Grid>
                </Grid>
              
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default AdminGroupDetail;
