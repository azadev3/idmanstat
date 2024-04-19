import React from "react";
import "../../../../../../styles/fixturemodal/fixturemodal.scss";
import { useFixtureModal } from "../../../../../../context/MatchFixturesModal";
import { IoIosClose } from "react-icons/io";
import Events from "./fixturemodalroutes/Events";
import Lineups from "./fixturemodalroutes/Lineups";
import Players from "./fixturemodalroutes/Players";
import Statistics from "./fixturemodalroutes/Statistics";
import { GameType } from "./Games";
import { useLiveGamesContext } from "./GamesApiContext";
import { GamesByDate } from "./GamesByDate";

type NavLinksTypeInFixtures = {
  id: number;
  title: string;
};

const FixtureModal = () => {

  //match status navigator links
  const Links: NavLinksTypeInFixtures[] = [
    { id: 1, title: "Hadisələr" },
    { id: 2, title: "Statistikalar" },
    { id: 3, title: "Sıralar" },
    { id: 4, title: "Oyunçular" },
  ];

  //if outside clicked close the modal
  const { setFixtureModal, setFixtureDataForModal, fixtureDataForModal } = useFixtureModal();

  const items = fixtureDataForModal; //this is from api come to values and connect my constant variable 'items';

  const fixtureModalDivRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClicked = (e: React.MouseEvent | MouseEvent) => {
      if (fixtureModalDivRef.current && !fixtureModalDivRef.current.contains(e.target as Node)) {
        setFixtureModal("");
        setFixtureDataForModal(null);
      }
    };

    document.addEventListener("mousedown", outsideClicked);

    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  const [activeNav, setActiveNav] = React.useState<number | null>(1);

  const handleSelectLink = (id: number) => {
    setActiveNav(id);
  };

  const formattedTime = (date?: string) => {
    if (date) {
      const today = new Date(date);
      return today.toLocaleString();
    } else {
      console.error("unavailable date");
    }
  };

  //if STADIUM NAME and CITY long the number; trim it;
  const maxNum:number = 19;
  const trimStadiumName = (stadiumname: any) => {
    const name = stadiumname?.fixture?.venue?.name;
    if(name && name?.length >= maxNum){
      const trimText = name?.trim().slice(0, maxNum) + '...';
      return trimText;
    } else {
      return name;
    }
  }

  const trimStadiumCity = (stadiumcity: any) => {
    const city = stadiumcity?.fixture?.venue?.city;
    if(city && city?.length > maxNum) {
      const trimText = city?.trim().slice(0, maxNum) + '...';
      return trimText;
    } else {
      return city;
    }
  }

  return (
    <div className="fixture-modal-container" ref={fixtureModalDivRef}>
      <div className="top-header-in-fixture-modal">
        <span>Maç detalları</span>
        <IoIosClose
          id="close-icon"
          onClick={() => {
            setFixtureModal(""), setFixtureDataForModal(null);
          }}
        />
      </div>

      <div className="content-main">
        <div className="match-header">
          <div className="ligname">
            <div className="imgwrapper">
              <img src={items?.league?.flag} alt="country-flag" loading="lazy" />
            </div>
            <span>{items?.league?.name}</span>
          </div>

          <span>{items?.league?.round}</span>
        </div>

        <div className="head-to-head-container">
          <div className="left-team">
            <div className="img-wrapper">
              <img src={items?.teams?.home?.logo} alt="team-home" />
            </div>
            <span>{items?.teams?.home?.name}</span>
          </div>

          <div className="results">
            <span id="date-and-hour">{formattedTime(items?.fixture?.date)}</span>

            <h1 id="match-result">
              {items?.goals?.home} - {items?.goals?.away}
            </h1>

            <span id="matchstatus">{GamesByDate(items)}</span>

            <span id="stadiumname">
              Şəhər: <strong style={{ paddingLeft: "0.3rem" }}>{trimStadiumName(items)}</strong> -
              Ad: <strong style={{ paddingLeft: "0.3rem" }}>{trimStadiumCity(items)}</strong>
            </span>
          </div>

          <div className="right-team">
            <div className="img-wrapper">
              <img src={items?.teams?.away?.logo} alt="team-away" />
            </div>
            <span>{items?.teams?.away?.name}</span>
          </div>
        </div>

        <div className="navigators">
          <div className="navs-in-fixtures">
            {Links.map((links) => (
              <li
                className={activeNav === links.id ? "active-link" : ""}
                onClick={() => handleSelectLink(links.id)}
                key={links.id}>
                {links.title}
              </li>
            ))}
          </div>
        </div>

        {/* ACTIVE NAV ACCORDING TO RENDERING COMPONENTS */}
        {activeNav === 1 && <Events items={items}/>}
        {activeNav === 2 && <Lineups />}
        {activeNav === 3 && <Players />}
        {activeNav === 4 && <Statistics />}
      </div>
    </div>
  );
};

export default FixtureModal;
