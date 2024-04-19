//USER MATCH STATUS CONTEXT
//USER SELECTED MATCH AND SHOW MATCH ODDS, STATUSES, SCORES, GOALS, MATCH RESULTS...

import axios from 'axios';
import React, { SetStateAction } from 'react'


//type define fixture data for all values
export type FixtureData = {
     fixtureID: number;
     date: string;
     away: string;
     home: string;
     homelogo: string;
     awaylogo: string
}

//type define
type MatchStatusContextType = {
     matchstatus: FixtureData[]; 
     setMatchStatus: React.Dispatch<SetStateAction<FixtureData[]>>; 
     handleSelectMatchStatus: (date: string, away: string, home: string, homelogo: string, awaylogo: string, fixtureID: number) => void; 

     //fixture id given the value
     setFixtureID: React.Dispatch<SetStateAction<number | null>>;
     fixtureID: number | null;

     //setmatch odds and matchodds context values types
     matchOdd: string[] | null;
     setMatchOdd: React.Dispatch<SetStateAction<string[] | null>>;
     fetchMatchOdds: () => void;

     matchteams: {[key:string | number]: string[]},
     setMatchTeams: React.Dispatch<SetStateAction<{[key: string | number]: string[]}>>;
}


//type define for children prop
type MatchStatusContextChildrenProps = {
     children: React.ReactNode,
}


//create context
export const MatchStatusContext = React.createContext<MatchStatusContextType | undefined>(undefined);

//create provider and return values
export const MatchStatusContextProvider:React.FC<MatchStatusContextChildrenProps> = ({ children }) => {

     //match status
     const [matchstatus, setMatchStatus] = React.useState<FixtureData[]>([]);
     const [matchteams, setMatchTeams] = React.useState<{[key: string | number]: string[]}>({});

     const handleSelectMatchStatus = (date: string, away: string, home: string, homelogo: string, awaylogo: string, fixtureID: number) => {
          const fixture: FixtureData = { date, away, home, homelogo, awaylogo, fixtureID };
          setMatchStatus([fixture]);
          setMatchTeams((prevteams) => ({
               ...prevteams,
               [fixtureID]: [away, home],
          }))
     };

     //fixtures ID values
     const [fixtureID, setFixtureID] = React.useState<number | null>(null);

     //match odds (pre-match odds)
     const [matchOdd, setMatchOdd] = React.useState<string[] | null>(null);

     //this function get api request and get a all pre-match odds values
     const fetchMatchOdds = async () => {
          const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
            params: {
               fixture: fixtureID
            }, //fixture id at a request parameter value
            headers: {
              'X-RapidAPI-Key': '698e7cd394msha86e95346496330p10602ejsn518dfc936671',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
          };
      
          const response = await axios.request(options);
      
          try {
            if(response.data){
              setMatchOdd(response.data.response);
            }
          } catch (error) {
            console.log('odd err', error);
          }
          
     }

     return (
          <MatchStatusContext.Provider 
          value={{
               matchstatus, setMatchStatus, handleSelectMatchStatus, 
               fixtureID, setFixtureID, matchOdd, setMatchOdd, fetchMatchOdds,
               matchteams, setMatchTeams
          }}>
               {children}
          </MatchStatusContext.Provider>
     )
}

//create useMatchStatusContext
export const useMatchStatusContext = () => {
     const context = React.useContext(MatchStatusContext);

     if(context === undefined) {
          throw new Error('Matchstatus context error, is undefined');
     } else {
          return context;
     }
}