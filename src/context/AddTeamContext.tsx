import React, { SetStateAction } from 'react';

type AddTeamContextTypes = {
     addTeam: [string, string][];
     setAddTeam: React.Dispatch<SetStateAction<[string, string][]>>;
     addFavouriteTeam: (value: string, logo: string) => void;
     isAdded: boolean,
     setIsAdded: React.Dispatch<SetStateAction<boolean>>;
};

type AddTeamChildrenProp = {
     children: React.ReactNode;
};

export const AddTeamContext = React.createContext<AddTeamContextTypes | undefined>(undefined);

export const AddTeamContextProvider: React.FC<AddTeamChildrenProp> = ({ children }) => {
     
     // function adds the teams
     const [addTeam, setAddTeam] = React.useState<[string, string][]>([]);

     // if is added state
     const [isAdded, setIsAdded] = React.useState<boolean>(false);

     // max added team number
     const maxnum: number = 20;

     // if count small from 20 when add team else no add team and set warning message
     const addFavouriteTeam = (title: string, logo: string) => {
          if (addTeam.length < maxnum) {
               setAddTeam(prevadd => prevadd.some(team => team[0] === title || team[1] === logo) ? prevadd : [...prevadd, [title, logo]]);
          } 
     };

     return (
          <AddTeamContext.Provider
               value={{
                    addTeam,
                    setAddTeam,
                    addFavouriteTeam,
                    isAdded, setIsAdded
               }}>
               {children}
          </AddTeamContext.Provider>
     );
};

export const useAddTeamContext = () => {
     const context = React.useContext(AddTeamContext);

     if (context === undefined) {
          throw new Error('undefined is add team context');
     } else {
          return context;
     }
};
