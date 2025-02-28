import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerificationCode from "./VerificationCode";
import SuccessPage from "./SuccessPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerificationCode />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;