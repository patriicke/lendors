import React from "react";
import HomePageComponent from "../../components/home/HomePageComponent";
import NavbarComponent from "../../components/navbar/NavbarComponent";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-auto">
      <NavbarComponent />
      <HomePageComponent />
    </div>
  );
};

export default HomePage;
