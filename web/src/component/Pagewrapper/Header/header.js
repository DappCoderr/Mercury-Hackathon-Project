import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";

/** Flow */
import * as fcl from "@onflow/fcl";

/** Actions */
import {
  createSession,
  expireSession
} from "../../../reduxReducers/sessionReducer";

/** CSS */
import "./header.scss";
import cn from "classnames";

const Header = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const location = useLocation();
  const onConnectedClick = () => { };

  return (
    <div className="top-header">
      <span className="left-menu"> Car NFT</span>
      <div className="right-menu">
        <div className="menu">
          <Link
            to="/"
            active
            className={cn({
              "menu-item-active": location.pathname === "/",
              "menu-item": location.pathname !== "/"
            })}
          >
            Home
          </Link>
          <Link
            to="/workshop"
            active
            className={cn({
              "menu-item-active": location.pathname === "/workshop",
              "menu-item": location.pathname !== "/workshop"
            })}
          >
            Workshop
          </Link>
          <Link
            to="/race"
            active
            className={cn({
              "menu-item-active": location.pathname === "/race",
              "menu-item": location.pathname !== "/race"
            })}
          >
            Race
          </Link>
        </div>
        {currentUser?.loggedIn ? (
          <button
            className="login-button"
            onMouseEnter={() => {
              setshowPopup(true);
            }}
            onMouseOut={() => {
              setshowPopup(false);
            }}
            onClick={() => {
              fcl.unauthenticate();
              setshowPopup(false);
              history.push("/");
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
          <div className="popup">
            <span> Wallet Address</span>
            <div className="addr"> {currentUser?.addr} </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
