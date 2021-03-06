/** CSS */
import "./section1.scss";

/** Icons */
import { IconContext } from "react-icons";
import { BsBox } from "react-icons/bs";
import { FaCar, FaCarCrash } from "react-icons/fa";

const HomeSection1 = () => {
  const scrollToPackList = () => {
    const packsList = document.getElementById("packs-list");
    if (packsList) {
      packsList.scrollIntoView();
    }
  };

  return (
    <div className="section-1">
      {/* <div className="overlay"> */}
      <button className="started-pack-button" onClick={scrollToPackList}>
        <IconContext.Provider
          value={{
            className: "icon"
          }}
        >
          <BsBox />
        </IconContext.Provider>
        Buy Your Pack
      </button>
      <button className="build-your-first-car" id="packse-list">
        <IconContext.Provider
          value={{
            className: "icon"
          }}
        >
          <FaCar />
        </IconContext.Provider>
        Build Your Car
      </button>
      <button className="race-your-car">
        <IconContext.Provider
          value={{
            className: "icon"
          }}
        >
          <FaCarCrash />
        </IconContext.Provider>
        Race Your Car
      </button>
      {/* </div> */}
    </div>
  );
};

export default HomeSection1;
