import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/** CSS Imports */
import "./workshop.scss";

/** Other Components */
import PartSectionCard from "../../component/Workshop/PartSection/partSection";

/** Actions */
import {
  saveNewCar,
  getUserCollection
} from "../../reduxReducers/workShopReducer";

const carPartsAvailable = [
  { nft_id: "0xerrerer9", value: 13, type: "engine" },
  { nft_id: "0xerrerer5", value: 12, type: "engine" },
  { nft_id: "0xerrerer1", value: 20, type: "engine" },
  { nft_id: "0xerrerer0", value: 61, type: "wheel" },
  { nft_id: "0xerrerer10", value: 70, type: "power-up" },
  { nft_id: "0xerrerer3", value: 50, type: "power-up" },
  { nft_id: "0xerrerer11", value: 9, type: "body" }
];

const WorkShopPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [carParts, setCarParts] = useState({});
  const carPartsUsed = useSelector(state => state.WorkShop).carPartsUsed;

  const partWiseCollection = useCallback(() => {
    const pWColl = carPartsAvailable.reduce((acc, carPart) => {
      acc[carPart.type] = [...(acc[carPart.type] ?? []), carPart];
      return acc;
    }, {});
    setCarParts(pWColl);
  }, [setCarParts]);

  const getTheUserCool = useCallback(async () => {
    const cPs = await dispatch(getUserCollection());
    setCarParts(cPs);
  }, [dispatch]);

  useEffect(() => {
    // partWiseCollection();
    getTheUserCool();
  }, [getTheUserCool]);

  const createCar = async () => {
    try {
      const newCar = await dispatch(
        saveNewCar(
          (Math.random() + 1).toString(36).substring(7),
          Math.floor(Math.random() * 400)
        )
      );
      if (newCar.id) {
        history.push("/races");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="workshop-page">
      <div className="content">
        <div className="car-section"> - </div>
        <div className="option-section">
          {(Object.keys(carParts) ?? []).map(carPartType => {
            console.log("CarPart Type", carPartType);
            return (
              <PartSectionCard
                key={carPartType}
                type={carPartType}
                carPartOptions={carParts[carPartType]}
              />
            );
          })}
          <button
            className="create-car"
            disabled={carPartsUsed.length !== 4}
            onClick={createCar}
          >
            Create This Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkShopPage;
