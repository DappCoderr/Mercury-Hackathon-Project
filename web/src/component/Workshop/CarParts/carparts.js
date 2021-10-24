import React from "react";
import { useSelector } from "react-redux";

/** Images */
import Logo from "../../../assets/imgs/logo.svg";

/** CSS */
import "./carparts.scss";
import cn from "classnames";

/** Flow */
import * as fcl from "@onflow/fcl";

const CarPartCard = ({ carPart }) => {
  const { user } = useSelector(state => state.Session);
  const { carPartsUsed } = useSelector(state => state.WorkShop);

  return (
    <div
      className={cn({
        "ws-car-part-card-selected": carPartsUsed.includes(carPart.nft_id),
        "ws-car-part-card": !carPartsUsed.includes(carPart.nft_id)
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
          onClick={() => {}}
          disabled={carPartsUsed.includes(carPart.nft_id)}
        >
          <b>{carPartsUsed.includes(carPart.nft_id) ? "Selected" : "Select"}</b>
        </button>
      )}
    </div>
  );
};

export default CarPartCard;
