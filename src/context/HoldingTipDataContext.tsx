import React, { SetStateAction } from 'react'

type HoldingTipType = {
     holdTips: any,
     setHoldTips: React.Dispatch<SetStateAction<any>>
}

type ChildType = {
     children: React.ReactNode,
}

export const HoldingTipContext = React.createContext<HoldingTipType | undefined>(undefined);

export const HoldingTipContextProvider:React.FC<ChildType> = ({children}) => {

     const [holdTips, setHoldTips] = React.useState<any>();

     return (
          <HoldingTipContext.Provider value={{holdTips, setHoldTips}}>
               {children}
          </HoldingTipContext.Provider>
     )
}

export const useHoldTipHook = () => {
     const context = React.useContext(HoldingTipContext);

     if(context === undefined) {
          throw new Error('undefined hold tip hook');
     } else {
          return context;
     }
}
