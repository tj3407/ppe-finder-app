import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(2)
    }
  },
  input: {
    margin: theme.spacing(2)
  }
}));

function Organization(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [location, setLocation] = React.useState({lat: null, long: null});
  const timer = React.useRef();

  React.useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, [])

  React.useEffect(() => {
    if (!value) return;

    const data = async () => {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&location=${location.lat},${location.long}&types=establishment&radius=50000&key=${process.env.REACT_APP_API_KEY}`,
        { "Access-Control-Allow-Origin": "*" }
      );
      const json = await res.json();
      setOptions(json.predictions);
    };

    clearTimeout(timer.current);
    const delay = setTimeout(() => {
      data();
    }, 300);
    timer.current = delay;
  }, [value]);

  const showPosition = (position) => {
    setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude
    })
  }

  const handleChange = event => {
    const { value } = event.target;

    setValue(value);
  };

  const handleAutoCompletChange = (event, value) => {
    if (props.org) {
        props.org(value);
    }
  }

  return (
    <Grid item xs={12} className={classes.input}>
      <Autocomplete
        id="autocomplete"
        freeSolo
        options={options}
        onChange={handleAutoCompletChange}
        getOptionLabel={option => option.structured_formatting.main_text}
        renderOption={option => (
          <React.Fragment>
            <Typography variant="body1">
              {option.structured_formatting.main_text}{" "}
              <small style={{ color: "gray" }}>
                {option.structured_formatting.secondary_text}
              </small>
            </Typography>
          </React.Fragment>
        )}
        renderInput={params => (
          <TextField
            required
            fullWidth
            {...params}
            label="Organization"
            variant="outlined"
            onChange={handleChange}
          />
        )}
      />
    </Grid>
  );
}

export default React.memo(Organization);
