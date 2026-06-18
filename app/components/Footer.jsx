import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">

        <div className="footerSection">
          <h2>StayEase Resort</h2>
          <p>Luxury Stay Experience for your dream vacation.</p>
        </div>

        <div className="footerSection">
          <h3>Contact Us</h3>
          <p>📞 +91 1234567890</p>
          <p>📧 support@stayease.com</p>
        </div>

        <div className="footerSection">
          <h3>Quick Links</h3>
          <p>Home</p>
        
          <p>Rooms</p>
          <p>Bookings</p>
          <p>Contact</p>
        </div>

      </div>

      <div className="footerBottom">
        © 2026 StayEase Resort. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;