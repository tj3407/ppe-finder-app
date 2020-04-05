import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Divider, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { labelMapping } from "../../../metadata/mappings";
import Modal from "@material-ui/core/Modal";
import SelfVolunteer from "./SelfVolunteer";
import RequestVolunteer from "./RequestVolunteer";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    maxWidth: 640,
    margin: "auto"
  },
  divider: {
    margin: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontStyle: "italic",
  },
  card: {
    padding: theme.spacing(2),
  },
  icon: {
    verticalAlign: "middle",
  },
  popper: {
    position: "absolute",
    top: "50%",
  },
  modal: {
    margin: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DonateToOrgPage(props) {
  const classes = useStyles();
  const [orgDetails, setOrgDetails] = React.useState({});
  const [state, setState] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [clickedBtn, setClickedBtn] = React.useState("");

  React.useEffect(() => {
    setOrgDetails(props.location.state);
  }, []);

  const handleChange = (event) => {
    const index = state.indexOf(event.target.name);

    if (event.target.checked && index === -1) {
      setState([...state, event.target.name]);
    } else if (!event.target.checked && index > -1) {
      state.splice(index, 1);
      const modifiedArr = state;
      setState([...modifiedArr]);
    }
  };

  const handleClick = (name) => (event) => {
    if (name === "self-volunteer") {
      setClickedBtn("self-volunteer");
    } else {
      setClickedBtn("third-party");
    }

    setOpen(true);
  };

  const handleClose = () => {
    setClickedBtn("");
    setOpen(false);
  };

  return orgDetails && Object.keys(orgDetails).length ? (
    <Grid container justify="center" className={classes.root}>
      <Dialog fullScreen onClose={handleClose} open={open} TransitionComponent={Transition} style={{ backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
        <>
          <SelfVolunteer
            show={clickedBtn === "self-volunteer"}
            orgDetails={orgDetails}
            onClose={handleClose}
            itemsToDonate={state}
          />
          <RequestVolunteer
            show={clickedBtn === "third-party"}
            orgDetails={orgDetails}
            onClose={handleClose}
            itemsToDonate={state}
          />
        </>
      </Dialog>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          disableTypography
          title={
            <Typography variant="h6" color="secondary">
              <LocalHospitalIcon color="secondary" className={classes.icon} />{" "}
              {(orgDetails.orgName &&
                orgDetails.orgName.structured_formatting &&
                orgDetails.orgName.structured_formatting.main_text) ||
                orgDetails.orgName ||
                ""}
            </Typography>
          }
        />
        <Divider className={classes.divider} />
        <CardContent>
          <Grid container justify="space-between">
            <Grid item xs={12} className={classes.title}>
              <Typography variant="body1" color="secondary">Recipient:</Typography>
            </Grid>
            <div>
              <Typography variant="body1">
                {(orgDetails.orgAddress &&
                  orgDetails.orgAddress.formatted_address) ||
                  orgDetails.orgAddress ||
                  ""}
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
              <Typography variant="body1" className={classes.title} color="secondary">
                I am donating the following:
              </Typography>
            </Grid>
            {orgDetails.items.map((item) => {
              return (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      // checked={state[item]}
                      onChange={handleChange}
                      name={item}
                    />
                  }
                  label={labelMapping[item]}
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
              disableElevation
              disabled={state.length === 0}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClick("self-volunteer")}
            >
              I can bring it in
            </Button>
            <Button
              fullWidth
              disableElevation
              disabled={state.length === 0}
              variant="contained"
              color="secondary"
              onClick={handleClick("third-party")}
            >
              Request a Volunteer Courier
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  ) : null;
}

export default React.memo(withRouter(DonateToOrgPage));
