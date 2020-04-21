import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Paper } from "@material-ui/core";
import PPEItems from "./components/PPEItems";
import Organization from "./components/Organization";
import Department from "./components/Department";
import Contact from "./components/Contact";
import ConfirmationPage from "./components/ConfirmationPage";
import { db } from "../../components/firebase/firebase";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2)
    },
    margin: "auto",
    maxWidth: 640
  },
  input: {
    margin: theme.spacing(2)
  },
  h4: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Merienda, cursive"
  },
  "MuiStepIcon-active": {
    color: "#f50057"
  }
}));

function getSteps() {
  return ['Items', 'Location', 'Details', 'Contact'];
}

function RequestLayout() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = React.useState("ppe");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [valueChange, setValueChange] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const form = React.useRef({
    items: [],
    orgName: null,
    orgAddress: null,
    department: "",
    building: "",
    contact: "",
    email: "",
    phone: ""
  });

  const mapping = {
    0: "ppe",
    1: "organization",
    2: "department",
    3: "contact",
    4: "confirmation"
  };

  React.useEffect(() => {
    setCurrentPage(mapping[count]);
  }, [count]);

  React.useEffect(() => {
    let disabled;

    switch (currentPage) {
      case "ppe":
        disabled = !form.current.items.length;
        break;
      case "organization":
        disabled = !form.current.orgName;
        break;
      case "department":
        disabled = !form.current.department;
        break;
      case "contact":
        disabled = !form.current.contact;
        break;
      default:
        break;
    }

    setIsDisabled(disabled);
  }, [valueChange]);

  const getItems = ({ items }) => {
    form.current.items = items;
    setValueChange(!valueChange);
  };

  const getOrgName = value => {
    form.current.orgName = value;
    if (value.place_id) {
      getOrgAddress(value.place_id);
    }
    setValueChange(!valueChange);
  };

  const getOrgAddress = async id => {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,geometry&key=${process.env.REACT_APP_API_KEY}`
    );
    const json = await res.json();
    form.current.orgAddress = json.result;
  };

  const getDepartment = value => {
    form.current.department = value;
    setValueChange(!valueChange);
  };

  const getBuilding = value => {
    form.current.building = value;
  };

  const getContact = value => {
    const { name, email, phone } = value;
    form.current.contact = name;
    form.current.email = email;
    form.current.phone = phone;
    setValueChange(!valueChange);
  };

  const handleNext = event => {
    if (count !== Object.keys(mapping).length - 1) {
      setCount(count + 1);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if (currentPage !== "contact") {
        setIsDisabled(true);
      }
    }
  };

  const handleSubmit = () => {
    const data = {
      ...form.current,
      uid: new Date().getTime()
    };

    db.collection("request")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = { color: "#f50057" };
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Alert severity="success">
          Thank you for your service! Your request for the items have been
          added.
        </Alert>
      </Snackbar>
      {currentPage === "ppe" && (
        <Grid container justify="center">
          <PPEItems items={getItems} />
        </Grid>
      )}
      <Grid item xs={12}>
        {currentPage === "organization" && <Organization org={getOrgName} />}
        {currentPage === "department" && (
          <Department department={getDepartment} building={getBuilding} />
        )}
        {currentPage === "contact" && <Contact contact={getContact} />}
        {currentPage === "confirmation" && (
          <ConfirmationPage form={form.current} onSubmit={handleSubmit} />
        )}
        <Grid container alignContent="space-around">
          <Grid item xs={12} style={{ marginRight: 16, marginLeft: 16 }}>
            <Button
              fullWidth
              disableElevation
              size="large"
              disabled={isDisabled || success}
              color="secondary"
              variant="contained"
              onClick={
                currentPage !== "confirmation" ? handleNext : handleSubmit
              }
              disableElevation
            >
              {currentPage !== "confirmation" ? "Next" : "Request"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(RequestLayout);
