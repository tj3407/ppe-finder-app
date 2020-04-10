import n95 from "../images/n95-mask.png";
import faceMask from "../images/face-mask.jpg";
import faceShield from "../images/face-shield.jpeg";
import gloves from "../images/gloves.jpg";
import coverall from "../images/coverall.jpeg";
import handSanitizer from "../images/hand-sanitizer.jpg";

const selected = false;

export const itemMapping = [
  {
    title: "N95 Face Mask",
    label: "n95",
    img: n95,
    subheader: "N95 FACE MASK",
    selected
  },
  {
    title: "Surgical Mask",
    label: "face mask",
    img: faceMask,
    subheader: "FACE MASK",
    selected
  },
  {
    title: "Face Shield",
    label: "face shield",
    img: faceShield,
    subheader: "FACE SHIELD",
    selected
  },
  {
    title: "Gloves",
    label: "gloves",
    img: gloves,
    subheader: "GLOVES",
    selected
  },
  {
    title: "Coveralls",
    label: "coverall",
    img: coverall,
    subheader: "COVERALL",
    selected
  },
  {
    title: "Hand Sanitizer",
    label: "hand sanitizer",
    img: handSanitizer,
    subheader: "HAND SANITIZER",
    selected
  },
];

export const formFieldMapping = {
  items: "Items Requested",
  orgName: "Organization Name",
  department: "Department Name",
  building: "Building Name/Number",
  contact: "Contact Person",
  orgAddress: "Organization Address",
};

export const labelMapping = {
  n95: "N95 Face Mask",
  "face mask": "Face Mask",
  "face shield": "Face Shield",
  gloves: "Gloves",
  coverall: "Coveralls",
  "hand sanitizer": "Hand Sanitizer",
};
