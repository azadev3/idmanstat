import React from "react";
import { ActiveCuponTypes } from "./ActiveCups";
import "./responsiveactivecups.scss";

const ActiveCupsResponsiveComponent = () => {
  const ActiveCuponItems: ActiveCuponTypes[] = [
    {
      id: 1,
      gameresult: "1X",
      teamname: "Getafe",
      teamname2: "Villareal",
      teamicon: "./villareal.svg",
      teamicon2: "./villareal.svg",
      ligname: "Futbol / La Liga",
      time: "00:13:22",
      date: "30 Sentyabr 16:00",
      coefficient: "4.5",
    },
    {
      id: 2,
      gameresult: "1X",
      teamname: "Getafe",
      teamname2: "Villareal",
      teamicon: "./villareal.svg",
      teamicon2: "./villareal.svg",
      ligname: "Futbol / La Liga",
      time: "00:13:22",
      date: "30 Sentyabr 16:00",
      coefficient: "4.5",
    },
    {
      id: 3,
      gameresult: "1X",
      teamname: "Getafe",
      teamname2: "Villareal",
      teamicon: "./villareal.svg",
      teamicon2: "./villareal.svg",
      ligname: "Futbol / La Liga",
      time: "00:13:22",
      date: "30 Sentyabr 16:00",
      coefficient: "4.5",
    },
  ];

  return (
    <div className="responsive-active-cupons">
      <div className="title-active-cupons">
        <img src="/azflag.svg" alt="az-flag" />
        <span>Bu gün üçün aktiv kuponlar</span>
      </div>

      <div style={{width:'100%', height: 'auto'}}>
        {ActiveCuponItems.map((items) => (
          <div className="cupons-container" key={items.id}>
               <div className="left-cupon-area">
               <div className="title-match-result">
                    <span>Oyunun ümumi nəticəsi: 1X</span>
               </div>

               <div className='center-teams'>
                    <div className="left-team">
                    <img src={items.teamicon} alt='team1' />
                    <span>{items.teamname}</span>
                    </div>

                    <div className="center-statuses">
                    <span>{items.ligname}</span>
                    <span style={{fontWeight: '600', fontSize: '15px', color: 'darkslategrey'}}>{items.time}</span>
                    <span>{items.date}</span>
                    </div>

                    <div className="right-team">
                    <img src={items.teamicon2} alt='team2' />
                    <span>{items.teamname2}</span>
                    </div>
               </div>
               </div>

               <div className="right-cupon-area">
                    <div className="coefficient">
                         <span id="title">Əmsal</span>
                         <span id="coefficient_title">{items.coefficient}</span>                    
                    </div>

                    <button className="play-btn">
                         Oyna
                    </button>
               </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCupsResponsiveComponent;
