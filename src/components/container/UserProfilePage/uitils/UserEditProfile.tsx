import React from "react";
import "../../../../styles/userprofile/userprofile.scss";
import { FaPowerOff } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { useProfileModal } from "../../../../context/UserProfileEditModal";
import { useNavigate } from "react-router-dom";

const UserEditProfile = () => {
  const navigate = useNavigate();

  //change password modal
  const { handleChangePassword } = useProfileModal();
  //logout user account
  const [warnModal, setWarnModal] = React.useState<boolean>(false);

  const handleLogOut = () => {
    setWarnModal(true);
  }

  const logOut = () => {
      localStorage.removeItem('authtoken');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('nationality');
      navigate('/');
      window.location.reload();
  }

  //warn modal content
  const Yes_Or_No_Modal = () => {
    return (
      <div className="yes-or-no-modal">
        <h1>Hesabından çıxılacaq. Əminsən ?</h1>
        <div className="yes-no">
          <button className="yes-btn" onClick={logOut}>Bəli</button>
          <button className="no-btn" onClick={() => setWarnModal(false)}>Ləğv et</button>
        </div>
      </div>
    )
  }

  return (
    <div className="user-edit-profile-modal">
      {warnModal && <Yes_Or_No_Modal />}
      <div className="top-title">
        <span>Profil</span>
      </div>
      <div className="profile-editing-area">
        <div className="left-label-area">
          <div className="label-profile-image">
            <div className="imgwrapper">
              {/* <img src="./azflag.svg" alt="" /> */}
              <span>A</span>
            </div>

            <span id="labelname">Profil Şəkli</span>
          </div>

          <div className="label-country">
            <div className="imgwrapper">
              <img src="./profileflag.svg" alt="" />
            </div>

            <span id="labelname">Ölkə</span>
          </div>

          <div className="label-change-password">
            <div className="imgwrapper">
              <MdLockOutline id="lock-icon" />
            </div>

            <span id="labelname">Şifrəni Dəyiş</span>
          </div>

          <div className="label-change-telephone">
            <div className="imgwrapper">
              <CiMobile3 id="mobile-icon" />
            </div>

            <span id="labelname">Mobil Nömrə</span>
          </div>
        </div>

        <div className="right-change-area">
          <div className="change-button">
            <button>Dəyiş</button>
          </div>
          <div className="change-button">
            <span id="country-name">Azerbaijan</span>
            <button>Dəyiş</button>
          </div>
          <div className="change-button">
            <button onClick={handleChangePassword}>Dəyiş</button>
          </div>
          <div className="change-button">
            <button>Dəyiş</button>
          </div>
        </div>
      </div>

      <div className="bottom-exit-area">
        <button id="exit-button" onClick={handleLogOut}>
          <FaPowerOff id="exit-icon" />
        </button>
      </div>
    </div>
  );
};

export default UserEditProfile;
