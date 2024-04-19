import React from 'react'
import '../../../../../styles/container/container.scss';
import { Link } from 'react-router-dom';

type SocialMediaIconType = {
     id: number,
     icon: string,
};

const SocialMedia = () => {

     const SocialMediaIcons:SocialMediaIconType[] = [
          {
               id: 1,
               icon: './socialmediaicons/face.svg',   
          },
          {
               id: 2,
               icon: './socialmediaicons/x.svg',   
          },
          {
               id: 3,
               icon: './socialmediaicons/insta.svg',   
          },
          {
               id: 4,
               icon: './socialmediaicons/spotify.svg',   
          },
          {
               id: 5,
               icon: './socialmediaicons/youtube.svg',   
          },
          {
               id: 6,
               icon: './socialmediaicons/telegram.svg',   
          },
          {
               id: 7,
               icon: './socialmediaicons/anchor.svg',   
          },
     ]

  return (
    <div className="social-media-container">
     <div className="socialmedia-title">
          <span>Bizi Sosial Mediyada İzlə</span>
     </div>

     <div className='icon-container'>
     {SocialMediaIcons.map((icons) => (
          <div className='icons' key={icons.id}>
               <Link to='' className='img'>
               <img src={icons.icon} alt='icons' />
               </Link>
          </div>
     ))}
     </div>


     <div className="connector">
          <span>@idmanstat</span>
     </div>
    </div>
  )
}

export default SocialMedia