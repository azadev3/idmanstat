import React from 'react'
import '../../../../../styles/container/container.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import CarouselComp from '../../../../CarouselComp';


const CarouselInner = () => {

  return (
    <div className="carousel-inner">
      <CarouselComp />
    </div>
  )
}

export default CarouselInner