import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  input: {
    margin: theme.spacing(2),
  },
}));

function AddressField(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const loading = value && options.length === 0;

  const [location, setLocation] = React.useState({ lat: null, lng: null });
  const timer = React.useRef();

  React.useEffect(() => {
    if (!value) return;

    const data = async () => {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=address&key=${process.env.REACT_APP_API_KEY}`,
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

  const handleChange = (event) => {
    const { value } = event.target;
    
    if (props.setAddress) {
      props.setAddress(value);
    }
    setValue(value);
  };

  const handleAutoCompleteChange = async (event, value) => {
    if (!value) return;
    const { main_text = "", secondary_text = "" } = value.structured_formatting;
    
    if (props.setAddress) {
      props.setAddress(`${main_text} ${secondary_text}`);
    }
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

      if (props.setLocation) {
        props.setLocation(json.result.geometry.location);
      }
    }
  };

  return (
    <Autocomplete
      id="autocomplete"
      size="small"
      freeSolo
      options={options}
      onChange={handleAutoCompleteChange}
      getOptionLabel={(option) => option.description}
      renderOption={(option) => (
        <React.Fragment>
          <Typography variant="body1">
            {option.structured_formatting.main_text}{" "}
            <small style={{ color: "gray" }}>
              {option.structured_formatting.secondary_text}
            </small>
          </Typography>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          required
          fullWidth
          {...params}
          placeholder="Address"
          name="address"
          variant="outlined"
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
  );
}

export default AddressField;
