import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Link } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    textAlign: "center"
  },
  icon: {
    verticalAlign: "middle",
    marginRight: 20
  },
}));

function AppFooter() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Link href="https://devpost.com/software/donate-ppe" >
          <InfoOutlinedIcon color="secondary" className={classes.icon} />
          <Typography variant="body1" display="inline">
            Project submitted as part of #BuildforCOVID19 Global Online
            Hackathon
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}

export default React.memo(AppFooter);
