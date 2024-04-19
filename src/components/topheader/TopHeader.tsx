import React from "react";
import "../../styles/topheader/topheader.scss";
import { TopHeaderLoginType, TopHeaderNavbarType } from "../../types/TopHeaderNavbarType";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterContext } from "../../context/RegisterContext";
import ResponsiveTopHeader from "./ResponsiveTopHeader";

const TopHeader = () => {
  //if user click the items.id 1 (user profile icon in the top header)
  //open register-login popup modal;
  const { togglePopup } = useRegisterContext();
  /////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();

  const TopHeaderItems: TopHeaderNavbarType[] = [
    {
      id: 1,
      title: "Xəbərlər",
    },
    {
      id: 2,
      title: "Kuponlar",
    },
    {
      id: 3,
      title: "Bokmekerlər",
    },
    {
      id: 4,
      title: "Turnir Cədvəli",
    },
  ];

  const RightLoginItems: TopHeaderLoginType[] = [
    {
      id: 1,
      icon: "./profileicon.svg",
    },
    {
      id: 2,
      icon: "./favouriteicon.svg",
    },
    {
      id: 3,
      icon: "./ball1.svg",
    },
  ];

  //responsive top header
  const [mobileHeader, setMobileHeader] = React.useState<boolean>(false);
  React.useEffect(() => {
    const responsiveHeaderSize = () => {
      if(window.innerWidth <= 968) {
        setMobileHeader(true);
      } else {
        setMobileHeader(false);
      }
    }
    responsiveHeaderSize();

    window.addEventListener('resize', responsiveHeaderSize);

    return () => window.removeEventListener('resize', responsiveHeaderSize);
  }, [mobileHeader]);


  //management is user profile navigation system authtoken, or more
  const handleNavigateUserProfile = (id:number) => {
    if(!localStorage.getItem('authtoken')){
      togglePopup();
    }
  }


  return (
    <React.Fragment>
    {mobileHeader ?  (
      <ResponsiveTopHeader />
    ) : (
    <div className="top-header">
      <div className="left">
        <div className="skawed">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="./idmanstatlogo.svg" alt="logoidmanstat" />
          </div>

          {TopHeaderItems.map((items) => (
            <div className="navbar" key={items.id}>
              <Link to={items.id === 2 ? "/tips" : items.id === 1 ? "/news" : ""} className="li">
                {items.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <div className="skawed">
          <div className="login-and-credentials">
            {RightLoginItems.map((items) => (
              <Link
                to={localStorage.getItem('authtoken') ? '/profile' : ""}
                key={items.id}
                id="icon"
                style={{ marginTop: items.id === 3 ? "0.4rem" : "" }}
                onClick={() => handleNavigateUserProfile(items.id)}>
                 <img src={items.icon} alt="register-icons" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    )}
    </React.Fragment>
    
  );
};

export default TopHeader;
