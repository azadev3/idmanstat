//COUNTRIES CONTEXT 
//COUNTIRES API IN COMING DATA

import React, { SetStateAction } from "react";
import { CountryAndCupsType } from "../types/PopularLigTypes";
import axios from "axios";


type CountryContextType = {
  countries: CountryAndCupsType[];
  setCountries: React.Dispatch<SetStateAction<CountryAndCupsType[]>>;
  fetchDataCountries: () => void; //fech data function
  mainCountries: CountryAndCupsType[];
  setMainCountries: React.Dispatch<SetStateAction<CountryAndCupsType[]>>;
};

type PropType = {
  children: React.ReactNode;
};

export const CountryContext = React.createContext<CountryContextType | undefined>(undefined);

export const CountryContextProvider: React.FC<PropType> = ({ children }) => {
  
  const [countries, setCountries] = React.useState<CountryAndCupsType[]>([]);
  const [mainCountries, setMainCountries] = React.useState<CountryAndCupsType[]>([]);

  const fetchDataCountries = async () => {
    try {
      const api = 'http://127.0.0.1:8000/flash/api/popular-and-all-countries/';
      const response = await axios.get(api);

      if(response.data){
       setMainCountries(response.data.data.popular_countries);
       setCountries(response.data.data.all_countries);
      } else {
        console.log(response.status)
      }
      
    } catch (error) {
      console.log('get-countries-and-popular-countries endpoint error', error);
    }
  }


  return (
    <CountryContext.Provider value={{ setCountries, countries, fetchDataCountries, mainCountries, setMainCountries }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryApi = () => {
  const context = React.useContext(CountryContext);

  if (context === undefined) {
    throw new Error("undefined is country api");
  } else {
    return context;
  }
};
