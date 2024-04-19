import React, { SetStateAction } from 'react'
import { Tip } from '../types/TipType'

type TipDataContextType = {
     tips: Tip[];
     setTips: React.Dispatch<SetStateAction<Tip[]>>;
}

type ChildProp = {
     children: React.ReactNode
}

export const TipDataContext = React.createContext<TipDataContextType | undefined>(undefined);

export const TipDataContextProvider:React.FC<ChildProp> = ({ children }) => {

     const [tips, setTips] = React.useState<Tip[]>([]);

     return (
          <TipDataContext.Provider value={{ tips, setTips }}>
               {children}
          </TipDataContext.Provider>
     )
}

export const useTipData = () => {
     const context = React.useContext(TipDataContext);

     if(context === undefined) {
          throw new Error('undefined tip data context');
     } else {
          return context;
     }
}