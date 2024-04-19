import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

type CarouselContentType = {
     id: number,
     typeInLeague: string,
     teamname: string,
     teamname2: string,
     teamicon: string,
     teamicon2: string,
     time: string,
     date: string,
     coefficient1: string,
     coefficient2: string,
     coefficient3: string,
}


const CarouselComp = () => {

     const CarouselContentItems:CarouselContentType[] = [
          {
               id: 1,
               typeInLeague: 'Football / Eredivisie',
               teamname: 'Almere City',
               teamname2: 'Heraclos Almelo',
               teamicon: './teamiconcarousel.svg',
               teamicon2: './teamiconcarousel2.svg',
               time: '04:37:53',
               date: '26 Nov, 15:15',
               coefficient1: '1.91',
               coefficient2: '3.75',
               coefficient3: '3.80',
          },
          {
               id: 2,
               typeInLeague: 'Football / Eredivisie',
               teamname: 'Azerbaijan',
               teamname2: 'Turkey',
               teamicon: './teamiconcarousel.svg',
               teamicon2: './teamiconcarousel2.svg',
               time: '04:37:53',
               date: '26 Nov, 15:15',
               coefficient1: '1.91',
               coefficient2: '3.75',
               coefficient3: '3.80',
          },
          {
               id: 3,
               typeInLeague: 'Football / Eredivisie',
               teamname: 'Lorem Lorem',
               teamname2: 'Lorem Lorem2',
               teamicon: './teamiconcarousel.svg',
               teamicon2: './teamiconcarousel2.svg',
               time: '04:37:53',
               date: '26 Nov, 15:15',
               coefficient1: '1.91',
               coefficient2: '3.75',
               coefficient3: '3.80',
          },
     ]
  return (
     <div className="carousel-inner">
      <Carousel className='carousel' interval={2000} infiniteLoop showThumbs={false}>
                {CarouselContentItems.map((items) => (
                    <div key={items.id} className='content-carousel'>
                         <div className='top-title'>
                              <span>Kim Qalib Gələcək?</span>
                         </div>


                         <div className='teams-and-others'>
                              
                              <div className="ligname">
                                   <span>Football / Eredivisie</span>
                              </div>

                              <div className='teams'>
                                   <div className='left'>
                                        <img src={items.teamicon} alt='team'  loading='lazy'/>
                                        <span>{items.teamname}</span>
                                   </div>
                                   <div className="time">
                                        <strong>{items.time}</strong>
                                        <span>{items.date}</span>
                                   </div>
                                   <div className='right'>
                                        <img src={items.teamicon2} alt="team2"  loading='lazy'/>
                                        <span>{items.teamname2}</span>
                                   </div>
                              </div>
                              <div className='others'>
                                   <div className="coefficient">
                                   <img src={items.teamicon} alt='teamicon' width={30} height={30} loading='lazy'/>
                                   <span>{items.coefficient1}</span>
                                   </div>
                                   
                                   <div className="coefficient">
                                   <img src='./xicon.svg' alt='xicon'  width={15} height={15} loading='lazy'/>
                                   <span>{items.coefficient2}</span>
                                   </div>
                                   
                                   <div className="coefficient">
                                   <img src={items.teamicon2} alt='teamicon2'  width={30} height={30} loading='lazy'/>
                                   <span>{items.coefficient3}</span>
                                   </div>
                              </div>
                         </div>

                         <div className='sponsor'>
                              <span style={{color: '#cecece'}}>Təqdim edir</span>
                               
                              <div className='logo'>
                               <img src='./idmanstatlog2.svg' alt='idmanstatlog2' />
                              </div>
                         </div>
                    </div>
                ))}
      </Carousel>
    </div>
  )
}

export default CarouselComp