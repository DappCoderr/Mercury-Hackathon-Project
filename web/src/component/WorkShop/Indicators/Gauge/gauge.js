import React from 'react'
import GaugeChart from 'react-gauge-chart'

const Guage = () => {
    return (
        <>

            <GaugeChart id="gauge-chart5"
                nrOfLevels={20}
                arcsLength={Array(30).fill(0.1)}
                colors={['#5BE12C', '#EA4228']}
                percent={0.37}
                arcPadding={0.02}
                style={{ display: "block", margin: "5px auto", height: 0 }}

            />


        </>
    )
}

export default Guage
