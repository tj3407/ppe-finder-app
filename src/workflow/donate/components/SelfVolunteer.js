import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import { labelMapping } from "../../../metadata/mappings";

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
    backgroundColor: "#f50057",
  },
  button: {
    padding: theme.spacing(2),
  },
  icon: {
    verticalAlign: "middle",
    marginRight: 10,
  },
  items: {
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
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
        <IconButton onClick={props.onClose} className={classes.closeButton}>
          <CloseIcon color="secondary" />
        </IconButton>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.typography}
          >
            You're Awesome!
          </Typography>
          <Divider className={classes.divider} />
          <Typography paragraph color="secondary">
            Click confirm to notify the requesting party that the item(s) below
            are on their way!
          </Typography>
          {props.itemsToDonate.length &&
            props.itemsToDonate.map((item) => {
              return (
                <Grid item xs={12} key={item} className={classes.items}>
                  <CheckBoxOutlinedIcon
                    color="secondary"
                    className={classes.icon}
                  />
                  <Typography paragraph display="inline" color="secondary">
                    {labelMapping[item]}
                  </Typography>
                </Grid>
              );
            })}
          <Typography paragraph color="secondary">
            Thank you for your donation!{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.button}>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={handleConfirmClick}
          >
            {loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              "Confirm"
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default React.memo(SelfVolunteer);
