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
  const [cityOptions, setCityOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [cityValue, setCityValue] = React.useState("");
  const [orgValue, setOrgValue] = React.useState({});
  const [showOrgField, setShowOrgField] = React.useState(false);
  const [location, setLocation] = React.useState({ lat: null, lng: null });
  const timer = React.useRef();

  React.useEffect(() => {
    if (!value) return;

    const data = async () => {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&location=${location.lat},${location.lng}&types=establishment&radius=50000&strictbounds&key=${process.env.REACT_APP_API_KEY}`,
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

    if (props.org && !Object.keys(orgValue).length) {
      props.org(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (!cityValue) return;

    const data = async () => {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityValue}&types=(cities)&key=${process.env.REACT_APP_API_KEY}`,
        { "Access-Control-Allow-Origin": "*" }
      );
      const json = await res.json();
      setCityOptions(json.predictions);
    };

    clearTimeout(timer.current);
    const delay = setTimeout(() => {
      data();
    }, 300);
    timer.current = delay;
  }, [cityValue]);

  React.useEffect(() => {
    if (Object.keys(orgValue).length) {
      props.org(orgValue);
    }
  }, [orgValue]);

  const handleChange = event => {
    const { value, name } = event.target;
    if (name === "city") {
      setCityValue(value);
    } else {
      setValue(value);
    }
  };

  const handleAutoCompleteChange = (event, value) => {
    if (!value) return;

    setOrgValue(value);
  };

  const handleCityAutoCompleteChange = async (event, value) => {
    if (!value) {
      setShowOrgField(false);
      return
    };

    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${value.place_id}&fields=geometry&key=${process.env.REACT_APP_API_KEY}`
    );
    const json = await res.json();

    if (
      json &&
      json.result &&
      json.result.geometry &&
      json.result.geometry.location
    ) {
      setLocation(json.result.geometry.location);
    }

    setShowOrgField(true);
  };

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.input}>
        <Autocomplete
          id="autocomplete"
          freeSolo
          options={cityOptions}
          onChange={handleCityAutoCompleteChange}
          getOptionLabel={option => option.description}
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
              autoFocus
              required
              fullWidth
              {...params}
              label="Search City"
              name="city"
              variant="outlined"
              onChange={handleChange}
            />
          )}
        />
      </Grid>

      {showOrgField && <Grid item xs={12} className={classes.input}>
        <Autocomplete
          id="autocomplete"
          freeSolo
          options={options}
          onChange={handleAutoCompleteChange}
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
              autoFocus
              {...params}
              label="Search Workplace"
              name="organization"
              variant="outlined"
              onChange={handleChange}
            />
          )}
        />
      </Grid>}
    </React.Fragment>
  );
}

export default React.memo(Organization);
