import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/** Images */
import Logo from "../../../assets/imgs/logo.svg";
import Sold_out from "../../../assets/imgs/sold_out.png";

/** CSS */
import "./raceCard.scss";
import cn from "classnames";

/** Actions */
import {
  requestForRacing,
  selectCar1
} from "../../../reduxReducers/raceReducer";

/** Hooks */
import { useSocket } from "../../../providers/socketProvider";

/** Flow */
import * as fcl from "@onflow/fcl";

const RaceCard = ({ race }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.Session);

  const { requestCarRacing } = useSocket();

  const [requesting, setRequesting] = useState(false);

  return (
    <div
      className={cn({
        "race-card": true
      })}
    >
      <span span="info">
        <b>Race Request </b>
      </span>
      {race.request_status === 2 ? (
        race.winner === user.id ? (
          <span className="success"> You won !!!</span>
        ) : (
          <span className="lost"> You Lost !!</span>
        )
      ) : race.request_status === 3 ? (
        <span className="rejected"> Race Rejected ! </span>
      ) : race.request_status === 1 ? (
        <span className="progress"> Race in Progress </span>
      ) : race.request_status === 0 ? (
        race.user_id_1 === user.id ? (
          <span className="pending"> Request Pending </span>
        ) : (
          <button> Accept Request</button>
        )
      ) : null}
    </div>
  );
};

export default RaceCard;
