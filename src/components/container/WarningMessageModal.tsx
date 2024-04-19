import React from 'react'
import '../../styles/loginregister/optionspage.scss'
import { IoWarningOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useAddTeamContext } from '../../context/AddTeamContext';


type children = {
  children: React.ReactNode
}

const WarningMessageModal = ({children}: children) => {

  return (
    <div className='warning-msg'>
      <div className="header">
      <IoIosClose id='close-icon' />
      </div>
      <IoWarningOutline id='warnicon'/>
      {children}
    </div>
  )
}

export default WarningMessageModal