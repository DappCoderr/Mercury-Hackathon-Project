import React from 'react'

//css import
import "./workshopHeader.scss"
import MainLogo from "../../../assets/imgs/MASTER  LOGO.svg"
import ProfileImage from "../../../assets/imgs/profile.svg"

const WorkShopHeader = () => {
    return (
        <header className="main-header">
            <div className="brand-logo"> <img src={MainLogo} alt="Caryptos" /> </div>
            <nav className="main-nav">
                <ul className="nav-links">
                    <li className="nav-link active">Workshop</li>
                    <li className="nav-link">Race</li>
                    <li className="nav-link">Trade</li>
                </ul>
            </nav>
            <div className="user-info">
                <div className="profile-image"> <img width="50px" src={ProfileImage} alt="profile" /> </div>
                <div className="user-data">
                    <h2>Olakunle Abiola</h2>
                    <h3>$500</h3>
                </div>
            </div>
        </header>
    )
}

export default WorkShopHeader
