import React from "react";
import Section1 from "../../component/Home/Section1/section1";
import Section2 from "../../component/Home/Section2/section2";

/** CSS */
import "./home.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="overlay">
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
};

export default HomePage;
