import React from 'react'
import TopHeader from '../../topheader/TopHeader'
import SecondHeader from '../SecondHeader'
import { TopNavigation } from '../../container/HomePage/uitils/TopNavigation'
import ComingSoon from '../../ComingSoon'
import '../../../styles/comingsoon.scss';

const Handball = () => {
  return (
    <div className='wrapper-handball'>
     <TopHeader />
     <SecondHeader />
     <TopNavigation>
          <img src="./blackicons/handball.svg" alt="handball-icon" />
          /handball
     </TopNavigation>
     <ComingSoon>
      <span>
      <strong>Handball</strong> Tezliklə !
      </span>
     </ComingSoon>
    </div>
  )
}

export default Handball