import React from 'react'

import "./multiCarSlider.scss"

import { Swiper, SwiperSlide } from "swiper/react";


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

                                                    <li>
                                                        155 mph
                                                        <span>Top speed</span>
                                                    </li>
                                                    <li>
                                                        30m/s<sup>2</sup>
                                                        <span>Acceleration</span>
                                                    </li>
                                                    <li>
                                                        30m/s<sup>2</sup>
                                                        <span>Braking</span>
                                                    </li>
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
