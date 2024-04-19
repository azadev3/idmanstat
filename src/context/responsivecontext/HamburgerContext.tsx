import React, { SetStateAction } from 'react'

type HamburgerContextType = {
     hamburgerMenu: boolean,
     setHamburgerMenu: React.Dispatch<SetStateAction<boolean>>;
     toggleHamburgerMenu: () => void;
}

type HamburgerContextChildrenProp = {
     children: React.ReactNode,
}

export const HamburgerContext = React.createContext<HamburgerContextType| undefined>(undefined);

export const HamburgerContextProvider:React.FC<HamburgerContextChildrenProp> = ({ children }) => {

     const [hamburgerMenu, setHamburgerMenu] = React.useState<boolean>(false);

     const toggleHamburgerMenu = () => {
          setHamburgerMenu(true);
     }


     return (
          <HamburgerContext.Provider value={{setHamburgerMenu, hamburgerMenu, toggleHamburgerMenu}}>
               {children}
          </HamburgerContext.Provider>
     )
}


export const useHamburgerContext = () => {
     const context = React.useContext(HamburgerContext);

     if(context === undefined) {
          throw new Error('undefined is hamburger menu context');
     } else {
          return context;
     }
};