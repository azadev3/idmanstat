import React, { SetStateAction } from 'react'
// ADD TIP MODAL CONTEXT

type AddTipModalType = {
     tipModal: boolean,
     setModal: React.Dispatch<SetStateAction<boolean>>;
     toggleModal: () => void,
}

type Children = {
     children: React.ReactNode,
}


export const AddTipModalContext = React.createContext<AddTipModalType | undefined>(undefined);

export const AddTipModalContextProvider:React.FC<Children> = ({ children }) => {

     const [tipModal, setModal] = React.useState<boolean>(false);
     const toggleModal = () => {
          setModal(true);
     }

     return (
          <AddTipModalContext.Provider value={{
               tipModal, setModal, toggleModal
          }}>
               {children}
          </AddTipModalContext.Provider>
     )
}

export const useTipModal = () => {
     const context = React.useContext(AddTipModalContext);

     if(context === undefined){
          throw new Error('add tip modal context is undefined');
     } else {
          return context;
     }
}