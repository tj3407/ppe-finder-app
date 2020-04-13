import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../components/firebase/firebase";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import MapLayout from "./MapLayout";
import CityField from "../../components/fields/CityField";

const useStyles = makeStyles((theme) => ({
  cityField: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  map: {
    margin: "auto",
    marginBottom: 100
  },
  item: {
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    verticalAlign: "middle"
  },
  paper: {
    padding: "0 20px",
    cursor: "pointer",
    maxHeight: 640,
    overflowY: "auto"
  },
}));

function DonateLayout(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState({
    lat: 37.3337,
    lng: -121.8907,
  });

  React.useEffect(() => {
    const fetchData = () =>
      db
        .collection("request")
        .get()
        .then((val) => {
          const data = val.docs.map((doc) => doc.data());
          setData(data);
        });

    fetchData();
  }, []);

  const handleSetLocation = (location) => {
    setLocation(location);
  };

  const handleClick = item => event => {
    props.history.push({
      pathname: "/donate/org",
      state: item
    });
  }

  return (
    <Grid container justify="center" className={classes.map}>
      {data.length > 0 && <>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid item xs={12} style={{ padding: "20px 0 0 20px"}}>
              <Typography paragraph style={{ marginBottom: 0, fontWeight: 700 }}>Search City</Typography>
            </Grid>
            <Grid item xs={12} className={classes.citySearch}>
              <CityField setLocation={handleSetLocation} />
            </Grid>
            <Grid className={classes.paper}>
              {data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item className={classes.item} onClick={handleClick(item)}>
                        <Typography variant="body1">
                          {item.orgName?.structured_formatting?.main_text || item.orgName?.name}
                        </Typography>
                        <Typography variant="caption">
                          <LocationOnOutlinedIcon className={classes.icon} color="secondary" />
                          {item.orgAddress?.formatted_address}
                        </Typography>
                    </Grid>
                    <Divider />
                  </React.Fragment>
                )
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MapLayout data={data} cityLocation={location} {...props} />
          </Grid>
        </Grid>
      </>}
    </Grid>
  );
}

export default React.memo(withRouter(DonateLayout));
