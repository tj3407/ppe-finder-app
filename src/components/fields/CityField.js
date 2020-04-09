import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  },
  textField: {
    backgroundColor: "white",
    marginTop: 60
  }
}));

function CityField(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cityOptions, setCityOptions] = React.useState([]);
  const [cityValue, setCityValue] = React.useState("");
  const loading = open && cityOptions.length === 0;

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

  React.useEffect(() => {
    if (!open) {
      setCityOptions([]);
    }
  }, [open]);

  const handleChange = event => {
    const { value } = event.target;

    if (!value) {
      setCityOptions([]);
      return;
    }

    setCityValue(value);
  };

  const handleCityAutoCompleteChange = async (event, value) => {
    if (!value) {
      if (props.setLocation) {
        props.setLocation({});
      }
      return;
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

      if (props.setLocation) {
        props.setLocation(json.result.geometry.location);
      }
    }
  };

  return (
    <div className={props.classes}>
        <Grid item xs={12} sm={props.sm} className={classes.input}>
            <Autocomplete
                id="autocomplete"
                loading={loading}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
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
                        color="secondary"
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
        </Grid>
    </div>
  );
}

export default CityField;
