import React, { SetStateAction } from 'react'

//USER PROFILE EDIT MODAL CONTEXT

type userProfileType = {
     userProfileModal: boolean,
     setUserProfileModal: React.Dispatch<SetStateAction<boolean>>;
     toggleUserProfileModal: () => void;

     //change password modal
     changePassword: boolean,
     setChangePassword: React.Dispatch<SetStateAction<boolean>>;
     handleChangePassword: () => void;
}

type UserProfileModalChildrenProp = {
     children: React.ReactNode,
}

export const UserProfileModalContext = React.createContext<userProfileType | undefined>(undefined);

export const UserProfileModalContextProvider:React.FC<UserProfileModalChildrenProp> = ({ children }) => {

     const [userProfileModal, setUserProfileModal] = React.useState<boolean>(false);

     const toggleUserProfileModal = () => {
          setUserProfileModal(prevModal => !prevModal);
     }

     //change password
     const [changePassword, setChangePassword] = React.useState<boolean>(false);

     const handleChangePassword = () => {
          setChangePassword(true);
     }

     return (
          <UserProfileModalContext.Provider value={{
               userProfileModal, setUserProfileModal, toggleUserProfileModal,
               changePassword, setChangePassword, handleChangePassword
               }}>
               {children}
          </UserProfileModalContext.Provider>
     )
}

export const useProfileModal = () => {
     const context = React.useContext(UserProfileModalContext);

     if(context === undefined) {
          throw new Error('undefined is user profile edit modal context');
     } else {
          return context;
     }
}