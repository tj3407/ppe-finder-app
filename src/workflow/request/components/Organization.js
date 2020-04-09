import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CityField from "../../../components/fields/CityField";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const [orgValue, setOrgValue] = React.useState({});
  const [showOrgField, setShowOrgField] = React.useState(false);
  const [location, setLocation] = React.useState({ lat: null, lng: null });
  const loading = value && options.length === 0;
  const timer = React.useRef();

  React.useEffect(() => {
    if (!value) return;

    const data = async () => {
      const res = await fetch(
        // `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&location=${location.lat},${location.lng}&types=establishment&radius=50000&strictbounds&key=${process.env.REACT_APP_API_KEY}`,
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${value}&location=${location.lat},${location.lng}&type=hospital&radius=30000&key=${process.env.REACT_APP_API_KEY}`,
        { "Access-Control-Allow-Origin": "*" }
      );
      const json = await res.json();
      setOptions(json.results);
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
    if (Object.keys(orgValue).length) {
      props.org(orgValue);
    }
  }, [orgValue]);

  const handleChange = event => {
    const { value } = event.target;

    setValue(value);
  };

  const handleAutoCompleteChange = (event, value) => {
    if (!value) return;

    setOrgValue(value);
  };

  const handleSetLocation = (location) => {
    console.log(location)
    if (!Object.keys(location).length) {
      setShowOrgField(false);
    } else {
      setShowOrgField(true);
    }
    setLocation(location);
  };

  return (
    <React.Fragment>
      <CityField setLocation={handleSetLocation} classes={classes.cityField} sm={12} />

      {showOrgField && <Grid item xs={12} className={classes.input}>
        <Autocomplete
          id="autocomplete"
          freeSolo
          options={options}
          onChange={handleAutoCompleteChange}
          // getOptionLabel={option => option.structured_formatting.main_text}
          getOptionLabel={option => option.name}
          renderOption={option => (
            <React.Fragment>
              <Typography variant="body1">
                {/* {option.structured_formatting.main_text}{" "} */}
                {option.name}{" "}
                <small style={{ color: "gray" }}>
                  {/* {option.structured_formatting.secondary_text} */}
                  {option.vicinity}
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
              color="secondary"
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="secondary" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
            />
          )}
        />
      </Grid>}
    </React.Fragment>
  );
}

export default React.memo(Organization);
