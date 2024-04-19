import React from 'react'
import '../../../../styles/newspage/news.scss';
import RightSidebar from '../../HomePage/uitils/RightSidebar';
import LeftSidebar from '../../HomePage/uitils/LeftSidebar';
import News from './News';
import axios from 'axios';


const NewsContainer = () => {

 

  return (
     <div className="news-wrapper">
     {/* NEWS PAGE UITILS */}
     <LeftSidebar />
     <News />
     <RightSidebar />
    </div>
  )
}

export default NewsContainer