import React from "react";
import "../../../../../styles/tipspage/tips.scss";
import { IoMdMore } from "react-icons/io";
import { SlLike, SlDislike } from "react-icons/sl";
import { LiaCommentsSolid } from "react-icons/lia";
import { FaShare } from "react-icons/fa6";
import LikeAndComment from "../../../LikeAndComment";
import { useTipData } from "../../../../../context/TipDataContext";
import axios from "axios";

interface GuessType {
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
}

const TekliOyunlar = () => {
  
  const GuessItem: GuessType[] = [
    {
      id: 1,
      username: "IdmanStat",
      profile: "./idmanstatlog.svg",
      minustipcount: "-332.41",
      tipcount: "1",
      guesstime: "1",
      team1: "Western United",
      team2: "Adelaide United",
      teamlogo1: "./teamlogosmall1.svg",
      teamlogo2: "./teamlogosmall2.svg",
      totalgoals: "Under 3.5",
      coefficientcount: "1.67",
    },
    {
     id: 2,
     username: "IdmanStat",
     profile: "./idmanstatlog.svg",
     minustipcount: "-332.41",
     tipcount: "1",
     guesstime: "1",
     team1: "Western United",
     team2: "Adelaide United",
     teamlogo1: "./teamlogosmall1.svg",
     teamlogo2: "./teamlogosmall2.svg",
     totalgoals: "Under 3.5",
     coefficientcount: "1.67",
    },
   
  ];

  // //get tips
  // const { setTips, tips } = useTipData();
  // const getTipData = async () => {
  //   const token = localStorage.getItem('authtoken');
  //   const api = 'http://localhost:8000/flash/api/match-tip/'
  //   const response = await axios.get(api, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //       "Content-Type": 'application/json',
  //     }
  //   });

  //   try {
  //     if(response.data) {
  //       console.log(response.data, 'dataaaaa');
  //       setTips(response.data.data);
  //     } else {
  //       console.log(response.status, 'satusssss')
  //     }
  //   } catch (error) {
  //     console.log(error, 'tip data err');
  //   }
  // }

  // React.useEffect(() => {
  //   getTipData();

  //   console.log('salma')
  // }, [])



  return (
    <div className="container-t-o">
      {GuessItem.map((guess) => (
        <div className="user-guess-container" key={guess.id}>
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

            <LikeAndComment />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TekliOyunlar;
