import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/** CSS Imports */
import "./race.scss";

/** Other Components */
import CarCard from "../../component/Race/CarCard/carCard";
import RaceCard from "../../component/Race/RaceCard/raceCard";

/** Actions */
import { getAllCars, getAllRaces } from "../../reduxReducers/raceReducer";

const RacePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.Session).user;

  const [cars, setCars] = useState([]);

  const getTheCarsList = useCallback(async () => {
    try {
      const carsList = await dispatch(getAllCars());
      setCars(carsList);
    } catch (e) {
      console.error("Error Getting Car List ", e);
    }
  }, [setCars, dispatch]);

  const [races, setRaces] = useState([]);

  const getTheRaceList = useCallback(async () => {
    try {
      const racesList = await dispatch(getAllRaces());
      setRaces(racesList);
    } catch (e) {
      console.error("Error Getting Car List ", e);
    }
  }, [setRaces, dispatch]);

  useEffect(() => {
    getTheCarsList();
    getTheRaceList();
  }, [getTheCarsList, getTheRaceList]);

  return (
    <div className="race-page">
      <div className="content">
        <div className="left-section">
          <span>
            <b>Your Cars</b>
          </span>
          <div className="car-section">
            <div className="cars-list">
              {(cars ?? [])
                .filter(car => car.user_id === user.id)
                .map(car => {
                  return <CarCard key={car.car_nft_id} car={car} />;
                })}
            </div>
          </div>
          <span>
            <b>Your Races</b>
          </span>
          <div className="race-section ">
            {(races ?? [])
              .filter(
                race => race.user_id_1 === user.id || race.user_id_2 === user.id
              )
              .map(race => {
                return <RaceCard key={race.id} race={race} />;
              })}
          </div>
        </div>
        <div className="option-section">
          {(cars ?? [])
            .filter(car => car.user_id !== user.id)
            .map(car => {
              return <CarCard key={car.car_nft_id} car={car} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default RacePage;
