import React from 'react'
import '../../../../styles/userprofile/userprofile.scss';
import { IoIosClose } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { useProfileModal } from '../../../../context/UserProfileEditModal';
import { FaRegEyeSlash } from 'react-icons/fa6';


const ChangePasswordModal = () => {

     const { setChangePassword, changePassword } = useProfileModal(); //for close modal onclick the closeicon

     //show and hidden passwords inputs (close open eyes effect)
     const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false);
     const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);

     //if outside clicked close the change-password-modal modal :P
     const modaldivref = React.useRef<HTMLDivElement | null>(null);

     React.useEffect(() => {
          const outsideClicked = (e: React.MouseEvent | MouseEvent) => {
               if(modaldivref.current && !modaldivref.current.contains(e.target as Node)){
                    setChangePassword(false);
               }
          }

          document.addEventListener('mousedown', outsideClicked); //push
          return () => document.removeEventListener('mousedown', outsideClicked); //cleart
     }, [changePassword]);

  return (
    <div className='change-password-modal' ref={modaldivref}>
      <div className="header">
          <h2>Şifrəni Dəyişdir</h2>
          <IoIosClose id='closeicon' onClick={() => setChangePassword(false)} /> 
      </div>

      <form className='change-password'>
          <div className="input-old-pass">
               <label>Hazırki Şifrəniz</label>
               <input type={showOldPassword ? 'text' : 'password'} placeholder='Şifrəni yazın...'/>
               {showOldPassword ? (
                    <FaRegEyeSlash id='eye-open' onClick={() => setShowOldPassword(!showOldPassword)}/>
               ):(
                    <FaRegEye id='eye-open' onClick={() => setShowOldPassword(!showOldPassword)}/>
               )}
          </div>

          <div className="input-new-pass">
               <label>Yeni Şifrə</label>
               <input type={showNewPassword ? 'text' : 'password'} placeholder='Yeni şifrəni yazın...'/>
               {showNewPassword ? (
                    <FaRegEyeSlash id='eye-open' onClick={() => setShowNewPassword(!showNewPassword)}/>
               ):(
                    <FaRegEye id='eye-open' onClick={() => setShowNewPassword(!showNewPassword)}/>
               )}
          </div>

          <button id='set-new-password' onClick={(e) => {e.preventDefault()}}>
               Şifrəni yenilə
          </button>
      </form>
     </div>
  )
}

export default ChangePasswordModal