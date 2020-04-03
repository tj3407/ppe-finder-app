import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
  divider: {
    margin: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2),
    fontStyle: "italic"
  },
  card: {
    padding: theme.spacing(2)
  },
  icon: {
    verticalAlign: "middle"
  }
}));

function DonateToOrgPage(props) {
  const classes = useStyles();
  const [orgDetails, setOrgDetails] = React.useState({});
  const [state, setState] = React.useState({
    n95: false,
    "face mask": false,
    "face shield": false,
    gloves: false,
    coverall: false
  });
  const itemMapping = {
    n95: "N95 Face Mask",
    "face mask": "Face Mask",
    "face shield": "Face Shield",
    gloves: "Gloves",
    coverall: "Coveralls"
  };

  React.useEffect(() => {
    console.log(props.location.state)
    setOrgDetails(props.location.state);
  }, []);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (orgDetails && Object.keys(orgDetails).length) ? (
    <Grid container justify="center" className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          disableTypography
          title={
            <Typography variant="h6">
              <LocalHospitalIcon className={classes.icon} />{" "}
              {(orgDetails.orgName && orgDetails.orgName.structured_formatting && orgDetails.orgName.structured_formatting.main_text) || orgDetails.orgName || ""}
            </Typography>
          }
        />
        <Divider className={classes.divider} />
        <CardContent>
          <Grid container justify="space-between">
            <Grid item xs={12} className={classes.title}>
              <Typography variant="body1">Recipient:</Typography>
            </Grid>
            <div>
              <Typography variant="body1">
                {(orgDetails.orgAddress && orgDetails.orgAddress.formatted_address) || orgDetails.orgAddress || ""}
              </Typography>
              <Typography variant="body1">C/O: {orgDetails.contact}</Typography>
              <Typography variant="body1">
                Department: {orgDetails.department}
              </Typography>
              <Typography variant="body1">
                Building: {orgDetails.building}
              </Typography>
            </div>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container justify="space-between">
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.title}>
                I am donating the following:
              </Typography>
            </Grid>
            {orgDetails.items.map(item => {
              return (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={state[item]}
                      onChange={handleChange}
                      name={item}
                    />
                  }
                  label={itemMapping[item]}
                />
              );
            })}
          </Grid>
        </CardContent>
        <Divider className={classes.divider} />
        <CardActions>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              I can bring it in
            </Button>
            <Button fullWidth variant="contained" color="secondary">
              Request a Volunteer Courier
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  ) : null;
}

export default React.memo(withRouter(DonateToOrgPage));
