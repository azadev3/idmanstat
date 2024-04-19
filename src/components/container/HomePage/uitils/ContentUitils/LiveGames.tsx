import React from 'react'
import '../../../../../styles/container/container.scss';
import { useNavigatorContext } from '../../../../../context/NavigatorContextOnTheContentItems';
const LazyGames = React.lazy(() => import('../../uitils/ContentUitils/ContentRoutes/Games'));
import News from './ContentRoutes/NewsInContentRoutes';
import Cups from './ContentRoutes/Cups';
import Coefficient from './ContentRoutes/Coefficient';
import LazyLoadingGames from '../../../../loadingandlazy/LazyLoadingGames';

const LiveGames = () => {

  const { navigator } = useNavigatorContext();

  //if navigator === anyhting rendered the components on the live games 

  return (
    <div className='live-games-content'>
      {navigator === 'oyunlar' && (
        // LAZY LOADING at the Games component for performans optimization
        <React.Suspense fallback={<LazyLoadingGames />}>
          <LazyGames />
        </React.Suspense>
      )}
      {navigator === 'xeberler' && <News />}
      {navigator === 'kuponlar' && <Cups />}
      {navigator === 'emsal' && <Coefficient />}
    </div>
  )
}

export default LiveGames