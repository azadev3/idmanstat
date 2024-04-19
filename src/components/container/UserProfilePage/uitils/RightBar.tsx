import React from 'react'
import '../../../../styles/userprofile/userprofile.scss';
import CarouselInner from '../../HomePage/uitils/RightSidebarUitils/CarouselInner';
import CarouselComp from '../../../CarouselComp';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

type AuthorType = {
  id: number;
  profile: string,
  name: string,
  flag: string,
}

const RightBar = () => {

  const Authors:AuthorType[] = [
    {
      id: 1,
      profile: './profile.svg',
      name: 'Damirov',
      flag: './azflag.svg',
    },
    {
      id: 2,
      profile: './profile.svg',
      name: 'Damirov',
      flag: './azflag.svg',
    },
    {
      id: 3,
      profile: './profile.svg',
      name: 'Damirov',
      flag: './azflag.svg',
    },
    {
      id: 4,
      profile: './profile.svg',
      name: 'Damirov',
      flag: './azflag.svg',
    },
    {
      id: 5,
      profile: './profile.svg',
      name: 'Damirov',
      flag: './azflag.svg',
    },
  ]

  return (
    <div className="right-bar-container">
      <CarouselComp />
      
      <div className='other-authors'>
        {Authors.map((authors) => (
          <div className='author-box' key={authors.id}>
            <div className='left'>
              <div className='profile'>
                <img src={authors.profile} alt='author-profile' />
              </div>
              <div className="name-flag">
                <span>{authors.name}</span>
                <img src={authors.flag} alt='author-flag' />
              </div>
            </div>
            <div className='right'>
              <button>İzlə</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightBar