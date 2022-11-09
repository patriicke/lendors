import React, { useContext, useEffect } from "react";
import AboutComponent from "../../components/about/AboutComponent";
import FooterComponent from "../../components/footer/FooterComponent";
import { CommonContext } from "../../context";

const AboutPage: React.FC = () => {
  const { setCurrentLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentLink(3);
    document.title = "About | Lendors";
  }, []);
  return (
    <div className="h-[calc(100vh_-_5rem)] w-screen">
      <AboutComponent />
      <FooterComponent />
    </div>
  );
};

export default AboutPage;
