import React from 'react'
import '../styles/global.scss';
import { useRegisterContext } from '../context/RegisterContext';
import { useTeamSelectModal } from '../context/RegisterOptionContext';
import { useContactModal } from '../context/ContactUsModal';
import { useFixtureModal } from '../context/MatchFixturesModal';

type Wrapper = {
     children: React.ReactNode;
}

export const Wrapper:React.FC<Wrapper> = ({ children }) => {

     //if open the popup modal or other modals add the classname to container div 
     const { popup } = useRegisterContext();
     const { teamModal, ligModal } = useTeamSelectModal();
     const { contact } = useContactModal();
     const { fixtureModal } = useFixtureModal();

     return (
          <div className={`wrapper ${popup || teamModal || ligModal || contact || fixtureModal ? 'wrapper-isPopup' : ''}`}>
               {children}
          </div>
     )
}