import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "../stylesheet/request.scss";

const useStyles = makeStyles(theme => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
    cursor: "pointer",
    display: "inline-block"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
    switch (name) {
      case "n95":
        setColor({
          ...color,
          n95: color["n95"] === "action" ? "primary" : "action"
        });
        break;
      case "face mask":
        setColor({
          ...color,
          faceMask: color["faceMask"] === "action" ? "primary" : "action"
        });
        break;
      case "face shield":
        setColor({
          ...color,
          faceShield: color["faceShield"] === "action" ? "primary" : "action"
        });
        break;
      case "gloves":
        setColor({
          ...color,
          gloves: color["gloves"] === "action" ? "primary" : "action"
        });
        break;
      case "coverall":
        setColor({
          ...color,
          coverall: color["coverall"] === "action" ? "primary" : "action"
        });
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
      <Card className={classes.card} onClick={() => handleClick("n95")}>
        <CardMedia
          className={classes.media}
          image="/images/n95-mask.png"
          title="N95 Face Mask"
          label="n95"
        />
        <CardHeader
          subheader="N95 FACE MASK"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.n95} />}
        />
      </Card>
      <Card className={classes.card} onClick={() => handleClick("face mask")}>
        <CardMedia
          className={classes.media}
          image="/images/face-mask.jpg"
          title="Face Mask"
        />
        <CardHeader
          subheader="FACE MASK"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.faceMask} />}
        />
      </Card>
      <Card className={classes.card} onClick={() => handleClick("face shield")}>
        <CardMedia
          className={classes.media}
          image="/images/face-shield.jpeg"
          title="Face Shield"
        />
        <CardHeader
          subheader="FACE SHIELD"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.faceShield} />}
        />
      </Card>
      <Card className={classes.card} onClick={() => handleClick("gloves")}>
        <CardMedia
          className={classes.media}
          image="/images/gloves.jpg"
          title="Gloves"
        />
        <CardHeader
          subheader="GLOVES"
          className={classes.header}
          action={<CheckCircleOutlineIcon color={color.gloves} />}
        />
      </Card>
      <Card className={classes.card} onClick={() => handleClick("coverall")}>
        <CardMedia
          className={classes.media}
          image="/images/coverall.jpeg"
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
