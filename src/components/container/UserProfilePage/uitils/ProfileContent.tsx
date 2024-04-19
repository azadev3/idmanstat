import React from 'react'
import '../../../../styles/userprofile/userprofile.scss';
import { IoShareSocial } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigatorContext } from '../../../../context/NavigatorContextOnTheContentItems';
import Mainpage from './profilecontentroutes/Mainpage';
import Cups from './profilecontentroutes/Cups';
import Favs from './profilecontentroutes/Favs';
import { useProfileModal } from '../../../../context/UserProfileEditModal';
import UserEditProfileModal from './UserEditProfile';


type navType = {
  id: number, 
  title: string,
}

const ProfileContent = () => {

  const NavItems:navType[] = [
    {
      id: 1,
      title: 'Əsas Səhifə',
    },
    {
      id: 2,
      title: 'Kuponlar',
    },
    {
      id: 3,
      title: 'Favorit',
    },
  ]

  //navigator context
  const { toggleNavigatorUserProfile, navigatorProfile, activePageProfile } = useNavigatorContext();

  //get username on localstorage
  const username = localStorage.getItem('username');
  
  //user profile modal 
  const { toggleUserProfileModal, userProfileModal } = useProfileModal();

  //show verification email box and hidden if user first registered system and never activate email token verification show box or hidden box
  const [verificationSuccess, setVerificationSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
  
  }, []);

  return (
    <div className="profile-content">
      {/* USER PROFILE EDIT MODAL */}
      {userProfileModal && <UserEditProfileModal />}

      <div className='picture-card'>
         <div className='top-header'>
          <article className='icon-share'>
            <IoShareSocial id='share'/>
          </article>
          <article className='icon-more' onClick={toggleUserProfileModal}>
            <IoMdMore id='more'/>
          </article>
         </div>

        <div className='center'>
          <div className='teams'>
            <div className='teamleft'>
              <img src='./azflag.svg' alt='azflag' />
            </div>

            <div className='logo-container'>
              <div className='logo'>
              <img src='./divavatar.svg' alt='center-logo-avatar' />
              <span>+</span>
              </div>
            </div>

            <div className='teamright'>
              <button>+</button>
            </div>
          </div>


          <div className='statuses'>
            <div className='title'>
              <span>{username && username.length > 0 ? username : 'Idmanstat_user'}</span>
            </div>

            <div className="tables">
            <div className='your-watchings'>
              <strong>0</strong>
              <span>İzləyirsiniz</span>
            </div>
            <div className='your-watched'>
              <strong>0</strong>
              <span>Sizi İzləyir</span>
            </div>
          </div>
            </div>
        </div>

        <div className='bottom-nav'>
          {NavItems.map((items) => (
            <Link to=''
            key={items.id} 
            style={{
              backgroundColor: 
              items.id === 1 && activePageProfile === 'Əsas Səhifə' ? '#484564' :
              items.id === 2 && activePageProfile === 'Kuponlar' ? '#484564' :
              items.id === 3 && activePageProfile === 'Favorit' ? '#484564' : "",
              borderTop: 
              items.id === 1 && activePageProfile === 'Əsas Səhifə' ? '3px solid #dbd644' :
              items.id === 2 && activePageProfile === 'Kuponlar' ? '3px solid #dbd644' :
              items.id === 3 && activePageProfile === 'Favorit' ? '3px solid #dbd644' : "", 
            }}
            className='links' 
            onClick={() => toggleNavigatorUserProfile(items.title)}>
              {items.title}
            </Link>
          ))}
        </div>
      </div>

      <div className='submit-email-message-container' style={{}}>
        <div className='left-title'>
            <img src='./emailicon.svg' alt='email-icon' />
            <article className="title">
              <strong>E-mail Ünvanını Təsdiqlə</strong>
              <span>24 saat ərzində e-mail ünvanınızı təstiqləməlisiniz.</span>
            </article>
        </div>

        <div className='right-button'>
          <button>Təsdiq e-mailini təkrar göndər</button>
        </div>
      </div>

      {navigatorProfile === 'Əsas Səhifə' && <Mainpage />}
      {navigatorProfile === 'Kuponlar' && <Cups />}
      {navigatorProfile === 'Favorit' && <Favs />}
    </div>
  )
}

export default ProfileContent