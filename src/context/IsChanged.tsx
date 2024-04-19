//FAV TEAM AND FAV LEAGUE SELECTED VALUES IS CHANGED TRUE OR FALSE CONTEXT
//IF IS CHANGED === TRUE ? SHOW NEXT TO THE + BUTTON - (NEGATIVE VALUE)
//SO , IS CHANGED IF EQUAL THE TRUE BOOLEAN , HE IS CHANGED OR DELETED ADDED FAV LEAGUE, OR TEAM

import React, { SetStateAction } from 'react'

type isChangedContextTypes = {
     isChanged: boolean,
     setIsChanged: React.Dispatch<SetStateAction<boolean>>;
}

type isChangedContextProps = {
     children: React.ReactNode,
}

export const isChangedContext = React.createContext<isChangedContextTypes | undefined>(undefined);

export const IsChangedContextProvider:React.FC<isChangedContextProps> = ({ children }) => {

     const [isChanged, setIsChanged] = React.useState<boolean>(false);

     return (
          <isChangedContext.Provider value={{ isChanged, setIsChanged }}>
               {children}
          </isChangedContext.Provider>
     )
}

export const useChangedBoolean = () => {
     const context = React.useContext(isChangedContext);

     if(context === undefined){
          throw new Error('isChangedContext boolean value provider is undefined or other error...');
     } else {
          return context;
     }
}