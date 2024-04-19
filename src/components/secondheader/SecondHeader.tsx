import React from "react";
import "../../styles/secondheader/secondheader.scss";
import Navigation from "./Navigation";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/responsive/responsive.css';
import './responsivesecondheader.scss';

const SecondHeader = () => {

  const LeftItems = [
    {
      id: 1,
      default: "../secondheadericons/home.svg", //default version of the icon
      hover: "../secondheadericons/hoverhomeicon.svg", //hover version of the icon
      active: "../secondheadericons/homeactive.svg", //active version of the icon
    },
    {
      id: 2,
      default: "../secondheadericons/liveicon.svg", //default version of the icon
      hover: "../secondheadericons/livehover.svg", //hover version of the icon
      active: "../secondheadericons/livehover.svg", //active version of the icon
    },
  ];

  //hovered states on img element
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null);

  //on hover mouse
  const handleHover = (id: number) => {
    setHoveredItem(id);
  };

  //on leave mouse
  const handleLeave = () => {
    setHoveredItem(null);
  };

  //RESPONSIVE SECOND HEADER
  const [hiddenItems, setHiddenItems] = React.useState<boolean>(false);

  return (
    <div className="second-header">
      <div className="content">
        <div className="left">
          {LeftItems.map((items) => (
            <Link to="" className="img-wrapper" 
            onMouseOver={() => handleHover(items.id)} //on hover
            onMouseOut={() => handleLeave()} //on leave
            key={items.id}
            > 
              <img src={hoveredItem === items.id ? items.hover : items.default} alt="icons" key={items.id} />
            </Link>
          ))}
        </div>
          <Navigation setHiddenItems = { setHiddenItems } hiddenItems = { hiddenItems } />
        <div className="social-media">
          <div className="icons">
            <Link to="" className="facebook">
              <img src="../secondheadericons/facebook.svg" alt="facebook" />
            </Link>
            <Link to="" className="instagram">
              <img src="../secondheadericons/instagram.svg" alt="facebook" />
            </Link>
            <Link to="" className="telegram">
              <img src="../secondheadericons/telegram.svg" alt="facebook" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondHeader;
