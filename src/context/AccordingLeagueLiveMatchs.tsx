//SOL SIDEBARDA CLICK OLUNAN LIGALARA, OLKE LIGALARINA GORE 
//ORTADAKI CANLI OYUNLARI GUNCELLE VE CLICK OLUNAN LIGA HANSIDIRSA
//O LIGANIN VEYA OLKENIN LIGASININ CANLI OYUNU VARSA, ONU GOSTER..

//CLICKED ON THE LEFT SIDEBAR LEAGUES, COUNTRY LEAGUES
//WHICH IS THE LEAGUE THAT HAS GUNCELLE AND CLICK LIVE GAMES
//IF THAT LEAGUE OR COUNTRY'S LEAGUE HAS A LIVE GAME, SHOW IT..

import React, { SetStateAction } from 'react'
import { GameType } from '../components/container/HomePage/uitils/ContentUitils/ContentRoutes/Games';

type ByLiveMatchToLeaguesType = {
     showed: {[key:number]: boolean},
     setShowed: React.Dispatch<SetStateAction<{[key:number]: boolean}>>;

     selectedIndex: number | undefined,
     setSelectedIndex: React.Dispatch<SetStateAction<number | undefined>>;

     ligid: string,
     setLigidForLiveMatchUpdated: React.Dispatch<SetStateAction<string>>;

     liveGamesByLeagueClicked: GameType[],
     setLiveGamesByLeagueClicked: React.Dispatch<SetStateAction<GameType[]>>;
}

type PropChildren = {
     children: React.ReactNode,
}

export const ShowAccordingLiveMatchContext = React.createContext<ByLiveMatchToLeaguesType | undefined>(undefined);

export const ShowAccordingLiveMatchContextProvider:React.FC<PropChildren> = ({children}) => {

     const [showed, setShowed] = React.useState<{[key:number]:boolean}>({});
     const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>();
     const [ligid, setLigidForLiveMatchUpdated] = React.useState<string>("");
     const [liveGamesByLeagueClicked, setLiveGamesByLeagueClicked] = React.useState<GameType[]>([]);

     return (
          <ShowAccordingLiveMatchContext.Provider 
          value={{showed, setShowed, selectedIndex, setSelectedIndex, ligid, setLigidForLiveMatchUpdated, liveGamesByLeagueClicked, setLiveGamesByLeagueClicked}}>
               {children}
          </ShowAccordingLiveMatchContext.Provider>
     )
}

export const useLiveMatchShowContext = () => {
     const context = React.useContext(ShowAccordingLiveMatchContext);
     
     if(context === undefined){
          throw new Error("undefined show live match context according to league clicking error");
     } else {
          return context;
     }
}