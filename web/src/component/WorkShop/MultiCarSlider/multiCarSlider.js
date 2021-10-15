import React from 'react'

import "./multiCarSlider.scss"

import { Swiper, SwiperSlide } from "swiper/react";
import CircleContainer from '../Indicators/circleContainer';
import Gauge from '../Indicators/Gauge/gauge';
import Counter from '../Indicators/Counter/counter';


const MultiCarSlider = ({ title, items }) => {
    return (
        <>
            <div className="multi-slider-wrapper">
                <div className="title">{title}</div>
                <div className="slider">
                    <Swiper slidesPerView={3} navigation={true} spaceBetween={30}  >
                        {
                            items.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}  >
                                        <div className="light-border-card">
                                            <h2>Bullet #123</h2>
                                            <img src={item.image} alt="car" />
                                            <div className="preview-stats">
                                                <ul>
                                                    <Counter topTextColor="#FD0000" topText="155" bottomText="mph" />
                                                    <CircleContainer >
                                                        <Gauge />
                                                    </CircleContainer>
                                                    <Counter topTextColor="#524B4B" topText="26" bottomText="/100" />
                                                </ul>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default MultiCarSlider
