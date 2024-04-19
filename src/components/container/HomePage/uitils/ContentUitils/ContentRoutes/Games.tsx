import React from "react";
import "../../../../../../styles/container/container.scss";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useTimeContextOnTheBottomNavComponent } from "../BottomNavContext";
import { GamesByDate } from "./GamesByDate";
import { useLiveGamesContext } from "./GamesApiContext";
import LoadingAnimInGames from "../../../../../loadingandlazy/LoadingAnimInGames";
import { useFixtureModal } from "../../../../../../context/MatchFixturesModal";
import { useLiveMatchShowContext } from "../../../../../../context/AccordingLeagueLiveMatchs";
import { useRegisterContext } from "../../../../../../context/RegisterContext";

//DEFINE GAME TYPES (LIVE GAMES and other GAMES on the FETCH LIVE GAMES DATA TYPES)

export type GameType = {
  goals: {
    away: number;
    home: number;
  };
  fixture: {
    id: number,
    date: string;
    status: {
      elapsed: number;
      long: string;
      short: string;
    };
    venue: {
      city: string,
      name: string,
    }
  };
  score: {
    fulltime: {
      home: number,
      away: number,
    },
    halftime: {
      home: number,
      away: number,
    }
  },
  league: {
    country: string;
    flag: string;
    logo: string;
    name: string;
    round: string;
    season: number | string;
  };
  teams: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
};

const Games = () => {
  //get selectedTime on the BottomNav component
  //and this state keep up the selected time.
  //A request will be sent to the API according to the selected time
  //and the API will return us the data of that time.
  //this state keep up our selected time object
  const { timeSelected, loadingItems, selectedBottomNavigatorItem, setHiddenCalendar } = useTimeContextOnTheBottomNavComponent();

  const { fetchAccordingToDataGames, fetchLiveGames, liveGamesData, priorityData  } = useLiveGamesContext();

  const { showed, selectedIndex, liveGamesByLeagueClicked, setShowed } = useLiveMatchShowContext();

  React.useEffect(() => {
    fetchAccordingToDataGames(timeSelected);
  }, [timeSelected]);


  //show more button increment content height
  const [incrementPage, setIncrementPage] = React.useState<number>(10);

  //click "Daha çoxunu göstər" and increment the count and refresh height value
  const showMoreShowLess = () => {
    setIncrementPage((prevIncrement) => prevIncrement + 10);
  };

  //fixture modal open and close
  const { toggleFixtureModal } = useFixtureModal();

  
  React.useEffect(() => {
    if(selectedBottomNavigatorItem === 1) {
      fetchAccordingToDataGames(timeSelected);
      setHiddenCalendar(false);

      fetchLiveGames(); //only selected time and live (this status: all)
    } else if (selectedBottomNavigatorItem === 2 || selectedBottomNavigatorItem === 3){
      setHiddenCalendar(true);
      fetchLiveGames(); //only live
    }

  }, [selectedBottomNavigatorItem, timeSelected])


  //This function SHOWING SELECTED PRIORITY LEAGUES AND COUNTRIES MATCHS FIRST QUEUE (SEE: useLiveGamesContext() doc)
  const ShowFirstMatchDetails = () => {
    return (
      <div>
      {priorityData.slice(0, incrementPage).map((items, indexLivegamesData) => (
        <div key={indexLivegamesData} className="header" style={{ width: "100%" }}>
          <div className="header-games">
            <div className="left">
              <div className="skewed-flag">
                <img src={items.league?.flag ? items.league?.flag : './idmanstatlog.svg'} alt="flag" loading="lazy" />
              </div>

              <div className="skewed-right">
                <span id="country">{items.league?.country}</span>
                <span style={{ color: "#f5ef44", fontWeight: "lighter" }}>/</span>
                <span id="lig-and-round">
                  <span>{items.league?.name}</span>
                  <span style={{ fontWeight: "lighter" }}>-</span>
                  <span>{items.league?.round}</span>
                </span>
              </div>
            </div>

            <div className="right-icon">
              <img src="./listicon.svg" alt="listicon" loading="lazy" width={14} height={14} />
            </div>
          </div>
          <div className="content-games">
            <div className="games" onClick={() => toggleFixtureModal(indexLivegamesData.toString(), items, items.fixture.id)}>
              <div className="time">
                <span>{GamesByDate(items)}</span>
              </div>
              <div className="icons">
                <img src={items.teams.away?.logo ? items.teams.away?.logo : './idmanstatlog.svg'} alt="teamicon" loading="lazy" width={14} height={14} />
                <img src={items.teams.home?.logo ? items.teams.home?.logo : './idmanstatlog.svg'} alt="teamicon" loading="lazy" width={14} height={14} />
              </div>
              <div className="teams">
                <span>{items.teams.away?.name}</span>
                <span>{items.teams.home?.name}</span>
              </div>
              {/* IF MATCH FINISHED OR HALFTIMED SHOW MATCH GOALS  */}
              {items.fixture.status.short === "HT" || items.fixture.status?.short === "FT" ? (
                <div className="scores">
                  <span>{items.goals.away}</span>
                  <span>{items.goals.home}</span>
                </div>
              ) : (
                ""
              )}

              <div className="icon-in-the-games">
                <img src="./searchicon.svg" alt="searchicon" loading="lazy" />
                <img src="./star.svg" alt="staricon" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    )
  }

  const { setPopup } = useRegisterContext();




  return (
    <div className="games-wrapper">
      <div className="games-container">
        <div className="game">
          {loadingItems ? (
            <LoadingAnimInGames />
          ):(
            <div>
              {selectedIndex !== undefined && showed ? (
                <React.Fragment>
                  {liveGamesByLeagueClicked && liveGamesByLeagueClicked.length === 0 ? (
                  <div className="null-msg-live-league">
                    <span>Seçdiyiniz liqanın canlı oyunu yoxdur 🙄</span>
                    <button
                    onClick={() => {window.location.reload()}}
                    >Digərlərini gör</button>
                  </div>
                ) : (
                  <div>
                    {liveGamesByLeagueClicked.slice(0, incrementPage).map((items, indexLivegamesData) => (
                      <div key={indexLivegamesData} className="header" style={{ width: "100%" }}>
                        <div className="header-games">
                          <div className="left">
                            <div className="skewed-flag">
                              <img src={items.league?.flag ? items.league?.flag : './idmanstatlog.svg'} alt="flag" loading="lazy" />
                            </div>
          
                            <div className="skewed-right">
                              <span id="country">{items.league?.country}</span>
                              <span style={{ color: "#f5ef44", fontWeight: "lighter" }}>/</span>
                              <span id="lig-and-round">
                                <span>{items.league?.name}</span>
                                <span style={{ fontWeight: "lighter" }}>-</span>
                                <span>{items.league?.round}</span>
                              </span>
                            </div>
                          </div>
          
                          <div className="right-icon">
                            <img src="./listicon.svg" alt="listicon" loading="lazy" width={14} height={14} />
                          </div>
                        </div>
                        <div className="content-games">
                          <div className="games" onClick={() => toggleFixtureModal(indexLivegamesData.toString(), items, items.fixture.id)}>
                            <div className="time">
                              <span>{GamesByDate(items)}</span>
                            </div>
                            <div className="icons">
                              <img src={items.teams.away?.logo ? items.teams.away?.logo : './idmanstatlog.svg'} alt="teamicon" loading="lazy" width={14} height={14} />
                              <img src={items.teams.home?.logo ? items.teams.home?.logo : './idmanstatlog.svg'} alt="teamicon" loading="lazy" width={14} height={14} />
                            </div>
                            <div className="teams">
                              <span>{items.teams.away?.name}</span>
                              <span>{items.teams.home?.name}</span>
                            </div>
                            {/* IF MATCH FINISHED OR HALFTIMED SHOW MATCH GOALS  */}
                            {items.fixture.status.short === "HT" || items.fixture.status?.short === "FT" ? (
                              <div className="scores">
                                <span>{items.goals.away}</span>
                                <span>{items.goals.home}</span>
                              </div>
                            ) : (
                              ""
                            )}
          
                            <div className="icon-in-the-games">
                              <img src="./searchicon.svg" alt="searchicon" loading="lazy" />
                              <img src="./star.svg" alt="staricon" loading="lazy" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </React.Fragment>
              ):(
              <React.Fragment>
                {ShowFirstMatchDetails()} 
                {liveGamesData && liveGamesData.length === 0 ? (
                  <div className="null-msg">
                    <span>Deyəsən hələ maçlar başlamayıb🤨</span>
                  </div>
                ) : (
                  <div>
                    {liveGamesData.slice(0, incrementPage).map((items, indexLivegamesData) => (
                      <div key={indexLivegamesData} className="header" style={{ width: "100%" }}>
                        <div className="header-games">
                          <div className="left">
                            <div className="skewed-flag">
                              <img src={items.league?.flag ? items.league?.flag : './idmanstatlog.svg'} alt="flag" loading="lazy" />
                            </div>
          
                            <div className="skewed-right">
                              <span id="country">{items.league?.country}</span>
                              <span style={{ color: "#f5ef44", fontWeight: "lighter" }}>/</span>
                              <span id="lig-and-round">
                                <span>{items.league?.name}</span>
                                <span style={{ fontWeight: "lighter" }}>-</span>
                                <span>{items.league?.round}</span>
                              </span>
                            </div>
                          </div>
          
                          <div className="right-icon">
                            <img src="./listicon.svg" alt="listicon" loading="lazy" width={14} height={14} />
                          </div>
                        </div>
                        <div className="content-games">
                          <div className="games" onClick={() => toggleFixtureModal(indexLivegamesData.toString(), items, items.fixture.id)}>
                            <div className="time">
                              <span>{GamesByDate(items)}</span>
                            </div>
                            <div className="icons">
                              <img src={items.teams.away?.logo ? items.teams.away?.logo : './idmanstatlog.svg'} alt="teamicon" loading="lazy" width={14} height={14} />
                              <img src={items.teams.home?.logo ? items.teams.home?.logo : './idmanstatlog.svg'} alt="teamicon" loading="lazy" width={14} height={14} />
                            </div>
                            <div className="teams">
                              <span>{items.teams.away?.name}</span>
                              <span>{items.teams.home?.name}</span>
                            </div>
                            {/* IF MATCH FINISHED OR HALFTIMED SHOW MATCH GOALS  */}
                            {items.fixture.status.short === "HT" || items.fixture.status?.short === "FT" ? (
                              <div className="scores">
                                <span>{items.goals.away}</span>
                                <span>{items.goals.home}</span>
                              </div>
                            ) : (
                              ""
                            )}
          
                            <div className="icon-in-the-games">
                              <img src="./searchicon.svg" alt="searchicon" loading="lazy" />
                              <img src="./star.svg" alt="staricon" loading="lazy" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="button">
       <button onClick={showMoreShowLess}>Bütün Siyahı</button>
      </div>

      <div className="create-account-afish">
        <div
          className="afish-wrapper"
          style={{ width: "100%", height: "100%", background: "#f9dc19", display: "flex" }}>
          <div className="left">
            <span>Təqdim Edir:</span>

            <span>
              Idman
              <strong style={{ color: "#f9dc19" }}>Stat</strong>
            </span>
          </div>
          <div className="right" onClick={() => setPopup(true)}>
            <span>Hesab Yarat</span>
            <FaArrowRight id="arrowicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
