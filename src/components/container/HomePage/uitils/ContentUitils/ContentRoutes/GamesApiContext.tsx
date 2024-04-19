import axios from "axios";
import React, { SetStateAction } from "react";
import { GameType } from "./Games";

type GamesApiType = {
  liveGamesData: GameType[]; //all games are in this state
  setLiveGamesData: React.Dispatch<SetStateAction<GameType[]>>; //set state function

  priorityData: GameType[]; //priority leagues and countries datas
  setPriorityData: React.Dispatch<SetStateAction<GameType[]>>; //priority leagues and countries datas 

  dateFormatForApi: (value: string) => void; //converted DD.MM.YYYY to YYYY-MM-DD;
  fetchAccordingToDataGames: (value: string) => void; //get fetch according by time
  fetchLiveGames: () => void; //this function return by only live games
};

type childrenGamesApi = {
  children: React.ReactNode;
};

export const GamesApiContext = React.createContext<GamesApiType | undefined>(undefined);

export const GamesApiContextProvider: React.FC<childrenGamesApi> = ({ children }) => {
  const [liveGamesData, setLiveGamesData] = React.useState<GameType[]>([]); //this keep up the all match details
  const [priorityData, setPriorityData] = React.useState<GameType[]>([]); //this keep up the selected match details showing first

  //the format time required by the api
  const dateFormatForApi = (date: string) => {
    const [day, month, year] = date.split(".");
    return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
  };

  // ------KEEP THE DATA ACCORDING TO DATES
  const fetchAccordingToDataGames = async (date: string) => {
    const formattedDate = dateFormatForApi(date);
    const options = {
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: { date: formattedDate },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        setLiveGamesData(response.data.response);
        //most popular countryes and her leagues
        const PriorityCountry = [
          'Azerbaidjan',
          'England',
          'France',
          'Germany',
          'Italy',
          'Netherlands',
          'Spain',
          'Turkey',
          'Belgium',
          'Switzerland',
        ];    
        
        const PriorityLeagues = [
          'Premyer Liqa',
          'Premier League',
          'Ligue 1',
          'Bundesliga',
          'Serie A',
          'Eredivisie',
          'LaLiga',
          'Champions League',
          'UEFA Europa League',
          'UEFA Europa Conference League',
          'World Cup - Qualification Africa',
        ];

        // const priorityCountry = response.data.response.filter((data:GameType) => {
        //   return PriorityCountry.includes(data?.league?.country);
        // }); 

        // const priorityLeagues = response.data.response.filter((data:GameType) => {
        //   return PriorityLeagues.includes(data?.league?.name);
        // });

        const doubledCountryAndLeagues: GameType[] = []; //define keep up the array in the priority leagues and countries
        //for example: Azerbaidjan - Premyer Liqa, Germany - Bundesliga, England - Premier League...
        response.data.response.forEach((el:GameType) => {
          if(PriorityCountry.includes(el.league?.country) && PriorityLeagues.includes(el.league?.name)) {
            doubledCountryAndLeagues.push(el);
          }
        });
        setPriorityData(doubledCountryAndLeagues);
      }
    } catch (error) {
      console.log(error, "livegames error");
    }
  };

  //FETCH ALL LIVE GAMES
  const fetchLiveGames = async () => {
    const options = {
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: { live: "all" },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data) {
        const data = response.data.response;
        setLiveGamesData(data);

        //most popular countryes and her leagues
        const PriorityCountry = [
          'Azerbaidjan',
          'England',
          'France',
          'Germany',
          'Italy',
          'Netherlands',
          'Spain',
          'Turkey',
          'Belgium',
          'Switzerland',
        ];    
        
        const PriorityLeagues = [
          'Premyer Liqa',
          'Premier League',
          'Ligue 1',
          'Bundesliga',
          'Serie A',
          'Eredivisie',
          'LaLiga',
          'Champions League',
          'UEFA Europa League',
          'UEFA Europa Conference League',
          'World Cup - Qualification Africa',
        ];

        // const priorityCountry = response.data.response.filter((data:GameType) => {
        //   return PriorityCountry.includes(data?.league?.country);
        // }); 

        // const priorityLeagues = response.data.response.filter((data:GameType) => {
        //   return PriorityLeagues.includes(data?.league?.name);
        // });

        const doubledCountryAndLeagues: GameType[] = []; //define keep up the array in the priority leagues and countries
        //for example: Azerbaidjan - Premyer Liqa, Germany - Bundesliga, England - Premier League...
        response.data.response.forEach((el:GameType) => {
          if(PriorityCountry.includes(el.league?.country) && PriorityLeagues.includes(el.league?.name)) {
            doubledCountryAndLeagues.push(el);
          }
        });

        setPriorityData(doubledCountryAndLeagues)
      }
    } catch (error) {
      console.log(error, "fixtures live all endpoint error");
    }
  };

  return <GamesApiContext.Provider value={{
     dateFormatForApi, fetchAccordingToDataGames, liveGamesData, setLiveGamesData, fetchLiveGames, priorityData, setPriorityData
  }}>{children}</GamesApiContext.Provider>;
};

export const useLiveGamesContext = () => {
     const context = React.useContext(GamesApiContext);

     if(context === undefined){
          throw new Error('useLiveGamesContext is error or undefined');
     }else {
          return context;
     }
}