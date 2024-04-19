//LIG CONTEXT
//LEAGUE API and MORE DATA

import React, { SetStateAction } from "react";
import axios from "axios";
import { League } from "../components/container/HomePage/uitils/LeftSidebarUitils/Ligs";
import { useQuery } from "react-query";

type LeagueContextType = {
  leagues: League[];
  setLeagues: React.Dispatch<SetStateAction<League[]>>;
  fetchDataLeague: any; //fech data function
  mainLigs: League[];
  setMainLigs: React.Dispatch<SetStateAction<League[]>>;

  //add tip leagues (special for Tip Əlavə Et area);
  addTipLeagues: League[];
  setAddTipLeagues: React.Dispatch<SetStateAction<League[]>>;

  ligCountry: string | null,
  setLigCountry: React.Dispatch<SetStateAction<string | null>>;
};

type PropType = {
  children: React.ReactNode;
};

export const LigContext = React.createContext<LeagueContextType | undefined>(undefined);

export const LigContextProvider: React.FC<PropType> = ({ children }) => {
  const [leagues, setLeagues] = React.useState<League[]>([]); //all ligs
  const [mainLigs, setMainLigs] = React.useState<League[]>([]); //main ligs we get check main ligs in all ligs
  const [addTipLeagues, setAddTipLeagues] = React.useState<League[]>([]); //for special ADD TIP MODAL leagues (this includes only here);
  const [ligCountry, setLigCountry] = React.useState<string | null>("");

  // const fetchDataLeague = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
  //     headers: {
  //       "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
  //       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //     },
  //   };

  //   const response = await axios.request(options);

  //   try {
  //     if (response.data) {
  //       //get ALL leagues from leagues;
  //       const allLigs: League[] = response.data.response.map((leagues: any) => leagues.league);

  //       //main leagues constant
  //       const mainLeaguesNames = [
  //         "Premier League",
  //         "Ligue 1",
  //         "Bundesliga",
  //         "Serie A",
  //         "Eredivisie",
  //         "LaLiga",
  //         "Champions League",
  //         "Europa League",
  //         "Europa Conference League",
  //         "Euro Qualification",
  //       ];

  //       //get MainLeagues from ALL Ligs;
  //       const MainLeagues = allLigs.filter((mainligs: any) => {
  //         return mainLeaguesNames.some((name: any) => mainligs.name.includes(name));
  //       });

  //       //get MainLeagues from A to B;
  //       const sortedMainLigs = MainLeagues.sort((a: League, b: League) => {
  //         return a.name.localeCompare(b.name);
  //       });

  //       //Remove MainLeagues from OtherLeagues (ALL lig);
  //       const removedMainLeaguesFromAllLeagues = allLigs.filter((leagues: any) => {
  //         return !mainLeaguesNames.some((name: any) => leagues.name.includes(name));
  //       });

  //       setMainLigs(sortedMainLigs); //this main leagues for left-sidebar main leagues
  //       setLeagues(removedMainLeaguesFromAllLeagues); //this other leagues for left-sidebar other leagues
  //       setAddTipLeagues(allLigs); //this ADD TIP MODAL leagues for "Tip Elave Et" leagues; (all ligs show);
        
  //     }
  //   } catch (error) {
  //     console.log("api error", error);
  //   }
  // };
 
  // const fetchDataLeague = async () => {
  //   try {
  //     const api = 'http://127.0.0.1:8000/flash/api/popular-and-all-leagues/';
  //     const response = await axios.get(api);
  //     if(response.data){
  //       setMainLigs(response.data.data.popular_leagues)
  //       const AllLeaguesForTipModal = response.data.data.all_leagues.concat(response.data.data.popular_leagues);
  //       setAddTipLeagues(AllLeaguesForTipModal);
  //       setLeagues(response.data.data.all_leagues);
  //     } else {
  //       console.log(response.status);
  //     }
  //   } catch (error) {
  //     console.log('popular league and league api endpoint error', error);
  //   }
  // }

  const fetchDataLeagueQuery = useQuery(['popular-and-all-leagues'], async () => {
    try {
      const api = 'http://127.0.0.1:8000/flash/api/popular-and-all-leagues/';
      const response = await axios.get(api);
      if(response.data){
        setMainLigs(response.data.data.popular_leagues)
        const AllLeaguesForTipModal = response.data.data.all_leagues.concat(response.data.data.popular_leagues);
        setAddTipLeagues(AllLeaguesForTipModal);
        setLeagues(response.data.data.all_leagues);
        return response.data.data;
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log('popular league and league api endpoint error', error);
      throw error;
    }
  }, {
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });

  const fetchDataLeague = fetchDataLeagueQuery;

  return (
    <LigContext.Provider value={{ 
      setLigCountry, ligCountry,
      setLeagues, leagues, fetchDataLeague, mainLigs, setMainLigs, setAddTipLeagues, addTipLeagues
      }}>
      {children}
    </LigContext.Provider>
  );
};

export const useLigApi = () => {
  const context = React.useContext(LigContext);

  if (context === undefined) {
    throw new Error("undefined is country api");
  } else {
    return context;
  }
};
