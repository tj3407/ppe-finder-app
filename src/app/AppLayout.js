import React, { Suspense } from "react";
import { Grid, Typography, Divider, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

const RequestLayout = React.lazy(() => import("../workflow/request/RequestLayout"));
const DonateLayout = React.lazy(() => import("../workflow/donate/DonateLayout"));
const MainLayout = React.lazy(() => import("../workflow/main/MainLayout"));
const DonateToOrgPage = React.lazy(() => import("../workflow/donate/components/DonateToOrgPage"));

const useStyles = makeStyles(theme => ({
  h4: {
    fontWeight: "bold",
    fontFamily: "Overlock SC, cursive",
    padding: 10
  },
  link: {
    textDecoration: "none !important"
  },
  loader: {
    textAlign: "center",
    height: "100%"
  },
  progress: {
    marginTop: 250
  }
}));

function AppLayout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify="flex-start">
        <Link href="/" className={classes.link}>
          <Typography variant="h4" className={classes.h4}>
            D<SupervisedUserCircleOutlinedIcon />nate PPE
          </Typography>
        </Link>
      </Grid>
      <Divider style={{ width: "100%" }} />
      <BrowserRouter>
        <Suspense fallback={<Grid item xs={12} className={classes.loader}><CircularProgress className={classes.progress} /></Grid>}>
          <Route
            exacts
            exact
            path="/"
            component={props => <MainLayout {...props} />}
          />
          <Route
            exacts
            exact
            path="/request"
            component={() => <RequestLayout />}
          />
          <Route
            exacts
            exact
            path="/donate"
            component={() => <DonateLayout />}
          />
          <Route
            exacts
            exact
            path="/donate/org"
            component={() => <DonateToOrgPage />}
          />
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default React.memo(AppLayout);
