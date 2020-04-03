import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider, Button, ButtonBase } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  card: {
    cursor: "pointer"
  },
  infoWindow: {
    padding: theme.spacing(2)
  },
  root: {
    margin: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2)
  },
  smBottomMargin: {
    marginBottom: 10
  },
  icon: {
    verticalAlign: "middle"
  },
  header: {
    alignItems: "normal"
  },
  main: {
    minHeight: 200
  },
  button: {
    maxHeight: 40
  }
}));

const CardContainer = props => {
  const classes = useStyles();
  const [isListPage, setIsListPage] = React.useState(false);
  const itemMapping = {
    n95: "N95 Face Mask",
    "face mask": "Face Mask",
    "face shield": "Face Shield",
    gloves: "Gloves",
    coverall: "Coveralls"
  };

  const orgName =
    (props.item.orgName &&
      props.item.orgName.structured_formatting &&
      props.item.orgName.structured_formatting.main_text) ||
    props.item.orgName ||
    "";
  const orgAddress =
    (props.item.orgAddress && props.item.orgAddress.formatted_address) ||
    props.item.orgAddress ||
    "";

  return (
    <Grid item xs={12} sm={12} className={classes.root}>
      <Card variant="outlined" onClick={props.handleInfoWindowClick} className={classes.card}>
        {/* <ButtonBase> */}
          <CardHeader
            className={classes.header}
            disableTypography
            title={<Typography paragraph>{orgName}</Typography>}
            subheader={<Typography variant="caption">{orgAddress}</Typography>}
          />
          {/* <Divider className={classes.divider} /> */}
          <CardContent>
            <Grid
              container
              justify="space-between"
              className={classes.smBottomMargin}
            >
              <Typography variant="caption">
                <BusinessIcon className={classes.icon} /> Department Name:
              </Typography>
              <Typography variant="caption">{props.item.department}</Typography>
            </Grid>
            {/* <Grid
              container
              justify="space-between"
              className={classes.smBottomMargin}
            >
              <Typography variant="caption">
                <BusinessIcon className={classes.icon} /> Building Name/Number:
              </Typography>
              <Typography variant="caption">{props.item.building}</Typography>
            </Grid> */}
            {/* <Grid
              container
              justify="space-between"
              className={classes.smBottomMargin}
            >
              <Typography variant="caption">
                <ContactPhoneIcon className={classes.icon} /> Contact Person:
              </Typography>
              <Typography variant="caption">{props.item.contact}</Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Grid container justify="center" className={classes.smBottomMargin}>
                <Typography variant="caption">
                  <EventNoteIcon className={classes.icon} />
                  Items Needed:
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.smBottomMargin}>
              <Grid container justify="space-between">
                {props.item.items &&
                  props.item.items.length &&
                  props.item.items.map(product => {
                    return (
                      <Typography key={product} variant="caption">
                        {itemMapping[product]}
                      </Typography>
                    );
                  })}
              </Grid>
            </Grid>
          </CardContent>
        {/* </ButtonBase> */}
        {/* <Divider className={classes.divider} /> */}
        <CardActions className={classes.button} id="iwc">
          {isListPage && <Button
            id="iwc"
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            onClick={props.onClick}
          >
            DONATE
          </Button>}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardContainer;
