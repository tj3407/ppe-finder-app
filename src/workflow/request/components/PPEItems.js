import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "../stylesheet/request.scss";
import { itemMapping } from "../../../metadata/mappings";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
    cursor: "pointer",
    display: "inline-block",
    padding: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  clicked: {
    border: "solid 2px green",
    width: 200,
    margin: theme.spacing(2),
    cursor: "pointer",
    display: "inline-block",
    padding: theme.spacing(2),
  },
}));

function PPEItems(props) {
  const classes = useStyles();
  const items = React.useRef([]);
  const [color, setColor] = React.useState({});

  const handleClick = (product) => {
    const index = items.current.indexOf(product.label);
    if (!items.current.includes(product.label)) {
      items.current.push(product.label);
    }
    product.selected = !product.selected;

    setColor({
      ...color,
      [product.label]: product.selected ? "primary" : "action"
    })

    if (!product.selected && items.current.includes(product.label)) {
      items.current.splice(index, 1);
    }

    if (props.items) {
      props.items({ items: items.current });
    }
  };

  return (
    <React.Fragment>
      {itemMapping.map((product, index) => {
        return (
          <Card
            key={`${product.label}-${index}`}
            variant="outlined"
            className={
              !product.selected ? classes.card : classes.clicked
            }
            onClick={() => handleClick(product)}
          >
            <CardMedia
              className={classes.media}
              image={product.img}
              title={product.title}
              label={product.label}
            />
            <CardHeader
              subheader={product.subheader}
              className={classes.header}
              action={<CheckCircleOutlineIcon color={color[product.label]} />}
            />
          </Card>
        );
      })}
    </React.Fragment>
  );
}

export default React.memo(PPEItems);
