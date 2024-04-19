import React, { SetStateAction } from 'react'

type SecondHeaderHambType = {
     sHamburger: boolean,
     setShamburger: React.Dispatch<SetStateAction<boolean>>;
     toggleHamburgerSecondHeader: () => void;
}

type SecondHeaderHambTypeChildrenPropsType = {
     children: React.ReactNode,
}

export const HamburgerSecondHeader = React.createContext<SecondHeaderHambType | undefined>(undefined);

export const HamburgerSecondHeaderProvider:React.FC<SecondHeaderHambTypeChildrenPropsType> = ({ children }) => {

     const [sHamburger, setShamburger] = React.useState<boolean>(false);
     
     const toggleHamburgerSecondHeader = () => {
          setShamburger(!sHamburger);
     }

     return (
          <HamburgerSecondHeader.Provider value={{sHamburger, setShamburger, toggleHamburgerSecondHeader}}>
               {children}
          </HamburgerSecondHeader.Provider>
     )
}

export const useSecondHeaderHamburgerStates = () => {
     const context = React.useContext(HamburgerSecondHeader);

     if(context === undefined){
          throw new Error('undefined is second header hamburger states');
     } else {
          return context;
     }
}