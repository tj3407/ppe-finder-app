import React, { Suspense } from "react";
import { Grid, Typography, Divider, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import RequestLayout from "../workflow/request/RequestLayout";
import DonateLayout from "../workflow/donate/DonateLayout";
import MainLayout from "../workflow/main/MainLayout";

const useStyles = makeStyles(theme => ({
  h4: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Merienda, cursive",
    padding: 10
  }
}));

function AppLayout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify="flex-start">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography variant="h4" className={classes.h4}>
            Donate PPE
          </Typography>
        </Link>
      </Grid>
      <Divider style={{ width: "100%" }} />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default React.memo(AppLayout);
