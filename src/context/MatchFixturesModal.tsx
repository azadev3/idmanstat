//--- LIVE GAMES CONTENT IN MATCH FIXTURES DETAILS MODAL CONTEXT

import React, { SetStateAction } from 'react'
import { GameType } from '../components/container/HomePage/uitils/ContentUitils/ContentRoutes/Games';

type FixturesModalType = {
     fixtureModal: string | "";
     setFixtureModal: React.Dispatch<SetStateAction<string | "">>;
     toggleFixtureModal: (id: string, liveGamesData: GameType | null, fixtureid: number) => void;

     fixtureDataForModal: GameType | null;
     setFixtureDataForModal: React.Dispatch<SetStateAction<GameType | null>>;

     fixtureID: number | undefined,
     setFixtureID: React.Dispatch<SetStateAction<number | undefined>>;
};

type childrenType = {
     children: React.ReactNode
};

export const FixtureModalContext = React.createContext<FixturesModalType| undefined>(undefined);

export const FixtureModalContextProvider:React.FC<childrenType> = ({ children }) => {

     const [fixtureModal, setFixtureModal] = React.useState(""); //for boolean state 

     const [fixtureDataForModal, setFixtureDataForModal] = React.useState<GameType | null>(null); //for given the data on the fixtures

     const [fixtureID, setFixtureID] = React.useState<number | undefined>();

     const toggleFixtureModal = (id: string, liveGamesData: GameType | null, fixtureid: number) => {
          setFixtureModal(id);
          setFixtureDataForModal(liveGamesData);
          setFixtureID(fixtureid);
          console.log(fixtureid);
     }

     return (
          <FixtureModalContext.Provider value={{
               fixtureModal, toggleFixtureModal, setFixtureModal, setFixtureDataForModal, fixtureDataForModal, fixtureID, setFixtureID
               }}>
               {children}
          </FixtureModalContext.Provider>
     )
}

export const useFixtureModal = () => {
     const context = React.useContext(FixtureModalContext);

     if(context === undefined){
          throw new Error('undefined fixture modal context');
     } else {
          return context;
     }
};