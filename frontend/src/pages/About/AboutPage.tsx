import React, { useContext, useEffect } from "react";
import { CommonContext } from "../../context";

const AboutPage: React.FC = () => {
  const { setCurrentLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentLink(3);
  }, []);
  return <div className="h-[calc(100vh_-_5rem)] w-screen"></div>;
};

export default AboutPage;
