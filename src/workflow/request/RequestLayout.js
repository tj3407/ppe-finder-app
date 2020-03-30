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
  }
}));

function RequestLayout() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = React.useState("ppe");
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const form = React.useRef({
    items: [],
    orgName: null,
    orgAddress: null,
    department: "",
    building: "",
    contact: ""
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

  const getItems = ({ items }) => {
    form.current.items = items;
  };

  const getOrgName = value => {
    form.current.orgName = value;
    if (value.place_id) {
      getOrgAddress(value.place_id);
    }
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
  };

  const getBuilding = value => {
    form.current.building = value;
  };

  const getContact = value => {
    form.current.contact = value;
  };

  const handleNext = event => {
    if (count !== Object.keys(mapping).length - 1) {
      setCount(count + 1);
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
      <Typography variant="h6" style={{ textAlign: "left", paddingLeft: 20 }}>
        Request for PPE
      </Typography>
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
              size="large"
              disabled={success}
              color="primary"
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
