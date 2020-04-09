import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2)
  }
}));

function Contact(props) {
  const classes = useStyles();

  const handleChange = event => {
    if (props.contact) {
      props.contact(event.target.value);
    }
  };

  return (
    <Grid item xs={12} className={classes.input}>
      <TextField
        autoFocus
        fullWidth
        required
        label="Contact Name"
        variant="outlined"
        onChange={handleChange}
        color="secondary"
      />
    </Grid>
  );
}

export default React.memo(Contact);
