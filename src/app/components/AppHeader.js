import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography, AppBar } from "@material-ui/core";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f50057",
    padding: "20px 0 20px 10px",
  },
  h4: {
    fontWeight: "bold",
    // fontFamily: "Overlock SC, cursive",
    fontWeight: 500,
    marginLeft: 30,
    color: "white",
  },
  link: {
    textDecoration: "none !important",
  },
}));

function AppHeader() {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="secondary"
      variant="outlined"
      className={classes.root}
    >
      <Link href="/" className={classes.link}>
        <Typography variant="h5" className={classes.h4}>
          D<SupervisedUserCircleOutlinedIcon />
          NATE PPE
        </Typography>
      </Link>
    </AppBar>
  );
}

export default React.memo(AppHeader);
