import React from "react";
import { CountryAndCupsType } from "../../../../../types/PopularLigTypes";
import axios from "axios";
import { Link } from "react-router-dom";
import { VList } from "virtua";
import { useCountryApi } from "../../../../../context/CountriesContext";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { SlControlStart } from "react-icons/sl";
import { useLiveMatchShowContext } from "../../../../../context/AccordingLeagueLiveMatchs";


type ContinentType = {
  id: number; //id of the continents
  title: string; //title (name) of the continents
  icon: string; //icon of the continents
};

type CountryOfLeagueType = {
  id: number,
  logo: string,
  name: string,
  type: string
}

const Countries = ({ showedMore, searchedItems }: { showedMore: boolean, searchedItems: string }) => {


  //this is countries main context. And here, am get api requests for give the all countries;
  const { mainCountries, countries, fetchDataCountries } = useCountryApi();

  React.useEffect(() => {
    fetchDataCountries(); //Component did mount get api
  }, []);

  //Continents list items
  const Continents: ContinentType[] = [
    {
      id: 1,
      title: "South America",
      icon: "./southam.svg",
    },
    {
      id: 2,
      title: "North & Central America",
      icon: "./northam.svg",
    },
    {
      id: 3,
      title: "Australia & Oceania",
      icon: "./austoc.svg",
    },
    {
      id: 4,
      title: "Asia",
      icon: "./asia.svg",
    },
    {
      id: 5,
      title: "Africa",
      icon: "./afric.svg",
    },
    {
      id: 6,
      title: "Europe",
      icon: "./europ.svg",
    },
    {
      id: 7,
      title: "World",
      icon: "./world.svg",
    },
  ];

  //if continent id === 1 || 2 || 3 || 4 add the icon ↓
  const continentIDEquals = (idToCheck: number) => {
    const ids = [1, 2, 3, 4]; //for control the ids define ids

    return ids.includes(idToCheck);
  };

  //open and close continent lists this state given to value according by number
  const [openContinent, setOpenContinent] = React.useState<{ [key: number]: boolean }>({});

  //show continent list function if continent.id === 1 2 3 or 4;
  const toggleContinentOpen = (continentID: number) => {
    setOpenContinent((prevState) => ({
      prevState,
      [continentID]: !prevState[continentID],
    }));
  };

  //get api for country name and get all country leagues for links
  //and so togglelink and settogglelink used for dropdown link menu
  const [toggleLink, setToggleLink] = React.useState<{ [key: number]: boolean }>({});
  const [countryName, setCountryName] = React.useState<{ [key: string]: boolean }>({});

  //get for countryes ligs according to countryName
  const [leagueOfCountry, setLeagueOfCountry] = React.useState<CountryOfLeagueType[]>([]);

  const getCountryOfLeaguesQuery = useQuery('getCountryOfLeagues', async () => {
    const options = {
      method: "GET",
      url: "http://127.0.0.1:8000/flash/api/get-country-league/",
    };

    const response = await axios.request(options);
    return response.data.data;
  }, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const toggleCountriesLink = (id: number, countryname: string) => {
    setToggleLink((prevToggle) => ({
      ...prevToggle,
      [id]: !prevToggle[id],
    }));

    setCountryName((prevval) => ({
      [countryname]: !prevval[countryname],
    }));

    if(!countryName[countryname]) {
      const countries = getCountryOfLeaguesQuery.data;
      const leagues = countries.filter((item:any) => item.name === countryname)[0]?.leagues;
      setLeagueOfCountry(leagues);
    }
  };

  
  //if user clicked any league, set live games content on according to league live games
  const { setShowed, setSelectedIndex, setLigidForLiveMatchUpdated, setLiveGamesByLeagueClicked } = useLiveMatchShowContext();

  const [activedLig, setActivedLig] = React.useState<{[key:number]: boolean}>({});
  
  const handleActive = (index:number) => {
    setActivedLig(() => ({
      [index]: true
    }));
  }
  
  const showLiveMatchByLeagues = (index:number, ligname:string) => {
    setShowed({[index]: true});
    setSelectedIndex(index);
    setLigidForLiveMatchUpdated(ligname);
  }


  //If user select on left sidebar in anyone leage, or country leage running this function
  const setLiveGames = async (ligID:number | string) => {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: {
        live: 'all',
        league: ligID
      },
      headers: {
        'X-RapidAPI-Key': '698e7cd394msha86e95346496330p10602ejsn518dfc936671',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      if(response.data) {
        console.log(response.data);
        setLiveGamesByLeagueClicked(response.data.response);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log('lige gore live games endpoint err', error);
    }
  }

  //searched countries
  const filteredMainCountries = 
  mainCountries.filter((item:CountryAndCupsType) => item.name.toLowerCase().includes((searchedItems || '').toLowerCase()));
  const filteredCountries = 
  countries.filter((item:CountryAndCupsType) => item.name.toLowerCase().includes((searchedItems || '').toLowerCase()));
  const filteredContinents = 
  Continents.filter((item:ContinentType) => item.title.toLowerCase().includes((searchedItems || '').toLowerCase()));

  return (
    <div className={`countries ${showedMore ? "countries-show-more-button-actived" : ""}`}>
      {searchedItems && filteredMainCountries.length === 0 ? (
        <span className="no-find-item">Heçnə tapılmadı</span>
      ) : (
        <React.Fragment>
        {filteredMainCountries.map((co, index) => (
          <div className="navlist" key={index}>
            <Link
              to=""
              className={`links ${countryName[co.name] ? 'active-links' : ''}`}
              onClick={() => {
                toggleCountriesLink(index, co.name);
              }}>
              <div className="logo-and-name">
                <img src={co.flag} alt="country-icon" style={{ width: "8%" }} loading="lazy" />
                <span>{co.name}</span>
              </div>
              {toggleLink[index] ? <MdOutlineKeyboardArrowUp id="open" /> : <MdOutlineKeyboardArrowDown id="open" />}
            </Link>
            
            {countryName[co.name] && (
              <React.Fragment>
                {leagueOfCountry.map((item:CountryOfLeagueType, index:number) => (
                  <Link to="" 
                  onClick={() => {
                    showLiveMatchByLeagues(index, item.name);
                    setLiveGames(item.id);
                    handleActive(index);
                    // console.log('ligid:', item.id, 'ligname:', item.name);
                    window.scrollTo(0, 0)
                  }}
                  className="links-in-leagues" key={index}>
                  <div className="logo-and-name">
                    <img src={item.logo} alt="country-icon" style={{ width: "8%" }} loading="lazy" />
                    <span>{item.name}</span>
                  </div>
                 </Link>
                ))}
              </React.Fragment>
            )}
          </div>
        ))}
        </React.Fragment>
      )}

      {searchedItems && filteredCountries.length === 0 ? (
        <span className="no-find-item"></span>
      ) : (
        <React.Fragment>
        {filteredCountries.map((co, index) => (
          <div className="navlist" key={index}>
            <Link
              to=""
              className={`links ${countryName[co.name] ? 'active-links' : ''}`}
              onClick={() => {
                toggleCountriesLink(index, co.name);
              }}>
              <div className="logo-and-name">
                <img src={co.flag} alt="country-icon" style={{ width: "8%" }} loading="lazy" />
                <span>{co.name}</span>
              </div>
              {toggleLink[index] ? <MdOutlineKeyboardArrowUp id="open" /> : <MdOutlineKeyboardArrowDown id="open" />}
            </Link>
            
            {countryName[co.name] && (
              <React.Fragment>
                {leagueOfCountry.map((item:CountryOfLeagueType, index:number) => (
                  <Link to="" 
                  onClick={() => {
                    showLiveMatchByLeagues(index, item.name);
                    setLiveGames(item.id);
                    handleActive(index);
                    // console.log('ligid:', item.id, 'ligname:', item.name);
                    window.scrollTo(0, 0)
                  }}
                  className="links-in-leagues" key={index}>
                  <div className="logo-and-name">
                    <img src={item.logo} alt="country-icon" style={{ width: "8%" }} loading="lazy" />
                    <span>{item.name}</span>
                  </div>
                 </Link>
                ))}
              </React.Fragment>
            )}
          </div>
        ))}
        </React.Fragment>
      )}
      

      {searchedItems && filteredContinents.length === 0 ? (
        <span></span>
      ) : (
        <React.Fragment>
          {filteredContinents.map((continent) => (
        <div className="continents" key={continent.id}>
          <Link
            to=""
            //if continent.id === 1 2 3 4 add onclick and open other continents countries
            onClick={() => {
              if (continentIDEquals(continent.id)) {
                toggleContinentOpen(continent.id);
              }
            }}
            //add class if continent id
            className={`links ${continentIDEquals(continent.id) ? "list-items-links" : ""}`}
            key={continent.id}>
            <div className="list-item">
              <img src={continent.icon} alt="continent-icon" loading="lazy" />
              <span>{continent.title}</span>
            </div>
            {/* IF CONTINENT ID === 1 2 3 4 add icon on right side */}
            {continentIDEquals(continent.id) ? (
              <div>
                {openContinent[continent.id] ? (
                  <MdOutlineKeyboardArrowUp id="open" />
                ) : (
                  <MdOutlineKeyboardArrowDown id="open" />
                )}
              </div>
            ) : (
              ""
            )}
          </Link>

          {/* IF CONTINENTS OPENED */}

          {openContinent[continent.id] && (
            <div className="opened-continent-countries">
              {continent.id === 1 ? (
                <>
                  <li>1</li>
                </>
              ) : continent.id === 2 ? (
                <li>2</li>
              ) : continent.id === 3 ? (
                <li>3</li>
              ) : continent.id === 4 ? (
                <li>4</li>
              ) : null}
            </div>
          )}
        </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default Countries;
