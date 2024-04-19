import React, { SetStateAction } from 'react'

type RegisterContextType = {
     popup: boolean,
     setPopup: React.Dispatch<SetStateAction<boolean>>,
     togglePopup: () => void

     //navregister
     navRegister: string,
     setNavRegister: React.Dispatch<SetStateAction<string>>,
     setNavRegisterActivedPage: React.Dispatch<SetStateAction<string>>,
     navRegisterActivedPage: string,
}

type childrenType = {
     children: React.ReactNode,
}

export const RegisterContext = React.createContext<RegisterContextType | undefined>(undefined);

export const RegisterContextProvider:React.FC<childrenType> = ({ children }) => {

     const [popup, setPopup] = React.useState(false);

     const togglePopup = () => {
          setPopup(true);
     }

     //register & login navigation in the between
     const [navRegister, setNavRegister] = React.useState<string>("Daxil Ol");
     const [navRegisterActivedPage, setNavRegisterActivedPage] = React.useState<string>("Daxil Ol");
      
     return (
          <RegisterContext.Provider 
          value={{
               popup,
               setPopup,
               togglePopup,
               setNavRegister, navRegister,
               setNavRegisterActivedPage, navRegisterActivedPage
          }}>
               {children}
          </RegisterContext.Provider>
     )
}

export const useRegisterContext = () => {
     const context = React.useContext(RegisterContext);
     if(context === undefined){
          throw new Error('undefined register context');
     } else {
          return context;
     }
}