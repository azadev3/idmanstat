import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigatorContextProvider } from './context/NavigatorContextOnTheContentItems';
import UserProfile from './components/container/UserProfilePage/UserProfile';
import Tips from './components/container/TipsPage/Tips';
import NewsPage from './components/container/NewsPage/NewsPage';
import { RegisterContextProvider } from './context/RegisterContext';
import { SecondHeaderNavContextProvider } from './context/SecondHeaderNavigationContext';
import Basketball from './components/secondheader/uitils/Basketball';
import Tenis from './components/secondheader/uitils/Tenis';
import Volleyball from './components/secondheader/uitils/Volleyball';
import Handball from './components/secondheader/uitils/Handball';
import ErrorPage from './components/ErrorPage';
import { RegisterOptionContextProvider } from './context/RegisterOptionContext';
import { CountryContextProvider } from './context/CountriesContext';
import { AddTipModalContextProvider } from './context/AddTipModalContext';
import { LigContextProvider } from './context/LigContext';
import { MatchStatusContextProvider } from './context/MatchStatusContext';
import { UserProfileModalContextProvider } from './context/UserProfileEditModal';
import { ContactModalContextProvider } from './context/ContactUsModal';
import { AddTeamContextProvider } from './context/AddTeamContext';
import { SelectedTimeBottomNavComponentProvider } from './components/container/HomePage/uitils/ContentUitils/BottomNavContext';
import { GamesApiContextProvider } from './components/container/HomePage/uitils/ContentUitils/ContentRoutes/GamesApiContext';
import { FixtureModalContextProvider } from './context/MatchFixturesModal';
import { EventsContextProvider } from './context/EventsApiContext';
import { HamburgerContextProvider } from './context/responsivecontext/HamburgerContext';
import { HamburgerSecondHeaderProvider } from './context/responsivecontext/SecondHeaderHamburger';
import './styles/responsive/responsive.css';
import './styles/responsive/homepage_responsive.css';
import './styles/responsive/homepage_news_responsive.css'; 
import './styles/responsive/newsresponsive.css';
import './styles/responsive/tipsresponsive.css';
import { IsChangedContextProvider } from './context/IsChanged';
import { PostTipModalContextProvider } from './context/PostTipModalContext';
import { ShowAccordingLiveMatchContextProvider } from './context/AccordingLeagueLiveMatchs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HoldingTipContextProvider } from './context/HoldingTipDataContext';
import { TipDataContextProvider } from './context/TipDataContext';

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
    <QueryClientProvider client={query}>

    <NavigatorContextProvider> 
    <RegisterContextProvider>
    <SecondHeaderNavContextProvider>
    <RegisterOptionContextProvider>
    <CountryContextProvider>
    <LigContextProvider>
    <AddTipModalContextProvider>
    <MatchStatusContextProvider>
    <UserProfileModalContextProvider>
    <ContactModalContextProvider>
    <AddTeamContextProvider>
    <SelectedTimeBottomNavComponentProvider>
    <GamesApiContextProvider>
    <FixtureModalContextProvider>
    <EventsContextProvider>
    <HamburgerContextProvider>
    <HamburgerSecondHeaderProvider>
    <IsChangedContextProvider>
    <PostTipModalContextProvider>
    <ShowAccordingLiveMatchContextProvider>
    <HoldingTipContextProvider>
    <TipDataContextProvider>



        <Routes>

            <Route path='/' element={<App />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/tips' element={<Tips />} />
            <Route path='/news' element={<NewsPage />} />
            <Route path='/basketball' element={<Basketball />} />
            <Route path='/tennis' element={<Tenis />} />
            <Route path='/volleyball' element={<Volleyball />} />
            <Route path='/handball' element={<Handball />} />
            <Route path='*' element={<ErrorPage />} />
           
        </Routes>

    </TipDataContextProvider>
    </HoldingTipContextProvider>
    </ShowAccordingLiveMatchContextProvider>
    </PostTipModalContextProvider>
    </IsChangedContextProvider>
    </HamburgerSecondHeaderProvider>
    </HamburgerContextProvider>
    </EventsContextProvider>
    </FixtureModalContextProvider>
    </GamesApiContextProvider>
    </SelectedTimeBottomNavComponentProvider>
    </AddTeamContextProvider>
    </ContactModalContextProvider>
    </UserProfileModalContextProvider>
    </MatchStatusContextProvider>
    </AddTipModalContextProvider>
    </LigContextProvider>
    </CountryContextProvider>
    </RegisterOptionContextProvider>
    </SecondHeaderNavContextProvider>
    </RegisterContextProvider>
    </NavigatorContextProvider>

    </QueryClientProvider>
    </BrowserRouter>
)
