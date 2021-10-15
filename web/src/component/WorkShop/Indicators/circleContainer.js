import React from 'react'
import "./circleContainer.scss"
const CircleContainer = ({ children, property }) => {
    return (
        <div className="circle-container">
            <div className="circle">
                {children}
            </div>

            {property && <span className="property">{property} </span>}

        </div>
    )
}

export default CircleContainer
