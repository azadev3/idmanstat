import React from "react";
import "../../styles/footer/footer.scss";
import { Link } from "react-router-dom";
import { useContactModal } from "../../context/ContactUsModal";
import ResponsiveFooterComponent from "./ResponsiveFooterComponent";

const Footer = () => {
  const Box = [
    {
      id: 1,
      title: "Haqqımızda",
    },
    {
      id: 2,
      title: "Sürətli Linklər",
    },
    {
      id: 3,
      title: "Xəbərlər",
    },
    {
      id: 4,
      title: "Əlaqə",
    },
  ];

  //contact modal
  const { toggleContactModal } = useContactModal();

  //if footer short is the 968 pixels then collapse responsive footer
  const [responsiveFooter, setResponsiveFooter] = React.useState<boolean>(false);

  React.useEffect(() => {
    const resizedResponsiveFooterFunc = () => {
      if (window.innerWidth <= 968) {
        setResponsiveFooter(true);
      } else {
        setResponsiveFooter(false);
      }
    };
    
    resizedResponsiveFooterFunc();

    window.addEventListener('resize', resizedResponsiveFooterFunc);

    return () => window.removeEventListener('resize', resizedResponsiveFooterFunc);

  }, [responsiveFooter]);

  return (
     <React.Fragment>
     {responsiveFooter ? (
          <ResponsiveFooterComponent />
     ) : (
    <div className="footer-container">
      <div className="footer">
        <div className="contents-footer">
          {Box.map((box) => (
            <div key={box.id} className="box">
              <div className="top-title">
                <span>{box.title}</span>
              </div>
              <div className="content">
                {box.id === 1 ? (
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores possimus saepe in? Recusandae,
                    reprehenderit enim.
                  </p>
                ) : box.id === 2 ? (
                  <div className="links">
                    <Link to="" className="li">
                      About Us
                    </Link>
                    <Link to="" className="li">
                      Listing
                    </Link>
                    <Link to="" className="li">
                      How it Works
                    </Link>
                    <Link to="" className="li">
                      Our Services
                    </Link>
                    <Link to="" className="li">
                      Our Blog
                    </Link>
                    <Link to="" className="li" onClick={toggleContactModal}>
                      Contact Us
                    </Link>
                  </div>
                ) : box.id === 3 ? (
                  <div className="news">
                    <article className="new1">
                      <img src="./noimg.svg" width={50} height={50} />
                      <span>The Added Value Social Worker</span>
                    </article>
                    <article className="new2">
                      <img src="./noimg.svg" width={50} height={50} />
                      <span>Ways to Increase Trust</span>
                    </article>
                  </div>
                ) : box.id === 4 ? (
                  <div className="contact">
                    <div className="location">
                      <img src="./loc.svg" alt="location-icon" />
                      <span>Flat 20, Reynolds Neck, North Helenaville, FV77 8WS</span>
                    </div>
                    <div className="mic">
                      <img src="./mic.svg" alt="mic-icon" />
                      <span>+2(305) 587-3407</span>
                    </div>
                    <div className="mail">
                      <img src="./mail.svg" alt="mail-icon" />
                      <span>info@example.com</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-area">
          <div className="left-area">
            <img src="./idmanstatlogo.svg" alt="logoidmanstat" />
            <span>İdmanstat © 2024 Bütün Hüquqlar Qorunur</span>
          </div>
          <div className="right-area">
            <div className="shot">
              <Link to="" id="terms">
                Terms
              </Link>
              <span>|</span>
              <Link to="" id="privacy">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
     )}

    </React.Fragment>

  );
};

export default Footer;
