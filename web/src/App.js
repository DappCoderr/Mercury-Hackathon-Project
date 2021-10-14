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
  .put("challenge.handshake", process.env.REACT_APP_CHALLENGE_HANDSHAKE);

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
