import React from 'react'
import '../../../../../styles/container/container.scss';
import { Link, useNavigate } from 'react-router-dom';


type NewsItemType = {
     id: number,
     photo: string,
     title: string,
     timeicon: string,
     time: string,
     article: string,
};


const News = () => {

     const navigate = useNavigate();

     const NewsItems:NewsItemType[] = [
          {
               id: 1,
               photo: './news/1.svg',
               title: 'TV tonight: the wild story of the Stasi, it"s football team ... and assassination',
               timeicon: './news/timeicon.svg',
               time: '25 dəqiqə əvvəl',
               article: 'The Guardian',
          },
          {
               id: 2,
               photo: './news/2.svg',
               title: 'MLS playoffs: Cincinnati and Columbus win to set up all-Ohio clash in last four',
               timeicon: './news/timeicon.svg',
               time: '2 dəqiqə əvvəl',
               article: 'The Guardian',
          },
          {
               id: 3,
               photo: './news/3.svg',
               title: 'Ange Postecoglou and Unai Emery are second coming of messiah managers',
               timeicon: './news/timeicon.svg',
               time: '6 saat əvvəl',
               article: 'The Sunday Times',
          },
          {
               id: 4,
               photo: './news/4.svg',
               title: 'How to sleep better -- by the footballers"go-to sleep coach',
               timeicon: './news/timeicon.svg',
               time: '6 saat əvvəl',
               article: 'The Sunday Times',
          },
          {
               id: 5,
               photo: './news/5.svg',
               title: 'Ireland manager shortlist is fine -- what about the people who decide?',
               timeicon: './news/timeicon.svg',
               time: '6 saat əvvəl',
               article: 'The Sunday Times',
          },
     ]

  return (
    <div className="news-container">
     <div className='top-title-news'>
          <span>Xəbərlər</span>
          <Link to="" className='all'>Hamısı</Link>
     </div>

     {NewsItems.map((items) => (
          <div className='news' key={items.id}>
               <div className="news-photo">
                    <img src={items.photo} alt='photo-news' />
               </div>

               <div className='info'>
                    <div className="text">
                         <p>{items.title}</p>
                    </div>

                    <div className='time'>
                         <div className="left">
                         <img src={items.timeicon} alt='time-icon' />
                         <span id='time'>{items.time}</span>
                         </div>

                         <div className="right">
                         <span>{items.article}</span>
                         </div>
                    </div>
               </div>
          </div>
     ))}

     <div className='show-more'>
          <button
          onClick={() => {navigate('/news')}}
          >Bütün İdman Xəbərləri</button>
     </div>
    </div>
  )
}

export default News