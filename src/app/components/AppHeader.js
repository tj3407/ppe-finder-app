import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography, AppBar } from "@material-ui/core";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f50057",
  },
  h4: {
    fontWeight: "bold",
    fontFamily: "Overlock SC, cursive",
    padding: 10,
    color: "white",
  },
  link: {
    textDecoration: "none !important",
  },
}));

function AppHeader() {
  const classes = useStyles();
  return (
    <Grid container justify="flex-start" className={classes.root}>
      <AppBar position="static" color="secondary" variant="outlined">
        <Link href="/ppe-finder-app" className={classes.link}>
          <Typography variant="h4" className={classes.h4}>
            D<SupervisedUserCircleOutlinedIcon />
            nate PPE
          </Typography>
        </Link>
      </AppBar>
    </Grid>
  );
}

export default React.memo(AppHeader);
