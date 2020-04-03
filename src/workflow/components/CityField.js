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
  },
  textField: {
    backgroundColor: "white",
    marginTop: 60
  }
}));

function CityField(props) {
  const classes = useStyles();
  const [cityOptions, setCityOptions] = React.useState([]);
  const [cityValue, setCityValue] = React.useState("");

  const [location, setLocation] = React.useState({ lat: null, lng: null });
  const timer = React.useRef();

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

  const handleChange = event => {
    const { value } = event.target;

    setCityValue(value);
  };

  const handleCityAutoCompleteChange = async (event, value) => {
    if (!value) return;

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
    <React.Fragment>
        <Grid item xs={12} sm={8} className={classes.input}>
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
                        className={classes.textField}
                        placeholder="Search City"
                        name="city"
                        variant="outlined"
                        onChange={handleChange}
                    />
                )}
            />
        </Grid>
    </React.Fragment>
  );
}

export default CityField;
