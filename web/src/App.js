import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import Home from "./pages/Home/home";
import PageWrapper from "./component/Pagewrapper/Page/page";
import AppRoutes from "./appRoutes";

import * as fcl from "@onflow/fcl";

fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("challenge.handshake", "https://fcl-discovery.onflow.org/testnet/authn");

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
