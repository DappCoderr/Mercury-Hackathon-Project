import React, {useState, useEffect} from 'react'
import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types'
import "./Style.css"

fcl.config()
  .put("accessNode.api", 'https://access-testnet.onflow.org')
  .put("challenge.handshake", 'https://fcl-discovery.onflow.org/testnet/authn');


const Header = (props) => {

    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])

    if(user.loggedIn){
        return (
            <section id="Header">
                <div id="Hero">
                <h1 className="title">Car NFT</h1>
                </div>
                <div id="item">
                Address:<span>{user.addr}</span>
                <button className="btn logOut" onClick={fcl.unauthenticate}>Log Out</button>
                </div>
            </section>
        )} else {
            return(
                <section id="Header">
                    <div id="Hero">
                    <h1 className="title">Car NFT</h1>
                    </div>
                    <button className="btn" onClick={fcl.logIn}>Connect Wallet</button>
                </section>
            )
        }
}

export default Header