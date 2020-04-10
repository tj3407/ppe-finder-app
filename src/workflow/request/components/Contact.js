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
  const [contact, setContact] = React.useState({ name: "", email: "", phone: "" });

  const handleChange = event => {
    setContact({ ...contact, [event.target.name]: event.target.value });
    if (props.contact) {
      props.contact(contact);
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.input}>
        <TextField
          autoFocus
          fullWidth
          required
          name="name"
          label="Contact Name"
          variant="outlined"
          onChange={handleChange}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12} className={classes.input}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        onChange={handleChange}
        color="secondary"
      />
    </Grid>
    <Grid item xs={12} className={classes.input}>
      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        type="tel"
        variant="outlined"
        onChange={handleChange}
        color="secondary"
      />
    </Grid>
    </React.Fragment>
  );
}

export default React.memo(Contact);
