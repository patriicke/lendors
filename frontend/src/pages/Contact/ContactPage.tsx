import React, { useContext, useEffect } from "react";
import { CommonContext } from "../../context";

const ContactPage: React.FC = () => {
  const { setCurrentLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentLink(4);
  }, []);
  return <div className={`h-[calc(100vh_-_5rem)] w-full`}></div>;
};

export default ContactPage;
