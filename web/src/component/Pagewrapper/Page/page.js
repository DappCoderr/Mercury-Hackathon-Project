/** Other components */
import Header from "../Header/header";

/** CSS */
import "./page.scss";

const Page = props => {
  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Page;
