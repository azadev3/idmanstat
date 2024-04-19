import React from 'react'
import '../../../styles/container/container.scss'
import { TopNavigation } from './uitils/TopNavigation'
import LeftSidebar from './uitils/LeftSidebar'
import Content from './uitils/Content'
import RightSidebar from './uitils/RightSidebar'

const Homepage = () => {
  return (
    <div className="homepage">
     <TopNavigation>
       <img src='./footballicon.svg' alt='football-icon' loading='lazy'/>
       / Football
     </TopNavigation>

     <div className='homepage-content'>
     <LeftSidebar />
     <Content />
     <RightSidebar />
     </div>
    </div>
  )
}

export default Homepage