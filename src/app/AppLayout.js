import React, { Suspense } from "react";
import { Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter, Route } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import AppHeader from "./components/AppHeader";

const RequestLayout = React.lazy(() => import("../workflow/request/RequestLayout"));
const DonateLayout = React.lazy(() => import("../workflow/donate/DonateLayout"));
const MainLayout = React.lazy(() => import("../workflow/main/MainLayout"));
const DonateToOrgPage = React.lazy(() => import("../workflow/donate/components/DonateToOrgPage"));

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#f50057"
  },
  h4: {
    fontWeight: "bold",
    fontFamily: "Overlock SC, cursive",
    padding: 10,
    color: "white"
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
      <AppHeader />
      <Divider style={{ width: "100%" }} />
      <HashRouter basename="/">
        <Suspense fallback={<Grid item xs={12} className={classes.loader}><CircularProgress color="secondary" className={classes.progress} /></Grid>}>
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
      </HashRouter>
    </React.Fragment>
  );
}

export default React.memo(AppLayout);
