import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Grid, Button } from "@material-ui/core";
import CardContainer from "./components/CardContainer";

const useStyles = makeStyles((theme) => ({
  map: {
    margin: "auto",
  },
  infoWindow: {
    padding: theme.spacing(2),
  },
  root: {
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2),
  },
  smBottomMargin: {
    marginBottom: 10,
  },
  icon: {
    verticalAlign: "middle",
  },
  header: {
    alignItems: "normal",
  },
  main: {
    minHeight: 200,
  },
  button: {
    maxHeight: 40,
  },
}));

function MapLayout(props) {
  const classes = useStyles();
  const [position, setPosition] = React.useState({
    lat: 37.354107,
    lng: -121.955238,
  });
  const [state, setState] = React.useState({ showWindow: false, marker: {} });

  React.useEffect(() => {
    if (props.cityLocation) {
      setPosition(props.cityLocation);
    }
  }, [props.cityLocation]);

  const handleClick = (props, marker, e) => {
    setState({ showWindow: true, marker });
  };

  const handleOnClose = (e) => {
    setState({ showWindow: false, marker: {} });
  };

  const handleInfoWindowClick = () => {
    props.history.push({
      pathname: "/donate/org",
      state: state.marker,
    });
  };

  const onInfoWindowOpen = (props, e) => {
    const button = (
      <Button
        id="iwc"
        fullWidth
        disableElevation
        variant="contained"
        color="secondary"
        onClick={handleInfoWindowClick}
      >
        DONATE
      </Button>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("iwc")
    );
  };

  return (
    <Map
      google={props.google}
      zoom={10}
      className={classes.map}
      center={position}
      containerStyle={{
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      {props.data.map((item) => {
        const orgName =
          (item.orgName &&
            item.orgName.structured_formatting &&
            item.orgName.structured_formatting.main_text) ||
          item.orgName ||
          "";
        const position =
          (item.orgAddress &&
            item.orgAddress.geometry &&
            item.orgAddress.geometry.location) ||
          "";

        if (!orgName || !position) return;

        return (
          <Marker
            key={item.uid}
            name={orgName}
            position={position}
            onClick={handleClick}
            {...item}
          />
        );
      })}
      <InfoWindow
        visible={state.showWindow}
        marker={state.marker}
        onClose={handleOnClose}
        onOpen={(e) => {
          onInfoWindowOpen(props, e);
        }}
        className={classes.infoWindow}
      >
        <CardContainer
          item={state.marker}
          handleInfoWindowClick={() => handleInfoWindowClick()}
          {...props}
        />
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(React.memo(MapLayout));
