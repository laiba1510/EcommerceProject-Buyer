
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="company-info">
        <h2>EMUBA</h2>
        <p>We strive for accuracy</p>
      </div>
      <ul className="social-icons">
        <li className="icon facebook">
          <a href="https://www.facebook.com/your-facebook-page" >
            <span className="tooltip">Facebook</span>
            <span><i className="fab fa-facebook-f"></i></span>
          </a>
        </li>
        <li className="icon twitter">
          <a href="https://twitter.com/your-twitter-page" >
            <span className="tooltip">Twitter</span>
            <span><i className="fab fa-twitter"></i></span>
          </a>
        </li>
        <li className="icon instagram">
          <a href="https://www.instagram.com/your-instagram-page">
            <span className="tooltip">Instagram</span>
            <span><i className="fab fa-instagram"></i></span>
          </a>
        </li>
        <li className="icon youtube">
          <a href="https://www.youtube.com/your-youtube-page" >
            <span className="tooltip">Youtube</span>
            <span><i className="fab fa-youtube"></i></span>
          </a>
        </li>
      </ul>
      <p>Follow us</p>
    </footer>
  );
};

export default Footer;
