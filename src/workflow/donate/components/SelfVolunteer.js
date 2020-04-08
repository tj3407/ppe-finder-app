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
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
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
    maxWidth: 640,
    position: "relative",
    margin: theme.spacing(2),
    margin: "auto",
    textAlign: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    textAlign: "left",
    margin: "auto",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  italic: {
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
  }
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

  const orgName =
    (props.orgDetails.orgName &&
      props.orgDetails.orgName.structured_formatting &&
      props.orgDetails.orgName.structured_formatting.main_text) ||
    props.orgDetails.orgName ||
    "";

  const orgAddress =
    (props.orgDetails.orgAddress &&
      props.orgDetails.orgAddress.formatted_address) ||
    props.orgDetails.orgAddress ||
    "";

  return props.show ? (
    <Paper className={classes.modal} variant="outlined">
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
            Confirm Drop Off To
          </Typography>
          <Typography variant="body1" className={classes.bold}>{orgName}</Typography>
          <Typography variant="body1" className={classes.italic}><RoomOutlinedIcon color="secondary" className={classes.icon} />{orgAddress}</Typography>
          <Typography variant="body1" className={classes.italic}>Department: {props.orgDetails.department}</Typography>
          <Typography variant="body1" className={classes.italic}>Building: {props.orgDetails.building}</Typography>
          <Typography variant="body1" className={classes.italic}>C/O: {props.orgDetails.contact}</Typography>
          <Divider className={classes.divider} />
          <Typography paragraph display="inline">
            Click <Typography variant="caption" color="secondary" display="inline">CONFIRM</Typography> to notify the requesting party that the item(s) below
            are on their way!
          </Typography>
          {props.itemsToDonate.length &&
            props.itemsToDonate.map((item) => {
              return (
                <Grid item xs={12} sm={4} key={item} className={classes.items}>
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
          <Typography paragraph display="inline">
            Thank you for your donation.{" "}
          </Typography>
          <Typography paragraph color="secondary" display="inline">
            You're awesome!
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
  ) : null;
});

export default React.memo(SelfVolunteer);
