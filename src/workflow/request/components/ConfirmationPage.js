import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";
import { labelMapping } from "../../../metadata/mappings";

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(2)
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20
  },
  items: {
    display: "flex",
    justifyContent: "space-around"
  },
  prod: {
    marginLeft: 10
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: 20
  }
}));

function ConfirmationPage(props) {
  const classes = useStyles();

  const mapping = {
    items: "Items Requested",
    orgName: "Organization Name",
    department: "Department Name",
    building: "Building Name/Number",
    contact: "Contact Person",
    orgAddress: "Organization Address"
  };

  return (
    <Grid item xs={12} className={classes.input}>
        {Object.keys(props.form).map(key => {
          if (key === "items") {
            return (
              <React.Fragment key={key}>
                <Paper variant="outlined" className={classes.paper}>
                <Grid container justify="space-between">
                  <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <Typography variant="body1">{mapping[key]}:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                        {props.form[key].map(item => {
                        return (
                            <Grid item xs={12} key={item} style={{ textAlign: "right" }}>
                                <Typography
                                key={item}
                                variant="body1"
                                className={classes.prod}
                                >
                                {labelMapping[item]}{" "}
                                </Typography>
                            </Grid>
                        );
                        })}
                  </Grid>
                </Grid>
                </Paper>
              </React.Fragment>
            );
          }

          if (key === "orgName") {
            // const value = (props.form[key] && props.form[key].structured_formatting && props.form[key].structured_formatting.main_text) || props.form[key] || "";
            const value = (props.form[key] && props.form[key].name) || props.form[key] || "";
            return (
                <React.Fragment key={key}>
                  <Paper variant="outlined" className={classes.paper}>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                        <Typography variant="body1">{mapping[key]}:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                        <Typography variant="body1">{value}</Typography>
                    </Grid>
                  </Grid>
                  </Paper>
                </React.Fragment>
              );
          }

          if (key === "orgAddress") {
            const value = (props.form[key] && props.form[key].formatted_address) || props.form[key] || ""
            return (
                <React.Fragment key={key}>
                  <Paper variant="outlined" className={classes.paper}>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                        <Typography variant="body1">{mapping[key]}:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                        <Typography variant="body1">{value}</Typography>
                    </Grid>
                  </Grid>
                  </Paper>
                </React.Fragment>
              );
          }

          return (
            <React.Fragment key={key}>
              <Paper variant="outlined" className={classes.paper}>
              <Grid container justify="space-between">
                <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <Typography variant="body1">{mapping[key]}:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                    <Typography variant="body1">{props.form[key]}</Typography>
                </Grid>
              </Grid>
              </Paper>
            </React.Fragment>
          );
        })}
    </Grid>
  );
}

export default React.memo(ConfirmationPage);
