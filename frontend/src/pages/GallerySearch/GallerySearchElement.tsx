import React, { useRef } from "react";
import { useParams } from "react-router-dom";

const GallerySearchElement = () => {
  const { carname } = useParams();
  return <div>{carname}</div>;
};

export default GallerySearchElement;
