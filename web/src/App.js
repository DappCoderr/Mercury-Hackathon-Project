import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import PageWrapper from "./component/Pagewrapper/Page/page";
import AppRoutes from "./appRoutes";

import * as fcl from "@onflow/fcl";

console.log("ENV", process.env);

fcl
  .config()
  .put("accessNode.api", process.env.REACT_APP_ACCESS_NODE_API)
  .put("challenge.handshake", process.env.REACT_APP_CHALLENGE_HANDSHAKE)
  .put("0xFungibleToken", process.env.REACT_APP_FT_CONTRACT)
  .put("0xNonFungibleToken", process.env.REACT_APP_NFT_CONTRACT)
  .put("0xFUSD", process.env.REACT_APP_FUSD_CONTRACT)
  .put("OxCarypto", process.env.REACT_APP_CARYPTO_CONTRACT); // Will let us use `0xProfile` in our Cadence

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageWrapper>
          <AppRoutes />
        </PageWrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
