import React from 'react'

type NavigatorContextType = {
     navigator: string,
     setNavigator: (value:string) => void,
     toggleNavigator: (value:string) => void,
     navigatorProfile: string,
     setNavigatorProfile: (value:string) => void,
     toggleNavigatorUserProfile: (value:string) => void,
     activePage: string,
     setActivePage: (value:string) => void,
     activePageProfile: string,
     setActivePageProfile: (value:string) => void,
     navigatorActiving: string,
     setNavigatorActiving: (value:string) => void,
     toggleNavigatorActiving: (value:string) => void,
     activePageActiving: string,
     setActivePageActiving: (value:string) => void,
}

type childrenType = {
     children: React.ReactNode,
}

export const NavigatorContext = React.createContext<NavigatorContextType | undefined>(undefined);


export const NavigatorContextProvider:React.FC<childrenType> = ({ children }) => {

     const [navigator, setNavigator] = React.useState("oyunlar");
     const [navigatorProfile, setNavigatorProfile] = React.useState("Əsas Səhifə");
     const [activePage, setActivePage] = React.useState("oyunlar");
     const [activePageProfile, setActivePageProfile] = React.useState("Əsas Səhifə");
     const [activePageActiving, setActivePageActiving] = React.useState("Axış");
     const [navigatorActiving, setNavigatorActiving] = React.useState("Axış");
     
     const toggleNavigator = (path:string) => {
          setNavigator(path);
          setActivePage(path);
     }

     const toggleNavigatorUserProfile = (path: string) => {
          setNavigatorProfile(path);
          setActivePageProfile(path);
     }

     const toggleNavigatorActiving = (path: string) => {
          setNavigatorActiving(path);
          setActivePageActiving(path);
     }


     return (
          <NavigatorContext.Provider 
          value={{
               navigator, setNavigator, 
               navigatorProfile, setNavigatorProfile,
               toggleNavigator, toggleNavigatorUserProfile, 
               activePage, setActivePage,
               setActivePageProfile, activePageProfile,
               setNavigatorActiving, navigatorActiving,
               toggleNavigatorActiving,setActivePageActiving,
               activePageActiving
          }}>
               {children}
          </NavigatorContext.Provider>
     )
}

export const useNavigatorContext = () => {
     const context = React.useContext(NavigatorContext);

     if(context === undefined){
          throw new Error('undefined usenavigatorcontext');
     } else {
          return context;
     }
}