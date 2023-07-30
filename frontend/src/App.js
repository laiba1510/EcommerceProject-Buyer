import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Component/layout/header/NavBar";
import "./App.css";
import Footer from "./Component/layout/Footer/footer.jsx";
import Home from "./Component/Home/Home.jsx";
import Loader from "./Component/layout/pageLoader/Loader.jsx"
function App() {
  return (
    <Router>
      <div>
        {/* Your other components and content */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sad" element={<Loader />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
