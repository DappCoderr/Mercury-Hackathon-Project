import React, { useState } from 'react'

import "./carPartSlider.scss"



// swiper core styles
import 'swiper/swiper.min.css'
// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// // install Swiper modules
SwiperCore.use([Pagination, Navigation]);


const CarPartSlider = ({ title, slides }) => {

    return (
        <>



            <ul className="part-types">

                <li className="parts">
                    <h3>{title}</h3>
                    <div className="part-items">
                        <Swiper navigation={true}>
                            {
                                slides.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="part-item">
                                                <div className="light-border-card">
                                                    <div className="part-detail-1">
                                                        <div className="part-image"><img src={item.image} alt={item.name} /> </div>
                                                        <span className="part-name">Aero</span>
                                                    </div>
                                                    <div className="part-detail-2">
                                                        <p>{item.name}</p>

                                                        <p>$200</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>

                </li>
            </ul>
        </>
    )
}

export default CarPartSlider
