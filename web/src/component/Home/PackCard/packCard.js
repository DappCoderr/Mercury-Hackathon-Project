/** Images */
import Logo from "../../../assets/imgs/logo.svg";
import Sold_out from "../../../assets/imgs/sold_out.png";

/** CSS */
import "./packCard.scss";
import cn from "classnames";

const PackCard = ({ pack }) => {
  return (
    <div
      className={cn({
        "pack-base-card": !pack.sold,
        "pack-base-card-sold": pack.sold
      })}
    >
      <div
        className={cn({
          "pack-card": !pack.sold,
          "pack-card-sold": pack.sold
        })}
      >
        <img src={Logo} alt="Carypto" />
        <div className="title">
          <span>
            Mystery <b> Free </b>
          </span>
          <span> starter pack </span>
        </div>
        {pack.sold && (
          <img className="sold-out" src={Sold_out} alt="Sold Out" />
        )}
        <div className="content">
          <b>Enough parts for one car and a few parts to trade </b>
        </div>
        {/* <div className="nft-details">
        {(pack.nfts ?? []).map(nft => {
          return (
            <span>
              {nft.type} : {nft.value}
            </span>
          );
        })}
      </div> */}
        {!pack.sold && (
          <button>
            <b>Buy (0.00 FUSD) </b>
          </button>
        )}
      </div>
    </div>
  );
};

export default PackCard;
