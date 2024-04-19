import React from "react";
import "../../../../styles/tipspage/tips.scss";
import { FaPlus } from "react-icons/fa";
import TekliOyunlar from "./cuponsroutes/TekliOyunlar";
import Kuponlar from "./cuponsroutes/Kuponlar";
import { IoSearch } from "react-icons/io5";
import { BsFilterLeft } from "react-icons/bs";
import { useTipModal } from "../../../../context/AddTipModalContext";

interface Navigator {
  id: number;
  title: string;
}

const Cupons = () => {
  //switch button
  const [switched, setSwitched] = React.useState<boolean>(false);

  //switched;
  const handleSwitch = () => {
    setSwitched(!switched);
  };

  //bottom area navigator(tekli oyunlar , kuponlar)
  const NavItems: Navigator[] = [
    {
      id: 1,
      title: "Hamısı",
    },
    {
      id: 2,
      title: "Kuponlar",
    },
    {
      id: 3,
      title: "Təkli Oyunlar",
    },
  ];

  //navigator selected (tekli oyunlar or kuponlar);
  const [selectedNav, setSelectedNav] = React.useState<string>("Hamısı");

  //actived navigator state
  const [actived, setActived] = React.useState<string>("Hamısı");

  //actived navigator state if active changed background and more..
  //function selected navigator is function toggle and clicked switched navigator between
  const toggleNavigator = (title: string) => {
    setSelectedNav(title);
    setActived(title);
  };


  //ADD TIP MODAL 
  const { toggleModal } = useTipModal();

  return (
    <div className="cupons-container">
      <div className="topheader-cuponcontainer">
        <span id="headertit">Aktiv Kuponlar - 1776</span>

        {/* <article className="switch-con">
          <span id="title">Təsdiqlənmişlər</span>
          <span id="rectangle">
            <span className={`switch ${switched ? "opened" : ""}`} onClick={() => handleSwitch()}></span>
          </span>
        </article> */}

        <button onClick={toggleModal}>
          <FaPlus id="plusicon"/>
          Tip Əlavə Et
        </button>
      </div>

      <div className="navigator">
        {NavItems.map((items) => (
          <li
            key={items.id}
            onClick={() => toggleNavigator(items.title)}
            // if actived page change background
            className={`links ${
              items.id === 1 && selectedNav === "Hamısı"
                ? "li1"
                : items.id === 2 && selectedNav === "Kuponlar"
                ? "li2"
                : items.id === 3 && selectedNav === "Təkli Oyunlar"
                ? "li3"
                : ""
            }`}>
            {items.title}
          </li>
        ))}
      </div>

      <div className="filtered-area">
        <div className="search-input-area">
          <IoSearch id="searchicon" />
          <input type="search" placeholder="Liga/Maç Axtarışı" />
        </div>

        <div className="right-filter-area">
          <span id="queued">Sırala:</span>
          <span id="best-liked">Ən çox bəyənilən <BsFilterLeft id="filter" /></span>
        </div>

      </div>

      {/* IF SELECTED NAV THEN RENDERED THE NAVIGATOR ROUTE COMPONENTS */}
      {selectedNav === "Təkli Oyunlar" && <TekliOyunlar />}
      {selectedNav === "Kuponlar" && <Kuponlar />}
      {selectedNav === "Hamısı" && (
        <React.Fragment>
          <TekliOyunlar />
          <Kuponlar />
        </React.Fragment>
      )}
    </div>
  );
};

export default Cupons;
