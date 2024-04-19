import React, { SetStateAction } from 'react'
import { FixtureData } from './MatchStatusContext';

type PostTipModalType = {
     postTipModal: boolean,
     setPostTipModal: React.Dispatch<SetStateAction<boolean>>;

     selectedOddValue: {[key: number]: [string, string, string, string, string, string, string, string, string, string, string[], string, string, string]},
     setSelectedOddValue: React.Dispatch<SetStateAction<{[key:number]: [string, string, string, string, string, string, string, string, string, string, string[], string, string, string]}>>;

     selectedIndex: any,
     setSelectedIndex: React.Dispatch<SetStateAction<any>>;

     timeodd: string,
     setTimeOdd: React.Dispatch<SetStateAction<string>>,

     teamValues: any,
     setTeamValues: React.Dispatch<SetStateAction<any>>;

     maxOddAddedVal: number,
}

type ChildrenProp = {
     children: React.ReactNode,
}

export const PostTipModalContext = React.createContext<PostTipModalType | undefined>(undefined);

export const PostTipModalContextProvider:React.FC<ChildrenProp> = ({children}) => {

     const [postTipModal, setPostTipModal] = React.useState<boolean>(false);
     const [selectedOddValue, setSelectedOddValue] = React.useState<{[key: number]: [string, string, string, string, string, string, string, string, string, string, string[], string, string, string]}>({});
     const [selectedIndex, setSelectedIndex] = React.useState<any>();
      //user select allmatch, first-half, second-half
     const [timeodd, setTimeOdd] = React.useState<string>("allmatch");
     const maxOddAddedVal:number = 15;

     const [teamValues, setTeamValues] = React.useState();

     return (
          <PostTipModalContext.Provider value={{
               postTipModal, setPostTipModal,
               selectedIndex, setSelectedIndex,
               selectedOddValue, setSelectedOddValue,
               maxOddAddedVal, timeodd, setTimeOdd, teamValues, setTeamValues
               }}>
               {children}
          </PostTipModalContext.Provider>
     )
}

export const usePostTipModal = () => {
     const context = React.useContext(PostTipModalContext);

     if(context === undefined){
          throw new Error('undefined post tip modal context');
     } else {
          return context;
     }
}