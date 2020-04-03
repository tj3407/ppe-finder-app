import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../components/firebase/firebase";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MapLayout from "../components/MapLayout";
import SearchIcon from "@material-ui/icons/Search";
import CityField from "../components/CityField";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2)
  },
  paper: {
    minHeight: 450
  },
  divider: {
    margin: theme.spacing(2)
  },
  smBottomMargin: {
    marginBottom: 10
  },
  icon: {
    verticalAlign: "middle"
  },
  header: {
    minHeight: 90,
    alignItems: "normal"
  },
  main: {
    minHeight: 200
  },
  button: {
    maxHeight: 40
  },
  input: {
    backgroundColor: "white",
    marginTop: 60
    // position: "absolute",
    // bottom: 200,
    // width: "100%"
  },
  cityField: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "75%"
  }
}));

function DonateLayout(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState({
    lat: 37.354107,
    lng: -121.955238
  });

  const itemMapping = {
    n95: "N95 Face Mask",
    "face mask": "Face Mask",
    "face shield": "Face Shield",
    gloves: "Gloves",
    coverall: "Coveralls"
  };

  React.useEffect(() => {
    const fetchData = () =>
      db
        .collection("request")
        .get()
        .then(val => {
          const data = val.docs.map(doc => doc.data());
          setData(data);
        });

    fetchData();
  }, []);

  const handleClick = item => {
    props.history.push({
      pathname: "/donate/org",
      state: item
    });
  };

  const handleSetLocation = location => {
    setLocation(location);
  };

  return (
    <Grid container justify="center">
      <MapLayout data={data} cityLocation={location} {...props} />
      <CityField setLocation={handleSetLocation} classes={classes.cityField} />
      {/* <Grid item xs={12} sm={8} className={classes.root}>
        <Grid container justify="center">
          <TextField
            fullWidth
            placeholder="Enter City"
            variant="outlined"
            className={classes.input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid> */}
      {/* </Grid> */}
      {/* {data.length
        ? data.map((item, index) => {
            const orgName = (item.orgName && item.orgName.structured_formatting && item.orgName.structured_formatting.main_text) || item.orgName || "";
            const orgAddress = (item.orgAddress && item.orgAddress.formatted_address) || item.orgAddress || "";
            return (
              <Grid key={`${item}-${index}`} item xs={12} sm={5} className={classes.root}>
              <Card variant="outlined" className={classes.paper}>
                  <CardHeader
                    className={classes.header}
                    disableTypography
                    title={<Typography variant="h6">{orgName}</Typography>}
                    subheader={<Typography variant="body2">{orgAddress}</Typography>}
                  />
                <Divider className={classes.divider} />
                <CardContent >
                    <Grid container justify="space-between" className={classes.smBottomMargin}>
                    <Typography variant="body1"><BusinessIcon className={classes.icon} /> Department Name:</Typography>
                    <Typography variant="body1">{item.department}</Typography>
                    </Grid>
                    <Grid container justify="space-between" className={classes.smBottomMargin}>
                    <Typography variant="body1"><BusinessIcon className={classes.icon} /> Building Name/Number:</Typography>
                    <Typography variant="body1">{item.building}</Typography>
                    </Grid>
                    <Grid container justify="space-between" className={classes.smBottomMargin}>
                    <Typography variant="body1"><ContactPhoneIcon className={classes.icon} /> Contact Person:</Typography>
                    <Typography variant="body1">{item.contact}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container justify="center" className={classes.smBottomMargin}>
                        <Typography variant="body1"><EventNoteIcon className={classes.icon} />Items Needed:</Typography>
                    </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.smBottomMargin}>
                    <Grid container justify="space-between">
                        {item.items &&
                        item.items.length &&
                        item.items.map(product => {
                            return (
                            <Typography key={product} variant="body1">
                                {itemMapping[product]}
                            </Typography>
                            );
                        })}
                    </Grid>
                    </Grid>
                </CardContent>
                <Divider className={classes.divider} />
                <CardActions className={classes.button}>
                    <Button fullWidth disableElevation variant="contained" color="primary" onClick={() => handleClick(item)}>
                        DONATE
                    </Button>
                </CardActions>
              </Card>
              </Grid>
            );
          })
        : null} */}
    </Grid>
  );
}

export default React.memo(withRouter(DonateLayout));
