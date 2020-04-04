import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    textAlign: "center",
  },
  typography: {
    padding: theme.spacing(2),
  },
  modal: {
    maxWidth: "75%",
    position: "relative",
    margin: "auto",
    top: 40,
  },
  divider: {
    margin: theme.spacing(2),
    width: "100%",
  },
  button: {
    padding: theme.spacing(2),
  },
}));

const SelfVolunteer = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleConfirmClick = (event) => {
    setLoading(true);
    setTimeout(() => {
      props.onClose();
    }, 3000);
  };

  return (
    <Paper className={classes.modal}>
      <Grid container justify="center" className={classes.root}>
        <Typography variant="h6" className={classes.typography}>
          You're Awesome!
        </Typography>
        <Divider className={classes.divider} />
        <Typography paragraph>
          Thank you for your donation! Please click confirm below so that we may
          notify the party that the item(s) are on its way!
        </Typography>
        <Grid item xs={12} sm={4} className={classes.button}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleConfirmClick}
          >
            {loading ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.button}>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={props.onClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default React.memo(SelfVolunteer);
