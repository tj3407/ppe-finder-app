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
import landing from "../../images/hand-landing.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(2),
      marginTop: theme.spacing(6),
    },
  },
  button: {
    width: 250,
    padding: 20,
    fontSize: 20,
  },
  h4: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Merienda, cursive",
  },
  description: {
    textAlign: "justify",
    color: "white",
    backgroundColor: "#f50057",
    padding: theme.spacing(8),
    margin: "0px",
  },
  landing: {
    width: "100%",
    minHeight: 500,
    margin: 0,
    marginTop: 0,
    backgroundImage: `url(${landing})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  card: {
    height: 240,
    padding: 20,
    border: "0px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.34)",
    width: "100%",
  },
  header: {
    color: "white",
    fontWeight: 800,
    marginTop: 40,
    fontSize: "2.95rem",
  },
  desc: {
    minHeight: 120,
    cursor: "pointer",
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const frontliners =
    "Request to get Personal Protective Equipment delivered to your place of work for you and your colleagues.";
  const citizens =
    "Donate Personal Protective Equipment to the places that need it most. Select from the list that is closest to your location for a faster turnaround.";

  const handleClick = (name) => (event) => {
    switch (name) {
      case "donate":
        props.history.push("/donate");
        break;
      case "request":
        props.history.push("/request");
        break;
      case "learn":
        props.history.push("/learn");
        break;
      default:
        props.history.push("/volunteer");
        break;
    }
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid container justify="center" className={classes.landing}>
        <Grid container className={classes.overlay}>
          <Grid item xs={12} sm={8} style={{ padding: "40px 0 0 40px" }}>
            <Typography variant="h2" align="left" className={classes.header}>
              WE CAN BEAT THIS TOGETHER
            </Typography>
            <Typography paragraph style={{ color: "white", textAlign: "left", padding: "20px 20px 0 0" }}>
              Health care workers and first responders need our help more than
              ever. They have always been there during our time of need. Let us return the
              favor and try to get them the protection they need in order to fight
              this pandemic.
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: 40, textAlign: "left" }}>
            <Button
              size="large"
              onClick={handleClick("donate")}
              color="secondary"
              disableElevation
              variant="contained"
              style={{ width: 250, height: 50, fontWeight: "800", marginBottom: 40 }}
            >
              GIVE NOW
            </Button>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}
      </Grid>
      <Grid container style={{ margin: 0, marginTop: 0 }}>
        <Grid
          item
          xs={12}
          sm={4}
          className={classes.desc}
          style={{ paddingTop: 40, backgroundColor: "purple" }}
          onClick={handleClick("request")}
        >
          <Typography
            variant="h5"
            align="center"
            display="inline"
            style={{ fontWeight: 800, color: "white" }}
          >
            REQUEST
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          className={classes.desc}
          style={{ paddingTop: 40, backgroundColor: "#f50057" }}
          onClick={handleClick("donate")}
        >
          <Typography
            variant="h5"
            align="center"
            display="inline"
            style={{ fontWeight: 800, color: "white" }}
          >
            DONATE
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          className={classes.desc}
          style={{ paddingTop: 40, backgroundColor: "skyblue" }}
          onClick={handleClick("volunteer")}
        >
          <Typography
            variant="h5"
            align="center"
            display="inline"
            style={{ fontWeight: 800, color: "white" }}
          >
            VOLUNTEER
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.description}>
        <Typography variant="subtitle1" color="inherit">
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

const CardItem = (props) => {
  const classes = useStyles();
  const handleClick = (event) => {
    const { name } = event.currentTarget;
    if (name === "CITIZENS") {
      props.history.push("/donate");
    } else {
      props.history.push("/request");
    }
  };
  return (
    <Card variant="outlined" className={classes.card}>
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
            size="large"
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
