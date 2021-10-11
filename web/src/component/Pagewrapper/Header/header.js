import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as fcl from "@onflow/fcl";
import * as FlowTypes from "@onflow/types";

/** Actions */
import {
  createSession,
  expireSession
} from "../../../reduxReducers/sessionReducer";

/** CSS */
import "./header.scss";

const Header = ({ props }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.Session).user;

  const subscribeToUser = () => {
    fcl.currentUser().subscribe(user => {
      if (user?.loggedIn) {
        dispatch(createSession(user));
      } else {
        dispatch(expireSession());
      }
    });
  };

  useEffect(() => {
    subscribeToUser();
  }, []);

  const [showPopup, setshowPopup] = useState(false);
  const onConnectedClick = () => {};

  return (
    <div className="top-header">
      <span className="left-menu"> Car NFT</span>
      <div className="right-menu">
        {currentUser?.loggedIn ? (
          <button
            className="login-button"
            onClick={() => {
              setshowPopup(true);
            }}
          >
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={fcl.logIn}>
            Connect Wallet
          </button>
        )}
        {showPopup ? (
          <div class="popup">
            <ul>
              <li>{currentUser?.addr}</li>
              <li> Sign Out</li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
