import React from 'react'
import TopHeader from '../../topheader/TopHeader'
import SecondHeader from '../SecondHeader'
import { TopNavigation } from '../../container/HomePage/uitils/TopNavigation'
import '../../../styles/secondheader/pages.scss'
import ComingSoon from '../../ComingSoon'
import '../../../styles/comingsoon.scss';

const Tenis = () => {
  return (
    <div className="wrapper-tennis">
     <TopHeader />
     <SecondHeader />
     <TopNavigation>
          <img src="./blackicons/tenis.svg" alt="tennis-icon" />
          /tennis     
     </TopNavigation>
     <ComingSoon>
      <span>
      <strong>Tenis</strong> Tezliklə !
      </span>
     </ComingSoon>
    </div>
  )
}

export default Tenis