import React, { useContext, useEffect } from "react";
import ContactComponent from "../../components/contact/ContactComponent";
import FooterComponent from "../../components/footer/FooterComponent";
import { CommonContext } from "../../context";

const ContactPage: React.FC = () => {
  const { setCurrentLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentLink(4);
  }, []);
  document.title = "Contacts | Lendors";
  return (
    <div className={`h-[calc(100vh_-_5rem)] w-full`}>
      <ContactComponent />
      <FooterComponent />
    </div>
  );
};

export default ContactPage;
