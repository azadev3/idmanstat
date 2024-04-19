import React from "react";
import "./responsivefooter.scss";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";


const ResponsiveFooterComponent = () => {
  return (
    <div className="responsive-footer-component">
      <div className="footer-container-responsive">
        <div className="about-our-box">
          <div className="title">
            <span>Haqqımızda</span>
          </div>

          <div className="content">
            <p>
              Lorem ipsum dolor amet consetetur adi pisicing elit sed eiusm tempor in cididunt ut labore dolore magna
              aliqua enim ad minim venitam
            </p>
            <p>Quis nostrud exercita laboris nisi ut aliquip commodo.</p>
          </div>
        </div>

        <div className="fast-links-box">
          <div className="title">
            <span>Sürətli Linklər</span>
          </div>

          <div className="links">
            <Link to="" id="links-in-footer">
              About Us
            </Link>
            <Link to="" id="links-in-footer">
              Listing
            </Link>
            <Link to="" id="links-in-footer">
              How It Works
            </Link>
            <Link to="" id="links-in-footer">
              Our Services
            </Link>
            <Link to="" id="links-in-footer">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="news-box">
          <div className="title">
            <span>Xəbərlər</span>
          </div>

          <div className="contents-in-news-box">
            <div className="wrapper-one">
              <div className="img-wrapper">
                <img src="./footerbog.svg" alt="footer-backg" />
              </div>
              <div className="texts">
                <span>The Added Value Social Worker</span>
                <span>Mar 25, 2020</span>
              </div>
            </div>
            <div className="wrapper-one">
              <div className="img-wrapper">
                <img src="./footerbog.svg" alt="footer-backg" />
              </div>
              <div className="texts">
                <span>Ways to Increase Trust</span>
                <span>Mar 24, 2020</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-box">
          <div className="title">
            <span>Əlaqə</span>
          </div>

          <div className="contact-content">
            <div className="location">
              <CiLocationOn id="contact-icons"/>
              <span>Flat 20, Reynolds Neck, North Helenaville, FV77 8WS</span>
            </div>

            <div className="telephone">
              <CiMicrophoneOn id="contact-icons"/>
              <span>Flat 20, Reynolds Neck, North Helenaville, FV77 8WS</span>
            </div>

            <div className="mail">
              <CiMail id="contact-icons"/>
              <span>Flat 20, Reynolds Neck, North Helenaville, FV77 8WS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-foot">
          <div className="left">
          <img src="/idmanstatlogo.svg" alt="logoidmanstat" />
          <span id="idmanstat-priv">İdmanstat © 2021 Bütün Hüquqlar Qorunur</span>
          </div>

          <div className="right">
          <span>Terms of Service</span>
          <span>|</span>
          <span>Privacy Policy</span>
          </div>
      </div>
    </div>
  );
};

export default ResponsiveFooterComponent;
