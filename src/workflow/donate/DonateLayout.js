import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../components/firebase/firebase";
import { Grid, Paper, Typography, Divider, Button } from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    minHeight: 380
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
    marginBottom: 10
  },
  main: {
    minHeight: 200
  },
  button: {
    maxHeight: 40
  }
}));

function DonateLayout() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  const itemMapping = {
    n95: "N95 Face Mask",
    "face mask": "Face Mask",
    "face shield": "Face Shield",
    gloves: "Gloves",
    coverall: "Coveralls"
  };

  React.useEffect(() => {
    const fetchData = () =>
      db
        .collection("request")
        .get()
        .then(val => {
          const data = val.docs.map(doc => doc.data());
          setData(data);
        });

    fetchData();
  }, []);

  return (
    <Grid container justify="center">
      {data.length
        ? data.map((item, index) => {
            return (
              <Grid key={`${item}-${index}`} item xs={12} sm={5} className={classes.root}>
              <Paper variant="outlined" className={classes.paper}>
                <Grid container className={classes.header}>
                  <Typography variant="h6">{item.orgName}</Typography>
                </Grid>
                <Divider className={classes.divider} />
                <div className={classes.main}>
                    <Grid container justify="space-between" className={classes.smBottomMargin}>
                    <Typography variant="body1"><BusinessIcon className={classes.icon} /> Department Name:</Typography>
                    <Typography variant="body1">{item.department}</Typography>
                    </Grid>
                    <Grid container justify="space-between" className={classes.smBottomMargin}>
                    <Typography variant="body1"><BusinessIcon className={classes.icon} /> Building Name/Number:</Typography>
                    <Typography variant="body1">{item.building}</Typography>
                    </Grid>
                    <Grid container justify="space-between" className={classes.smBottomMargin}>
                    <Typography variant="body1"><ContactPhoneIcon className={classes.icon} /> Contact Person:</Typography>
                    <Typography variant="body1">{item.contact}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container justify="center" className={classes.smBottomMargin}>
                        <Typography variant="body1"><EventNoteIcon className={classes.icon} />Items Needed:</Typography>
                    </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.smBottomMargin}>
                    <Grid container justify="space-between">
                        {item.items &&
                        item.items.length &&
                        item.items.map(product => {
                            return (
                            <Typography key={product} variant="body1">
                                {itemMapping[product]}
                            </Typography>
                            );
                        })}
                    </Grid>
                    </Grid>
                </div>
                <Divider className={classes.divider} />
                <div className={classes.button}>
                    <Button fullWidth disableElevation variant="contained" color="primary">
                        DONATE
                    </Button>
                </div>
              </Paper>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
}

export default React.memo(DonateLayout);
