import React from 'react'
import '../../../../styles/tipspage/tips.scss';
import Filters from './Filters';
import Cupons from './Cupons';
import RightSidebar from '../../HomePage/uitils/RightSidebar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { TopNavigation } from '../../HomePage/uitils/TopNavigation';
import { useTipModal } from '../../../../context/AddTipModalContext';



const TipsContainer = () => {

  return (
    <div className="tips-wrapper">
     {/* TIPS PAGE UITILS */}
     <Filters /> 
     <Cupons />
     <RightSidebar />
    </div>
  )
}

export default TipsContainer