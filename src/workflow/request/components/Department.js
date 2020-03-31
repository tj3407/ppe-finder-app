import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2)
  },
  field: {
    marginBottom: theme.spacing(2)
  }
}));

function Department(props) {
  const classes = useStyles();

  const handleChange = event => {
    const { value, name } = event.target;

    if (props.department && name === "department") {
        props.department(value);
    }
    if (props.building && name === "building") {
        props.building(value)
    }
  }

  return (
    <Grid className={classes.input}>
      <TextField
        required
        autoFocus
        className={classes.field}
        name="department"
        variant="outlined" 
        fullWidth 
        label="Department Name"
        onChange={handleChange}
      />
      <TextField
        className={classes.field}
        name="building"
        variant="outlined" 
        fullWidth 
        label="Building Number/Name (Optional)"
        onChange={handleChange}
      />
    </Grid>
  );
}

export default React.memo(Department);
