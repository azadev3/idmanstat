import React from "react";
import "../../../../../../../styles/fixturemodal/navigators.scss";
import { GameType } from "../Games";
import axios from "axios";
import { useEventsApi } from "../../../../../../../context/EventsApiContext";
import { useFixtureModal } from "../../../../../../../context/MatchFixturesModal";

export type EventType = {
  assist: {
    //oyuncu deyisikliyi olarken gelen oyuncu (the assist name)
    id: number;
    name: string;
    type: string;
  };
  comments: any;
  detail: string;
  player: {
    //normal oyuncu. oyuncu deyisikliyi olarken yerini veren oyuncu (the name of the playing player)
    id: number;
    name: string;
  };
  team: {
    id: number;
    logo: string;
    name: string;
  };
  time: {
    elapsed: number;
    extra: any;
  };
  type: string;
};

const Events = ({ items }: { items: GameType | null }) => {
  const score = items?.score;

  //get events in the event context (match events);
  const { fixtureID, fixtureModal } = useFixtureModal();
  const { events, fetchDataForEvents } = useEventsApi();

  React.useEffect(() => {
    fetchDataForEvents(fixtureID);
    console.log(fixtureID);
  }, [fixtureModal]);

  //show helped tooltips for user;
  const [tooltipCard, setTooltipCard] = React.useState<string>("");
  const [tooltipAssist, setTooltipAssist] = React.useState<string>("");

  const handleHover = (index:string) => {
    setTooltipCard(index);
  }

  const handleOutHover = (index:string) => {
    setTooltipCard("");
  }

  const handleHoverAssist= (index:string) => {
    setTooltipAssist(index);
  }

  const handleOutHoverAssist = (index:string) => {
    setTooltipAssist("");
  }

  const ToolTipContainer = () => {
    return (
      <div className="tooltip-wrapper">
        <span>Oyunçunun aldığı kart</span>
      </div>
    )
  }
  const ToolTipContainerAssist = () => {
    return (
      <div className="tooltip-wrapper">
        <span>Oyunçu dəyişikliyi</span>
      </div>
    )
  }

  return (
    <div className="events-container">
      <div className="firsthalf-results">
        <div className="firsthalfhead">
          {/* SCORES */}
          <span>
            Birinci Yarı - ({score?.halftime?.home === null ? "-" : score?.halftime?.home}:
            {score?.halftime?.away === null ? "-" : score?.halftime?.away})
          </span>
        </div>

        <div className="firsthalf-contents">
          {/* events in the firsthalf content */}
          {events &&
            events?.map((events, index) => (
              //time short is the 45 minutes rendered the firsthalf statuses
              <div key={index} style={{ width: "100%", height: "auto" }}>
                {events?.time?.elapsed <= 45 && (
                  <div className="statuses-on-users">
                    <div className="home">
                    {tooltipCard === index.toString() && <ToolTipContainer />}
                    {tooltipAssist === index.toString() && <ToolTipContainerAssist />}
                      <span id="minutes">{events?.time?.elapsed}'</span>
                      {events.detail === "Yellow Card" ? (
                        <img src="./yellowcardicon.svg" alt="yellowcard" 
                        onMouseOver={() => handleHover(index.toString())} //function for showing tooltip for easy user interface
                        onMouseLeave={() => handleOutHover(index.toString())}
                        />
                      ) : events.detail === "Red Card" ? (
                        <img src="./redcardicon.svg" alt="yellowcard" 
                        onMouseOver={() => handleHover(index.toString())}
                        onMouseLeave={() => handleOutHover(index.toString())}
                        />
                      ) : events.assist.name !== null ? (
                        <img src="./assisticon.png" alt="change-icon" 
                        onMouseOver={() => handleHoverAssist(index.toString())}
                        onMouseLeave={() => handleOutHoverAssist(index.toString())}
                        />
                      ) : null}
                      <span>{events?.player?.name}</span>
                      <strong style={{ fontSize: "11.5px", paddingLeft: "5px" }}>
                        {events?.assist?.name?.length !== null ? events?.assist?.name : ""}
                      </strong>
                    </div>
                    <div className="away">
                      <span id="minutes">{events?.time?.elapsed}'</span>
                      {events.detail === "Yellow Card" ? (
                        <img src="./yellowcardicon.svg" alt="yellowcard" 
                        onMouseOver={() => handleHover(index.toString())}
                        onMouseLeave={() => handleOutHover(index.toString())}
                        />
                      ) : events.detail === "Red Card" ? (
                        <img src="./redcardicon.svg" alt="yellowcard" 
                        onMouseOver={() => handleHover(index.toString())}
                        onMouseLeave={() => handleOutHover(index.toString())}
                        />
                      ) : events.assist.name !== null ? (
                        <img src="./assisticon.png" alt="change-icon" 
                        onMouseOver={() => handleHoverAssist(index.toString())}
                        onMouseLeave={() => handleOutHoverAssist(index.toString())}
                        />
                      ) : null}
                      <span>{events?.player?.name}</span>
                      <strong style={{ fontSize: "11.5px", paddingLeft: "5px" }}>
                        {events?.assist?.name?.length !== null ? events?.assist?.name : ""}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="secondhalf-results">
        <div className="secondhalfhead">
          {/* SCORES */}
          <span>
            İkinci Yarı - ({score?.fulltime?.home === null ? "-" : score?.fulltime?.home}:
            {score?.fulltime?.away === null ? "-" : score?.fulltime?.away})
          </span>
        </div>

        <div className="secondhalf-contents">
          {/* events in the seoncdhalf content */}

          {events && events.length === 0 ? (
            <span style={{color: 'mediumslateblue', marginTop: '6rem', letterSpacing: '-0.3px', fontSize: '13px'}}>
              Hələ ki heç bir statistika mövcud deyil. Çünki, oyun ya hələ başlamayıb, ya da başqa bir şey var.
            </span>
          ):(
            <div style={{width: '95%', height: 'auto'}}>
              {events?.map((events, index) => (
                //time short is the 45 minutes rendered the firsthalf statuses
                <div key={index} style={{ width: "100%", height: "auto" }}>
                  {events && events.time.elapsed >= 45 && (
                    <div className="statuses-on-users">
                      <div className="home">
                        {tooltipCard === index.toString() && <ToolTipContainer />}
                        {tooltipAssist === index.toString() && <ToolTipContainerAssist />}
                        <span id="minutes">{events?.time?.elapsed}'</span>
                        {events.detail === "Yellow Card" ? (
                            <img src="./yellowcardicon.svg" alt="yellowcard" 
                            onMouseOver={() => handleHover(index.toString())} //function for showing tooltip for easy user interface
                            onMouseLeave={() => handleOutHover(index.toString())}
                            />
                          ) : events.detail === "Red Card" ? (
                            <img src="./redcardicon.svg" alt="yellowcard" 
                            onMouseOver={() => handleHover(index.toString())}
                            onMouseLeave={() => handleOutHover(index.toString())}
                            />
                          ) : events.assist.name !== null ? (
                            <img src="./assisticon.png" alt="change-icon" 
                            onMouseOver={() => handleHoverAssist(index.toString())}
                            onMouseLeave={() => handleOutHoverAssist(index.toString())}
                            />
                          ) : null}
                        <span>{events?.player?.name}</span>
                        <strong style={{ fontSize: "11.5px", paddingLeft: "5px" }}>
                          {events?.assist?.name?.length !== null ? events?.assist?.name : ""}
                        </strong>
                      </div>
                      <div className="away">
                        <span id="minutes">{events?.time?.elapsed}'</span>
                        {events.detail === "Yellow Card" ? (
                            <img src="./yellowcardicon.svg" alt="yellowcard" 
                            onMouseOver={() => handleHover(index.toString())} //function for showing tooltip for easy user interface
                            onMouseLeave={() => handleOutHover(index.toString())}
                            />
                          ) : events.detail === "Red Card" ? (
                            <img src="./redcardicon.svg" alt="yellowcard" 
                            onMouseOver={() => handleHover(index.toString())}
                            onMouseLeave={() => handleOutHover(index.toString())}
                            />
                          ) : events.assist.name !== null ? (
                            <img src="./assisticon.png" alt="change-icon" 
                            onMouseOver={() => handleHoverAssist(index.toString())}
                            onMouseLeave={() => handleOutHoverAssist(index.toString())}
                            />
                          ) : null}
                        <span>{events?.player?.name}</span>
                        <strong style={{ fontSize: "11.5px", paddingLeft: "5px" }}>
                          {events?.assist?.name?.length !== null ? events?.assist?.name : ""}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
