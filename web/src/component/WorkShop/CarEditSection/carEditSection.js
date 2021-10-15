import React from 'react'
import CarPartSlider from '../CarPartSlider/carPartSlider'

import "./carEditSection.scss"
import Car from "../../../assets/imgs/red car.svg"
import Part from "../../../assets/imgs/BODY.svg"
import Part2 from "../../../assets/imgs/AXLE.svg"
import RaceImage from "../../../assets/imgs/RAce button.svg"
import HeartImage from "../../../assets/imgs/HEART.svg"
import { Swiper, SwiperSlide } from "swiper/react";
import CircleContainer from '../Indicators/circleContainer'
import Gauge from '../Indicators/Gauge/gauge'
import Counter from '../Indicators/Counter/counter'


const CarEditSection = () => {

    const shapes = [
        { name: "Ford mustang 1977", image: Part },
        { name: "Ford mustang 1977", image: Part },
        { name: "Ford mustang 1977", image: Part },
    ]

    const axles = [
        { name: "Ford mustang 1977", image: Part2 },
        { name: "Ford mustang 1977", image: Part2 },
        { name: "Ford mustang 1977", image: Part2 },
    ]

    const cars = [
        { name: "Ford mustang 1977", image: Part2 },
        { name: "Ford mustang 1977", image: Part2 },
    ]

    return (
        <>
            <section className="workshop">

                <div className="car-preview">
                    <h2>Get your car ready to race. Create customize and save your car to race</h2>

                    <div className="preview-box">
                        <span>Car model</span>
                        <h2>Bullet #123</h2>
                        <Swiper slidesPerView={1} style={{ height: "100%" }} >

                            {
                                cars.map((car, index) => {
                                    return (
                                        <>
                                            <SwiperSlide key={index} style={{ height: "100%", overflow: "hidden" }} >
                                                <img width="90%" src={Car} alt="car" />
                                            </SwiperSlide>
                                        </>
                                    );
                                })
                            }

                        </Swiper>


                        <div className="preview-stats">
                            <h2>Vital stats</h2>
                            <ul>
                                <Counter property="Top speed" topTextColor="#FD0000" topText="155" bottomText="mph" />
                                <CircleContainer property="Acceleration">
                                    <Gauge />
                                </CircleContainer>
                                <Counter property="Braking" topTextColor="#524B4B" topText="26" bottomText="/100" />
                            </ul>
                        </div>


                    </div>

                </div>

                <aside className="car-parts">
                    <h2>Create your car by choosing from the parts you own</h2>
                    <nav className="tab">
                        <ul className="tab-links">
                            <li className="tab-link active">Body</li>
                            <li className="tab-link">Drive train</li>
                            <li className="tab-link">Wheels</li>
                        </ul>
                    </nav>
                    <section className="tab-body">

                        <CarPartSlider title="Shape" slides={shapes} />

                        <CarPartSlider title="Axle" slides={axles} />


                    </section>

                    <section className="actions">
                        <img src={RaceImage} alt="Race" />
                        <div className="save">
                            <img src={HeartImage} alt="Save" />
                            <p>Save this combination</p>
                        </div>
                    </section>


                </aside>
            </section>









        </>

    )
}

export default CarEditSection
