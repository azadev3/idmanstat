import React, { Children } from 'react'
import TopHeader from '../../topheader/TopHeader'
import SecondHeader from '../SecondHeader'
import { TopNavigation } from '../../container/HomePage/uitils/TopNavigation'
import '../../../styles/secondheader/pages.scss';
import ComingSoon from '../../ComingSoon';

const Basketball = () => {
  return (
    <div className='wrapper-basketball'>
     <TopHeader />
     <SecondHeader />
     <TopNavigation>
          <img src='./blackicons/basketball.svg' alt='basketball-icon' />
          /basketball
     </TopNavigation>
     <ComingSoon>
      <span>
      <strong>Basketball</strong> Tezliklə !
      </span>
     </ComingSoon>
    </div>
  )
}

export default Basketball