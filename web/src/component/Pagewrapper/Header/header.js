import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";

/** Flow */
import * as fcl from "@onflow/fcl";

/** Actions */
import {
  expireSession,
  checkUserStatus
} from "../../../reduxReducers/sessionReducer";

/** CSS */
import "./header.scss";
import cn from "classnames";

const Header = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const currentUser = useSelector(state => state.Session).user;

  const subscribeToUser = useCallback(() => {
    fcl.currentUser().subscribe(user => {
      if (user?.loggedIn) {
        dispatch(checkUserStatus(user));
      } else {
        dispatch(expireSession());
      }
    });
  }, [dispatch]);

  const scrolled = useRef(false);

  const onScroll = useCallback(
    e => {
      console.log("Scroll", e);
      const scrollTop = e?.srcElement?.scrollTop;
      if (scrollTop > 20) {
        scrolled.current = true;
      } else {
        scrolled.current = false;
      }
    },
    [scrolled]
  );

  useEffect(() => {
    subscribeToUser();
  }, [subscribeToUser]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { capture: true });
    return () => {
      document.removeEventListener("scroll", onScroll, false);
    };
  }, [onScroll]);

  const [showPopup, setshowPopup] = useState(false);

  return (
    <div
      className={cn({
        "top-header": !scrolled.current,
        "top-header-solid": scrolled.current
      })}
    >
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
            to="/"
            active
            className={cn({
              "menu-item-active": location.pathname === "/fetaures",
              "menu-item": location.pathname !== "/features"
            })}
          >
            Features
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
          <div class="popup">
            <span> Wallet Address</span>
            <div className="addr"> {currentUser?.addr} </div>
            <div className="bal">
              Wallet Balance:
              {`${parseFloat(currentUser?.fusdBal ?? 0).toFixed(4)} FUSD`}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
