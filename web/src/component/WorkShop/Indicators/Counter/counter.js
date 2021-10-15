import React from 'react'
import CircleContainer from '../circleContainer'

import "./counter.scss"

const Counter = ({ topText, topTextColor, bottomText, property }) => {
    return (
        <>
            <CircleContainer property={property}>
                <span style={{ color: topTextColor }} className="top-text">{topText}</span>
                <span className="bottom-text">{bottomText}</span>
            </CircleContainer>
        </>
    )
}

export default Counter
