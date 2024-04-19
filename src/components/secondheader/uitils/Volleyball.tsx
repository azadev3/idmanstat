import React from 'react'
import TopHeader from '../../topheader/TopHeader'
import SecondHeader from '../SecondHeader'
import { TopNavigation } from '../../container/HomePage/uitils/TopNavigation'
import '../../../styles/comingsoon.scss';
import ComingSoon from '../../ComingSoon';

const Volleyball = () => {
  return (
    <div className='wrapper-volleyball'>
     <TopHeader />
     <SecondHeader />
     <TopNavigation>
          <img src="./blackicons/volleyball.svg" alt="volleyball-icon" />
          /volleyball
     </TopNavigation>
     <ComingSoon>
      <span>
      <strong>Voleybol</strong> Tezliklə !
      </span>
     </ComingSoon>
    </div>
  )
}

export default Volleyball