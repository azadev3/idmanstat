import React, { SetStateAction } from 'react'
import '../../../../../styles/tipspage/addtipmodal.scss';
import { LuChevronLeft } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { useTipModal } from '../../../../../context/AddTipModalContext';
import { usePostTipModal } from '../../../../../context/PostTipModalContext';

type Props = {
  setSelectedLig: React.Dispatch<SetStateAction<string | null>>;
  selectedlig: string | null;
  selectedmatch: number | null;
  setSelectedMatch: React.Dispatch<SetStateAction<number | null>>;
  
}

const AddTipModalHeader = ({ setSelectedLig, selectedlig, selectedmatch, setSelectedMatch }:Props) => {

  const { setModal } = useTipModal();

  const { postTipModal, setPostTipModal } = usePostTipModal();

  const getBack = () => {
    if(selectedlig) {
      setSelectedMatch(null);
      if(selectedmatch === null){
        setSelectedLig(null);
      }
    } else if (postTipModal){
      setPostTipModal(true)
    } else {
      setPostTipModal(true)
    }
  }

  return (
    <div className='header-add-tipmodal'>
     <LuChevronLeft id='lefticon' onClick={getBack}/>

     <span>Kupon Hazırla</span>

     <IoCloseSharp id='closemodalicon'
     onClick={() => setModal(false)}
     />
    </div>
  )
}

export default AddTipModalHeader