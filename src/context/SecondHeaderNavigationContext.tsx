import React, { SetStateAction } from 'react'

type SecHeadNavContext = {
     navigate: string,
     setNavigate: (value: string) => void,
     active: string,
     setActive: (value: string) => void,
}

type ChildrenSecHeadNavContext = {
     children: React.ReactNode,
}

export const SecondHeaderNavContext = React.createContext<SecHeadNavContext | undefined>(undefined);

export const SecondHeaderNavContextProvider:React.FC<ChildrenSecHeadNavContext> = ({ children }) => {

     const [navigate, setNavigate] = React.useState<string>("Futbol");
     const [active, setActive] = React.useState<string>("Futbol");

     return (
          <SecondHeaderNavContext.Provider
           value={{
               navigate, setNavigate,
               active, setActive,
           }}
          >
               {children}
          </SecondHeaderNavContext.Provider>
     )
} 

export const useSecHeadNavContext = () => {
     const context = React.useContext(SecondHeaderNavContext);

     if(context === undefined) {
          throw new Error('undefined SecondHeaderNavigationContext');
     } else {
          return context;
     }
}