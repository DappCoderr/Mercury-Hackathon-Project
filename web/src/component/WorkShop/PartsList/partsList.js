import React from 'react'

import "./partsList.scss";

const PartsList = ({ title, parts }) => {
    return (
        <>
            <div className="parts-wrapper">
                <div className="title">{title} </div>

                <div className="parts-wrapper-inner">

                    {
                        parts.map((part, index) => {
                            return (
                                <div className="part light-border-card">
                                    <img src={part.image} alt={part.name} />

                                    <div className="part-details">
                                        <h3>{part.name}</h3>
                                        <span>20Kg</span>

                                        <span>$5000</span>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default PartsList
