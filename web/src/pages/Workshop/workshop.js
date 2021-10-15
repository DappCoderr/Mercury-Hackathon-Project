import React from "react";
import CarEditSection from "../../component/WorkShop/CarEditSection/carEditSection";
import WorkShopHeader from "../../component/WorkShop/Header/workShopHeader";
import MultiCarSlider from '../../component/WorkShop/MultiCarSlider/multiCarSlider'

import Car from "../../assets/imgs/red car.svg"
import HeartImage from "../../assets/imgs/HEART.svg"
import WheelImage from "../../assets/imgs/Wheel.svg"

/** CSS Imports */
import "./workshop.scss";
import PartsList from "../../component/WorkShop/PartsList/partsList";

const WorkShopPage = () => {

  const cars = [
    { name: "Dodge", image: Car },
    { name: "Dodge", image: Car },
    { name: "Dodge", image: Car },
    { name: "Dodge", image: Car },
    { name: "Dodge", image: Car },
    { name: "Dodge", image: Car }
  ]


  const parts = [
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
    { name: "Wheel", image: WheelImage },
  ]


  return (
    <div className="workshop-page">
      <WorkShopHeader />
      <main className="container">
        <CarEditSection />
        <section id="carSection1">
          <MultiCarSlider title={<h3>Your built race cars (3)</h3>} items={cars} />
          <MultiCarSlider title={<SavesTitle />} items={cars} />
        </section>

        <section id="section2">
          <PartsList title={<h3>Your parts (32)</h3>} parts={parts} />
        </section>
      </main>

    </div>
  );
};

const SavesTitle = () => {
  return (
    <div style={{ display: "flex", justifyContent: "start", gap: "10px" }}>
      <img src={HeartImage} alt="saved" /> <h3> Your combination saves (0)</h3>
    </div>
  )
}

export default WorkShopPage;
