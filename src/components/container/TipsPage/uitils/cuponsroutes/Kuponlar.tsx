import React from "react";
import "../../../../../styles/tipspage/tips.scss";
import { IoMdMore } from "react-icons/io";
import LikeAndComment from "../../../LikeAndComment";

interface GroupedCupons {
  id: number;
  username: string;
  profile: string;
  minustipcount: string;
  tipcount: string;
  guesstime: string;
  team1: string;
  team2: string;
  teamlogo1: string;
  teamlogo2: string;
  totalgoals: string;
  coefficientcount: string;
  coefficientcount2?: string;
  totalcuponcount: string;
}

const Kuponlar = () => {
  const GroupedCuponItems: GroupedCupons[] = [
    {
      id: 1,
      username: "ZavoO",
      profile: "./examprof.svg",
      minustipcount: "-34.68",
      tipcount: "36",
      guesstime: "3",
      team1: "Western United",
      team2: "Adelaide United",
      teamlogo1: "./teamlogosmall1.svg",
      teamlogo2: "./teamlogosmall2.svg",
      totalgoals: "Under 3.5",
      coefficientcount: "1.67",
      coefficientcount2: "1.67",
      totalcuponcount: "4",
    },
    {
      id: 2,
      username: "ZavoO",
      profile: "./examprof.svg",
      minustipcount: "-34.68",
      tipcount: "36",
      guesstime: "3",
      team1: "Western United",
      team2: "Adelaide United",
      teamlogo1: "./teamlogosmall1.svg",
      teamlogo2: "./teamlogosmall2.svg",
      totalgoals: "Under 3.5",
      coefficientcount: "1.67",
      coefficientcount2: "1.67",
      totalcuponcount: "4",
    },
    
  ];

  return (
    <div className="cupons-in-tipspage">
      {GroupedCuponItems.map((guess) => (
        <div key={guess.id} className="user-guess-container">
          <div className="user-header">
            <div className="left-user">
              <img src={guess.profile} alt="guess-profile" />
              <div className="username-and-tips">
                <span id="username">{guess.username}</span>
                <article className="tips">
                  <span id="minus-tip">{guess.minustipcount}</span>

                  <span id="tip">
                    <strong id="rectangle">.</strong>
                    {guess.tipcount} Tip
                  </span>
                </article>
              </div>
            </div>

            <div className="right-time">
              <span id="time">{guess.guesstime} dəqiqə əvvəl</span>
              {/* <IoMdMore id="moreicon" /> */}
            </div>
          </div>

          <div className="cupons-area">
            {/* Cupon COUNT */}
            <div className="top-cupon-counter">
              <div className="left-counter-area">
                <div className="imgwrap">
                  <img src="./cuponcountbackground.svg" alt="counter-cupon-icon" />
                  <span>{guess.totalcuponcount}</span>
                </div>

                <span id="titlecupon">Kupon</span>
              </div>

              <div className="right-coefficient-area">
                <div className="coefficient-total-count">
                  <span id="count">69.61</span>
                  <span id="title">Əmsal</span>
                </div>
              </div>
            </div>

            <div className="user-cupon-and-guess">
              <div className="cupon-and-coefficient">
                <div className="left-area-cupon-and-coefficient">
                  <div className="image-container">
                    <img src={guess.teamlogo1} alt="teamlogo1" id="img1" loading="lazy"/>
                    <img src={guess.teamlogo2} alt="teamlogo2" id="img2" loading="lazy"/>
                  </div>

                  <div className="titles">
                    <div className="teams">
                      <span id="team1">{guess.team1}</span>
                      <strong>-</strong>
                      <span id="team2">{guess.team2}</span>
                    </div>

                    <div className="total-goals">
                      <span id="totalgoalstitle">Total Goals: {guess.totalgoals}</span>
                    </div>
                  </div>
                </div>

                <div className="right-area-cupon-and-coefficient">
                  <span>{guess.coefficientcount}</span>
                </div>
              </div>
              
            </div>
          </div>
              <LikeAndComment />
        </div>
      ))}
    </div>
  );
};

export default Kuponlar;
