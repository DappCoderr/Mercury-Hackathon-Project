import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/** Other Components */
import CarPartCard from "../CarParts/carparts";

/** Images */
import Logo from "../../../assets/imgs/logo.svg";
import Sold_out from "../../../assets/imgs/sold_out.png";

/** CSS */
import "./partSection.scss";
import cn from "classnames";

/** Actions */
import { selectWSCarPart } from "../../../reduxReducers/workShopReducer";

/** Hooks */
import { useSocket } from "../../../providers/socketProvider";

/** Flow */
import * as fcl from "@onflow/fcl";

const PartSectionCard = ({ type, carPartOptions }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.Session);
  const { carPartsUsed } = useSelector(state => state.WorkShop);

  //   const { buyPackSocket } = useSocket();

  //   const [creatingCar, setCreateCar] = useState(false);

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

  const autoSelectFirstOption = useCallback(() => {
    const autoSelectOptionId = carPartOptions && carPartOptions[0]?.nft_id;
    dispatch(selectWSCarPart(autoSelectOptionId));
  }, [carPartOptions, dispatch]);

  useEffect(() => {
    autoSelectFirstOption();
  }, [autoSelectFirstOption]);

  return (
    <div className="ws-part-section">
      <div className="type-section">{type}</div>
      <div className="options-section">
        {(carPartOptions ?? []).map(carPartOption => (
          <CarPartCard carPart={carPartOption} key={carPartOption.nft_id} />
        ))}
      </div>
    </div>
  );
};

export default PartSectionCard;
