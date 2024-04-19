import React, { SetStateAction } from "react";
import "../../../../../styles/tipspage/addtipmodal.scss";
import axios from "axios";
import { useMatchStatusContext } from "../../../../../context/MatchStatusContext";

type Props = {
  selectedlig: string | null;
  leagueType: string | null;
  leagueImage: string | null;
  setSelectedMatch: React.Dispatch<SetStateAction<number | null>>;
  leagueID: number | null;
};

type MatchStatusType = {
  id: number;
  home: {
    id: number;
    name: string;
    logo: string;
  };
  away: {
    id: number;
    name: string;
    logo: string;
  };
  date: string;
};

const SelectedLig = ({ selectedlig, leagueType, leagueImage, setSelectedMatch, leagueID }: Props) => {
  //Get lives match on season 2024
  const [teams, setTeams] = React.useState<MatchStatusType[]>([]);
  const [fixtures, setFixtures] = React.useState<MatchStatusType[]>([]);

  const fetchMatchData = async () => {
    const day = new Date();
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();
    const fromValue = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;

    // 15 day after
    const toDay = new Date(day);
    toDay.setDate(toDay.getDate() + 15); // get 15 day after 
    const toYear = toDay.getFullYear();
    const toMonth = toDay.getMonth() + 1;
    const toDate = toDay.getDate();
    const toValue = `${toYear}-${toMonth < 10 ? "0" + toMonth : toMonth}-${toDate < 10 ? "0" + toDate : toDate}`;

    const options2023 = {
      //the season of 2023
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: {
        league: leagueID,
        season: "2023",
        from: fromValue,
        to: toValue,
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    // const options2024 = {
    //   //the season of 2024
    //   method: "GET",
    //   url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    //   params: {
    //     league: leagueID,
    //     season: "2024",
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
    //     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    //   },
    // };
    try {
      // const [response2023] = await Promise.all([axios.request(options2023), axios.request(options2024)]);

      const response2023 = await axios.request(options2023);
      if (response2023.data) {
        const fixtures2023 = response2023.data.response.map((fixture: any) => fixture.fixture);
        const teams2023 = response2023.data.response.map((team: any) => team.teams);

        // const fixtures2024 = response2024.data.response.map((fixture: any) => fixture.fixture);
        // const teams2024 = response2024.data.response.map((team: any) => team.teams);

        const allFixtures = [...fixtures2023];
        const allTeams = [...teams2023];

        setFixtures(allFixtures);
        setTeams(allTeams);
      }
    } catch (error) {
      console.error("endpoint error on the response2023-2024", error);
    }
  };

  //first rendering call the fetchMatchData() function;
  React.useEffect(() => {
    fetchMatchData();
  }, []);

  // Formatted Date by Azerbaijan
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: any = {
      month: "long",
      day: "numeric",
      weekday: "long",
    };

    const azLocale = "en-EN";
    const formattedDate = date.toLocaleDateString(azLocale, options);

    return formattedDate;
  };

  //Formatted Date by Azerbaijan hour;
  const formatHours = (hours: string) => {
    const date = new Date(hours);
    const hour = date.getHours();
    const minute = date.getMinutes();

    //Format the minute value as two digits
    const formattedMinute = minute < 10 ? "0" + minute : minute;

    const formattedHours = `${hour}:${formattedMinute}`;

    return formattedHours;
  };

  //GET MATCH ODDS (pre-match ODDS);
  const { handleSelectMatchStatus, setFixtureID, fetchMatchOdds } = useMatchStatusContext();

  //sort according to date on fixtures array
  const sortedFixtures = [...fixtures].sort(
    (a: MatchStatusType, b: MatchStatusType) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="selected-league-container">
      <div className="selected-league-name">
        <div className="image-wrapper">
          <img src={leagueImage ? leagueImage : ""} alt="league-logo" />
        </div>

        <div className="name-and-type">
          <span id="type">{leagueType}</span>
          <span id="selected-league">{selectedlig}</span>
        </div>
      </div>

      <div className="match-status">
        {sortedFixtures.map((fixture, index) => (
          <div
            className="match-area"
            key={fixture.id}
            onClick={() => {
              fetchMatchOdds; //this function MatchStatusContext.tsx component and get api request give the all pre-match odds values
              setFixtureID(fixture.id); //push fixture.id in the setFixtureID State
              const data = {
                fixtureID: fixture.id,
                date: fixture.date, //match date
                teamAway: teams[index]?.away.name, //match away team name
                teamHome: teams[index]?.home.name, //match home team name
                teamHomeLogo: teams[index]?.home.logo, //match home team logo
                teamAwayLogo: teams[index]?.away.logo, //match away team logo
              };
              handleSelectMatchStatus(
                data.date,
                data.teamAway,
                data.teamHome,
                data.teamHomeLogo,
                data.teamAwayLogo,
                data.fixtureID
              ); //this function give the 5 value (see: MatchStatusContext.tsx)
              setSelectedMatch(fixture.id);
            }}>
            <div className="date-header">
              <span>{formatDate(fixture.date)}</span>
            </div>

            <div className="matchs">
              <div className="matchtime">
                <span>{formatHours(fixture.date)}</span>
              </div>

              <div className="teams">
                {/* Ev sahibi komanda */}
                <div>
                  <div className="img-wrapper">
                    {teams[index]?.home && <img src={teams[index].home.logo} alt="teamlogo" loading="lazy" />}
                  </div>
                  <span>{teams[index]?.home && teams[index].home.name}</span>
                </div>

                {/* Qarşı komanda */}
                <div>
                  <div className="img-wrapper">
                    {teams[index]?.away && <img src={teams[index].away.logo} alt="teamlogo" loading="lazy" />}
                  </div>
                  <span>{teams[index]?.away && teams[index].away.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedLig;
