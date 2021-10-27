import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/** Images */
import Logo from "../../../assets/imgs/logo.svg";
import Sold_out from "../../../assets/imgs/sold_out.png";

/** CSS */
import "./carCard.scss";
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

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.Session);
  const { car1 } = useSelector(state => state.Races);

  const { requestCarRacing } = useSocket();

  const [requesting, setRequesting] = useState(false);

  //   const buyCarPack = async () => {
  //     try {
  //       setBuyLoader(true);
  //       await dispatch(buyPack(pack.id));
  //       buyPackSocket({
  //         ...pack,
  //         sold: true,
  //         owner_id: user?.id
  //       });
  //       setBuyLoader(false);
  //     } catch (e) {
  //       console.error("Error", e);
  //     }
  //   };

  const requestThisCarToRace = async () => {
    console.log("Requesting");
    try {
      setRequesting(true);
      const raceRequest = await dispatch(
        requestForRacing(car1, car.car_nft_id)
      );
      if (raceRequest.id) {
        // requestCarRacing(car.user_id, car.car_nft_id);
      }
      setRequesting(false);
    } catch (e) {
      console.error("error", e);
    }
  };

  const selectThisCarOfMine = () => {
    dispatch(selectCar1(car.car_nft_id));
  };

  const onSelect = () => {
    if (user.id === car.user_id) {
      selectThisCarOfMine();
    } else {
      requestThisCarToRace();
    }
  };

  return (
    <div
      className={cn({
        "car-card": car1 !== car.car_nft_id,
        "car-card-selected": car1 === car.car_nft_id
      })}
    >
      <img src={Logo} alt="Carypto" />
      <div className="title">
        <span>
          Mystery <b> Free </b>
        </span>
        <span> starter pack </span>
      </div>

      {user && (
        <button
          onClick={onSelect}
          disabled={requesting || (user.id !== car.user_id && !car1)}
        >
          <b>
            {user.id === car.user_id
              ? car1 === car.car_nft_id
                ? "Selected"
                : "Select This Car"
              : "Request For Racing"}
          </b>
        </button>
      )}
    </div>
  );
};

export default CarCard;
