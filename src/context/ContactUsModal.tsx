import React, { SetStateAction } from 'react'

type ContactModalType = {
     contact: boolean,
     setContact: React.Dispatch<SetStateAction<boolean>>;
     toggleContactModal: () => void;
}

type ContactChildrenProps = {
     children: React.ReactNode,
}

export const ContactModalContext = React.createContext<ContactModalType | undefined>(undefined);

export const ContactModalContextProvider:React.FC<ContactChildrenProps> = ({ children }) => {

     const [contact, setContact] = React.useState<boolean>(false);

     const toggleContactModal = () => {
          setContact(true);
     }


     return (
          <ContactModalContext.Provider value={{contact,setContact, toggleContactModal}}>
               {children}
          </ContactModalContext.Provider>
     )
}

export const useContactModal = () => {
     const context = React.useContext(ContactModalContext);

     if(context === undefined) {
          throw new Error('undefined contact modal context');
     } else {
          return context;
     }
}