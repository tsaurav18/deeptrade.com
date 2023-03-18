
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Eugene from "./pages/Eugene/Eugene";
import Spop from "./pages/Spop/Spop";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Unsubscribe from "./pages/Unsubscribe/Unsubscribe";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import XpercentApp from "./pages/XpercentApp/XpercentApp";
import PortfolioList from "./pages/RATB/PortfolioList";
import RebalancingStatus from "./pages/RATB/RebalancingStatus";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="eugene" element={<Eugene />} />
        <Route path="spop" element={<Spop />} />
        <Route path="xpct_privacy_policy" element={<PrivacyPolicy />} />
        <Route path="unsub_email" element={<Unsubscribe />} />
        <Route path="xpercent" element={<XpercentApp />} />
        <Route path="portfolio_list" element={<PortfolioList />} />
        <Route path="rebalancing_status" element={<RebalancingStatus />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
