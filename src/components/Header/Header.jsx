import React from "react";
import Navbar from "./Navbar/Navbar";
import "./header.css";

function Header() {
  return (
    <header id="main-header">
      <div className="container">
        <h1 id="main-logo" className="pd-20">
          VendorNetwork
        </h1>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
