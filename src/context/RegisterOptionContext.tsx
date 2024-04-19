import React from 'react'

type RegisterOptionType = {
  teamModal: boolean;
  setTeamModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTeamModal: () => void;

  ligModal: boolean,
  setLigModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLigModal: () => void;

  //page changed states
  pageChanged: boolean,
  setPageChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

type RegisterOptionProps = {
  children: React.ReactNode;
};

export const RegisterOptionContext = React.createContext<RegisterOptionType | undefined>(undefined);


export const RegisterOptionContextProvider: React.FC<RegisterOptionProps> = ({ children }) => {

  //give it's value for close global user profile modal

  //TEAM MODAL
  const [teamModal, setTeamModal] = React.useState<boolean>(false);
  const [ligModal, setLigModal] = React.useState<boolean>(false);

  //PAGE CHANGED STATES
  const [pageChanged, setPageChanged] = React.useState<boolean>(false); 


  const toggleTeamModal = () => {
    setTeamModal(true);
  };

  const toggleLigModal = () => {
    setLigModal(true);
  };

  return (
    <RegisterOptionContext.Provider
      value={{
        teamModal, setTeamModal,
        toggleTeamModal,
        setPageChanged, pageChanged,
        ligModal, setLigModal, toggleLigModal
      }}>
      {children}
    </RegisterOptionContext.Provider>
  );
};

export const useTeamSelectModal = () => {
  const context = React.useContext(RegisterOptionContext);
  if (context === undefined) {
    throw new Error("undefined is RegisterOptionContext");
  } else {
    return context;
  }
};
