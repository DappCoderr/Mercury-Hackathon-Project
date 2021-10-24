import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/** CSS */
import "./section2.scss";

/** Other Components */
import PackCard from "../PackCard/packCard";

/** Actions */
import { getPackList } from "../../../reduxReducers/packsReducer";

const HomeSection2 = () => {
  const dispatch = useDispatch();
  let packs = useSelector(state => state.PacksData).pack_list;

  const getTheListOfPacks = useCallback(async () => {
    try {
      dispatch(getPackList());
    } catch (e) {
      console.error("Packs List Error", e);
    }
  }, [dispatch]);

  useEffect(() => {
    getTheListOfPacks();
  }, [getTheListOfPacks]);

  console.log("Packs", packs);

  return (
    <div className="section-2" id="packs-list">
      {(packs ?? []).map(pack => (
        <PackCard pack={pack} key={pack.id} />
      ))}
    </div>
  );
};

export default HomeSection2;
