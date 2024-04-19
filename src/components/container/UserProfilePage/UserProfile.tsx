import React from 'react'
import '../../../styles/userprofile/userprofile.scss';
import TopHeader from '../../topheader/TopHeader';
import SecondHeader from '../../secondheader/SecondHeader';
import ContainerUserProfile from './uitils/ContainerUserProfile';
import Footer from '../../footer/Footer';
import { useProfileModal } from '../../../context/UserProfileEditModal';
import ChangePasswordModal from './uitils/ChangePasswordModal';
import { useContactModal } from '../../../context/ContactUsModal';
import { ModalOverlayStyle } from '../../../styles/ModalBackgroundStyle';
import ContactModal from '../../footer/ContactModal';
import { useTeamSelectModal } from '../../../context/RegisterOptionContext';
import TeamModal from '../../loginregister/optionspage/TeamModal';
import { useRegisterContext } from '../../../context/RegisterContext';
import LigModal from '../../loginregister/optionspage/LigModal';

const UserProfile = () => {

  const { changePassword } = useProfileModal();

  const { contact } = useContactModal();

  const { setPopup } = useRegisterContext();

  const { teamModal, ligModal } = useTeamSelectModal();

  React.useEffect(() => {
    if(teamModal || ligModal){
      setPopup(false);
    }
  }, [teamModal, ligModal])

  return (
    <React.Fragment>
    
    {/* SHOW USER CHANGE PASSWORD MODAL */}
    {changePassword && <div className='overlay'><ChangePasswordModal /></div>}
    
    {contact && <div style={ModalOverlayStyle}><ContactModal /></div>}

    {teamModal && <div style={ModalOverlayStyle}><TeamModal /></div>}

    {ligModal && <div style={ModalOverlayStyle}><LigModal /></div>}

    <div className='user-profile-wrapper' style={{
      opacity: changePassword ? '30%' : '100%',
      userSelect: changePassword ? 'none' : 'unset',
      pointerEvents: changePassword ? 'none' : 'unset'
    }}>
      <TopHeader />
      <SecondHeader />
      <ContainerUserProfile />
      <Footer />
    </div>
    </React.Fragment>
  )
}

export default UserProfile