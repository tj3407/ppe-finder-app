import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "../stylesheet/request.scss";
import n95 from "../../../images/n95-mask.png";
import faceMask from "../../../images/face-mask.jpg";
import faceShield from "../../../images/face-shield.jpeg";
import gloves from "../../../images/gloves.jpg";
import coverall from "../../../images/coverall.jpeg";


const useStyles = makeStyles(theme => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
    cursor: "pointer",
    display: "inline-block",
    padding: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  clicked: {
    border: "solid 2px green",
    width: 200,
    margin: theme.spacing(2),
    cursor: "pointer",
    display: "inline-block",
    padding: theme.spacing(2)
  }
}));

function PPEItems(props) {
  const classes = useStyles();
  const items = React.useRef([]);
  const [color, setColor] = React.useState({
    n95: "action",
    faceMask: "action",
    faceShield: "action",
    gloves: "action",
    coverall: "action"
  });

  const handleClick = name => {
    if (!items.current.includes(name)) {
      items.current.push(name);
    }
    const index = items.current.indexOf(name);
    switch (name) {
      case "n95":
        setColor({
          ...color,
          n95: color["n95"] === "action" ? "primary" : "action"
        });
        if (color["n95"] !== "action" && items.current.includes(name)) {
          items.current.splice(index, 1);
        }
        break;
      case "face mask":
        setColor({
          ...color,
          faceMask: color["faceMask"] === "action" ? "primary" : "action"
        });
        if (color["faceMask"] !== "action" && items.current.includes(name)) {
          items.current.splice(index, 1);
        }
        break;
      case "face shield":
        setColor({
          ...color,
          faceShield: color["faceShield"] === "action" ? "primary" : "action"
        });
        if (color["faceShield"] !== "action" && items.current.includes(name)) {
          items.current.splice(index, 1);
        }
        break;
      case "gloves":
        setColor({
          ...color,
          gloves: color["gloves"] === "action" ? "primary" : "action"
        });
        if (color["gloves"] !== "action" && items.current.includes(name)) {
          items.current.splice(index, 1);
        }
        break;
      case "coverall":
        setColor({
          ...color,
          coverall: color["coverall"] === "action" ? "primary" : "action"
        });
        if (color["coverall"] !== "action" && items.current.includes(name)) {
          items.current.splice(index, 1);
        }
        break;
      default:
        break;
    }

    if (props.items) {
      props.items({ items: items.current });
    }
  };

  return (
    <React.Fragment>
      <Card variant="outlined" className={color["n95"] === "action" ? classes.card : classes.clicked} onClick={() => handleClick("n95")}>
        <CardMedia
          className={classes.media}
          image={n95}
          title="N95 Face Mask"
          label="n95"
        />
        <CardHeader
          subheader="N95 FACE MASK"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.n95} />}
        />
      </Card>
      <Card variant="outlined" className={color["faceMask"] === "action" ? classes.card : classes.clicked} onClick={() => handleClick("face mask")}>
        <CardMedia
          className={classes.media}
          image={faceMask}
          title="Face Mask"
        />
        <CardHeader
          subheader="FACE MASK"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.faceMask} />}
        />
      </Card>
      <Card variant="outlined" className={color["faceShield"] === "action" ? classes.card : classes.clicked} onClick={() => handleClick("face shield")}>
        <CardMedia
          className={classes.media}
          image={faceShield}
          title="Face Shield"
        />
        <CardHeader
          subheader="FACE SHIELD"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.faceShield} />}
        />
      </Card>
      <Card variant="outlined" className={color["gloves"] === "action" ? classes.card : classes.clicked} onClick={() => handleClick("gloves")}>
        <CardMedia
          className={classes.media}
          image={gloves}
          title="Gloves"
        />
        <CardHeader
          subheader="GLOVES"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.gloves} />}
        />
      </Card>
      <Card variant="outlined" className={color["coverall"] === "action" ? classes.card : classes.clicked} onClick={() => handleClick("coverall")}>
        <CardMedia
          className={classes.media}
          image={coverall}
          title="Coverall"
        />
        <CardHeader
          subheader="COVERALL"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.coverall} />}
        />
      </Card>
    </React.Fragment>
  );
}

export default React.memo(PPEItems);
