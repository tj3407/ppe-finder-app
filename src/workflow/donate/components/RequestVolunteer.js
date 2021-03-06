import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
  MenuItem,
  CircularProgress,
  Button
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AddressField from "../../../components/fields/AddressField";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import { db } from "../../../components/firebase/firebase";
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
    margin: "auto",
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
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold",
  },
  paddingRight: {
    paddingRight: theme.spacing(2),
  },
  alignLeft: {
    textAlign: "left",
  },
}));

function RequestVolunteer(props) {
  const classes = useStyles();

  const orgName =
    (props.orgDetails.orgName &&
      props.orgDetails.orgName.structured_formatting &&
      props.orgDetails.orgName.structured_formatting.main_text) ||
    (props.orgDetails.orgName && props.orgDetails.orgName.name) ||
    props.orgDetails.orgName ||
    "";

  const orgAddress =
    (props.orgDetails.orgAddress &&
      props.orgDetails.orgAddress.formatted_address) ||
    props.orgDetails.orgAddress ||
    "";
  const hourArray = Array.from(Array(12).keys());
  const minuteArray = ["00", "15", "30", "45"];
  const [time, setTime] = React.useState({
    hour: "",
    minute: "",
    timeLabel: "AM",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [fields, setFields] = React.useState({
    date: "",
    pickupTime: "",
    address: "",
    addressNotes: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "date") {
      setFields({ ...fields, date: value });
    } else if (name === "addressNotes") {
      setFields({ ...fields, addressNotes: value });
    } else {
      setTime({ ...time, [name]: value });
    }
  };

  const parseFields = () => {
    const pickupTime = `${time.hour}:${time.minute} ${time.timeLabel}`;
    return { ...fields, pickupTime };
  }

  const handleConfirmClick = (event) => {
    const data = {
      type: "request-volunteer",
      items: props.itemsToDonate,
      orgInfo: props.orgDetails,
      form: parseFields(),
      uid: new Date().getTime()
    }

    db.collection("donations")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          window.location = "/";
        }, 500);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    setLoading(true);
    setTimeout(() => {
      props.onClose();
    }, 3000);
  };

  const handleSetAddress = (value) => {
    setFields({ ...fields, address: value });
  }

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
            Request Volunteer Pickup
          </Typography>
          <Typography variant="body1" className={classes.bold}>
            {orgName}
          </Typography>
          <Typography variant="body1" className={classes.italic}>
            <RoomOutlinedIcon color="secondary" className={classes.icon} />
            {orgAddress}
          </Typography>
          <Typography variant="body1" className={classes.italic}>
            Department: {props.orgDetails.department}
          </Typography>
          <Typography variant="body1" className={classes.italic}>
            Building: {props.orgDetails.building}
          </Typography>
          <Typography variant="body1" className={classes.italic}>
            C/O: {props.orgDetails.contact}
          </Typography>
          <Divider className={classes.divider} />
          <Typography paragraph color="secondary">
            Pickup Details
          </Typography>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={3} className={classes.alignLeft}>
              <Typography paragraph display="inline" color="secondary">
                Ready Date:{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                name="date"
                fullWidth
                type="date"
                variant="outlined"
                size="small"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <DateRangeIcon
                      position="start"
                      className={classes.paddingRight}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={3} className={classes.alignLeft}>
              <Typography paragraph display="inline" color="secondary">
                Ready Time:{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container justify="flex-start">
                <Grid item className={classes.paddingRight}>
                  <TextField
                    select
                    name="hour"
                    variant="outlined"
                    size="small"
                    value={time.hour}
                    onChange={handleChange}
                  >
                    {hourArray.map((num, index) => {
                      return (
                        <MenuItem key={index} value={(num + 1).toString()}>
                          {num + 1}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item className={classes.paddingRight}>
                  <TextField
                    select
                    name="minute"
                    variant="outlined"
                    size="small"
                    value={time.minute}
                    onChange={handleChange}
                  >
                    {minuteArray.map((num, index) => {
                      return (
                        <MenuItem key={index} value={num}>
                          {num}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item></Grid>
                <TextField
                  select
                  name="timeLabel"
                  variant="outlined"
                  size="small"
                  value={time.timeLabel}
                  onChange={handleChange}
                >
                  {["AM", "PM"].map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={3} className={classes.alignLeft}>
              <Typography
                paragraph
                display="inline"
                color="secondary"
                align="left"
              >
                Pickup Address:{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <AddressField setAddress={handleSetAddress} />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={3} className={classes.alignLeft}>
              <Typography
                paragraph
                display="inline"
                color="secondary"
                align="left"
              >
                Pickup Notes:{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                name="addressNotes"
                type="text"
                variant="outlined"
                size="small"
                placeholder="(Front Door, Side Door, Porch, etc...)"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography paragraph>
            Donating the following items:
          </Typography>
          <Grid container justify="space-between">
            {props.itemsToDonate.length &&
              props.itemsToDonate.map((item) => {
                return (
                  <Grid item key={item} className={classes.items}>
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
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ) : null;
}

export default React.memo(RequestVolunteer);
