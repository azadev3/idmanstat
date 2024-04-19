import React from 'react'
import { PiCaretDoubleDownDuotone } from "react-icons/pi";
import './responsivesecondheader.scss';
import { useSecondHeaderHamburgerStates } from '../../context/responsivecontext/SecondHeaderHamburger';
import Navigation from './Navigation';

const HamburgerSecondHeader = () => {

     const { sHamburger, toggleHamburgerSecondHeader } = useSecondHeaderHamburgerStates();

     const [hiddenItems, setHiddenItems] = React.useState<boolean>(false);


  return (
    <div className='hamburger-menu-in-second-header'>
          <div className="icon"
               onClick={toggleHamburgerSecondHeader}
          >
               <span>Kateqoriyalar</span>
               <PiCaretDoubleDownDuotone id='menu-open'/>
          </div>

          {sHamburger && (
               <div className='s-menu'>
                    <Navigation hiddenItems={hiddenItems} setHiddenItems={setHiddenItems}/>
               </div>
          )}
    </div>
  )
}

export default HamburgerSecondHeader