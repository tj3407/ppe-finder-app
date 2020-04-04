import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../components/firebase/firebase";
import { Grid } from "@material-ui/core";

import MapLayout from "../components/MapLayout";
import CityField from "../components/CityField";

const useStyles = makeStyles((theme) => ({
  cityField: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "75%",
  },
}));

function DonateLayout(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState({
    lat: 37.354107,
    lng: -121.955238,
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

  return (
    <Grid container justify="center">
      <MapLayout data={data} cityLocation={location} {...props} />
      <CityField setLocation={handleSetLocation} classes={classes.cityField} />
    </Grid>
  );
}

export default React.memo(withRouter(DonateLayout));
