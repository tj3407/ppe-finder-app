import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import GroupIcon from "@material-ui/icons/Group";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(2)
    }
  },
  button: {
    width: 250,
    padding: 20,
    fontSize: 20
  },
  h4: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Merienda, cursive"
  }
}));

const MainLayout = props => {
  const classes = useStyles();
  const frontliners =
    "Request to get Personal Protective Equipment delivered to your place of work for you and your colleagues.";
  const citizens =
    "Donate Personal Protective Equipment to the places that need it most. Select from the list that is closest to your location for a faster turnaround.";

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} md={4}>
        <CardItem
          title="FRONTLINERS"
          description={frontliners}
          color="primary"
          {...props}
        >
          Request
        </CardItem>
      </Grid>
      <Grid item xs={12} md={4}>
        <CardItem
          title="CITIZENS"
          color="secondary"
          description={citizens}
          {...props}
        >
          Donate
        </CardItem>
      </Grid>
      <Grid item xs={12} md={8} style={{ textAlign: "justify" }}>
        <Typography variant="body1" color="inherit">
          During this time of need, it is more important than ever to support
          the brave people who are in the frontline in the fight against
          COVID-19. This site was developed to leverage the power of
          volunteerism and community. We believe that people do care and are
          willing to help others in uncertain times so we created a platform for
          citizens or organizations to donate the necessary supplies that are
          needed to help protect the people that are directly fighting this
          global pandemic. Together we can beat this!
        </Typography>
      </Grid>
    </Grid>
  );
};

const CardItem = props => {
  const handleClick = event => {
    const { name } = event.currentTarget;
    if (name === "CITIZENS") {
      props.history.push("/donate");
    } else {
      props.history.push("/request");
    }
  };
  return (
    <Card style={{ height: 240, padding: 20 }} variant="outlined">
      <CardContent style={{ height: 160 }}>
        {props.title === "FRONTLINERS" ? <LocalHospitalIcon /> : <GroupIcon />}
        <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
          {props.title}
        </Typography>
        <Typography variant="body2" style={{ textAlign: "left" }}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <Button
            disableElevation
            variant="contained"
            name={props.title}
            onClick={handleClick}
            color={props.color}
          >
            {props.children}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default React.memo(MainLayout);
