import React from "react";
import "../../../styles/loginregister/optionspage.scss";
import { FaChevronLeft, FaRegStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useRegisterContext } from "../../../context/RegisterContext";
import { useTeamSelectModal } from "../../../context/RegisterOptionContext";
import axios from "axios";
import { VList } from "virtua";
import TeamsAndLigsContainer from "./TeamsAndLigsContainer";
import { useAddTeamContext } from "../../../context/AddTeamContext";

export type TeamType = {
  id: number; //the id of the team
  name: string; //the name of the team
  league: number; //the league of the team
  country: string; //the country name of the team,
  code: string; //the code of the team
  flag: string;
  logo: string;
};

const TeamModal = () => {
  //popup true
  const { setNavRegister } = useRegisterContext();
  const { setTeamModal } = useTeamSelectModal();

  //get back to favourite teams selection
  //if user exiting get back to the
  const GetBack = () => {
    setTeamModal(false);
    setNavRegister("Tebrikler");
  };

  //get countries
  const [countriesforteams, setCountriesforteams] = React.useState<TeamType[]>([]);
  const getCountriesFromTeams = async () => {
    const options = {
      method: "GET",
      url: `https://api-football-v1.p.rapidapi.com/v3/teams/countries`,
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);

    try {
      if (response.data) {
        //filtered unecessary items;
        const withoutUnnecessary = response.data.response.filter((country: any) => {
          if (
            country.flag === null ||
            country.code === null ||
            country.name.includes("intl") ||
            country.name.includes("Fiji")
          ) {
            return false;
          }
          return true;
        });

        setCountriesforteams(withoutUnnecessary);
      }
    } catch (error) {
      console.log("teams/countries error endpoint", error);
    }
  };

  //get teams in the countries
  const [teams, setTeams] = React.useState<TeamType[]>([]);
  const getTeams = async (name: string) => {
    //which selected country get api her team
    const options = {
      url: `https://api-football-v1.p.rapidapi.com/v3/teams?country=${name.toLowerCase()}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    try {
      if (response.data && Array.isArray(response.data.response)) {
        const teamsData = response.data.response;
        const teams = teamsData.map((teamData: any) => teamData.team);
        setTeams(teams);
      }
    } catch (error) {
      console.log("teams/countries error endpoint", error);
    }
  };

  React.useEffect(() => {
    getCountriesFromTeams();
  }, []);

  //search country
  const [searchitems, setSearchitems] = React.useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchitems(e.target.value);
  };

  //if user clicked country, and open teams in the country
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(null); //selected country name
  const [selectedCountryFlag, setSelectedCountryFlag] = React.useState<string | null>(null); //selected country flag
  const handleSelectTeam = (name: string, flag: string) => {
    setSelectedCountry(name);
    setSelectedCountryFlag(flag);
    getTeams(name);
    //get names
  };

  const { addTeam } = useAddTeamContext();

  return (
    <div className="select-team-popup">
      <div className="top-header-in-selecteampopup">
        <article className="selecteam-title">
          <span>komanda seçiminizi edin</span>
        </article>

        <article className="little-title-and-icon">
          <FaChevronLeft
            id="lefticon"
            onClick={() => GetBack()} //if user get back, back to popup modal
          />
          <p>
            Hesabınıza <strong>20</strong> favorit komanda əlavə edə bilərsiniz. Hal-hazırda{" "}
            <strong style={{ color: addTeam.length > 0 ? "green" : "" }}>{addTeam.length}</strong> komanda əlavə
            etmisiniz.
          </p>
        </article>
      </div>

      {/* IF SELECTED COUNTRY, THEN OPEN HER COUNTRY TEAMS AND LIGS */}
      {selectedCountry ? (
        <TeamsAndLigsContainer
          setSelectedCountry={setSelectedCountry}
          teams={teams}
          selectedCountry={selectedCountry}
          selectedCountryFlag={selectedCountryFlag}
        />
      ) : (
        <div className="teams-container">
          <div className="search-input">
            <div className="input-area">
              <IoSearch id="searchicon" />
              <input
                type="search"
                onChange={(e) => handleSearch(e)}
                value={searchitems}
                placeholder="Komandanı axtar"
              />
            </div>
          </div>

          <div className="teams">
            <div className="popular-teams">
              <div className="left">
                <div className="image-wrapper">
                  <FaRegStar id="staricon" />
                </div>
                <span>Məşhur Komandalar</span>
              </div>

              <div className="right">
                <img src="./righticon.svg" alt="righticon" id="righticon" />
              </div>
            </div>

            <VList style={{ height: "430px" }}>
              { countriesforteams
                .filter((country) => country.name.toLowerCase().includes(searchitems.toLowerCase())) //search items filtered
                .map((countries, index) => (
                    <div className="teams-other" key={index}>
                      <div className="left">
                        <div className="image-wrapper">
                          <img src={countries.flag} alt="xəta.." />
                        </div>
                        <span onClick={() => handleSelectTeam(countries.name, countries.flag)}>{countries.name}</span>
                      </div>

                      <div className="right">
                        <img
                          src="./righticon.svg"
                          alt="righticon"
                          id="righticon"
                          onClick={() => handleSelectTeam(countries.name, countries.flag)}
                        />
                      </div>
                    </div>
                  )
                )}
            </VList>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamModal;
