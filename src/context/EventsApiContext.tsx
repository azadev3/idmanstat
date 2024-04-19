import React, { SetStateAction } from 'react'
import { EventType } from '../components/container/HomePage/uitils/ContentUitils/ContentRoutes/fixturemodalroutes/Events'
import axios from 'axios';

type EventContextType = {
     events: EventType[] | null,
     setEvents: React.Dispatch<SetStateAction<EventType[] | null>>;

     fetchDataForEvents: (fixtureID: number | undefined) => void;
};

type childrenType = {
     children: React.ReactNode,
}

export const EventsContext = React.createContext<EventContextType | undefined>(undefined);

export const EventsContextProvider:React.FC<childrenType> = ({ children }) => {

     const [events, setEvents] = React.useState<EventType[] | null>(null);

     const fetchDataForEvents = async (id: number | undefined) => {
          const options = {
                    method: 'GET',
                    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/events',
                    params: {fixture: id},
                    headers: {
                      'X-RapidAPI-Key': '698e7cd394msha86e95346496330p10602ejsn518dfc936671',
                      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
          }

          const response = await axios.request(options);

          try {
               if(response.data) {
                    const data = response.data.response;
                    setEvents(data);
               } else {
                    console.log('!! doesnt response.data  if(response.data) block in events' );
               }
          } catch (error) {
               console.log('match events endpoint error (fixtures/events)', error);
          }
     }

     return (
          <EventsContext.Provider value={{ 
               events, setEvents, fetchDataForEvents
          }}>
               {children}
          </EventsContext.Provider>
     )
}

export const useEventsApi = () => {
     const context = React.useContext(EventsContext);

     if(context === undefined) {
          throw new Error('undefined is events context');
     } else {
          return context;
     }
}