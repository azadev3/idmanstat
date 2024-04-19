import React from "react";
import "../../../../../styles/tipspage/addtipmodal.scss";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FixtureData, useMatchStatusContext } from "../../../../../context/MatchStatusContext";
import axios from "axios";
import { usePostTipModal } from "../../../../../context/PostTipModalContext";
import { useLigApi } from "../../../../../context/LigContext";

type accordingType = {
  id: number;
  title: string;
};

const SelectedMatch = ({selectedlig}: {selectedlig: string | null}) => {
  const { fixtureID } = useMatchStatusContext();

  const { ligCountry } = useLigApi();

  //selected odd and open post tip container modal
  const {
    setPostTipModal,
    maxOddAddedVal,
    selectedOddValue,
    setSelectedIndex,
    setSelectedOddValue,
    timeodd,
    setTimeOdd,
    setTeamValues,
  } = usePostTipModal();

  //set parameter and update setTimeOdd state according to selected user
  const toggleTimeOdd = (value: string) => {
    setTimeOdd(value);
  };

  //accordion settings
  const [according, setAccording] = React.useState<{ [key: number]: boolean }>({});

  const toggleAccordion = (id: number) => {
    setAccording((prevAccord) => ({
      ...prevAccord,
      [id]: !prevAccord[id],
    }));

    // if (fixtureID && id === 2) {
    //   getOverUnderOdds(fixtureID);
    // } else if (fixtureID && id === 1) {
    //   getHomeAwayDrawOddValues(fixtureID);
    // } else if (fixtureID && id === 3) {
    //   BtsFullTime(fixtureID);
    // } else if (fixtureID && id === 4) {
    //   DcFullTime(fixtureID);
    // }
  };

  //give in context , matchstatus and fixtureID;
  const { matchstatus } = useMatchStatusContext();

  // Define accordion list
  const accordingList: accordingType[] = [
    { id: 1, title: "Maçın Nəticəsi - 1X2" },
    { id: 2, title: "Qol Cəmi" },
    { id: 3, title: "Qarşılıqlı Qol (BTS)" },
    { id: 4, title: "Cüt Şans (DC)" },
  ];

  //matchstatus date type convert to formatted date
  const formattedDate = (matchdate: string) => {
    const date = new Date(matchdate);
    const day = date.getDate(); // date info
    const monthIndex = date.getMonth(); // month info ( at started 0 )
    const year = date.getFullYear(); // Year info
    const hour = date.getHours(); // Hour info
    const minute = date.getMinutes(); // Minute info

    //Format the month information by adding 1 (indexes January starting from 0)
    const month = monthIndex + 1;

    // Convert hour and minute information to a 2-digit format
    const formattedHour = hour < 10 ? "0" + hour : hour;
    const formattedMinute = minute < 10 ? "0" + minute : minute;

    // Combine date and time information in your desired format
    const formatted = `${day} ${month} ${year}, ${formattedHour}:${formattedMinute}`;

    return formatted;
  };

  // Calculate the number of days remaining by subtracting today's date from the Mac date
  //Combine date and time information in your desired format
  //time remaining in the match
  const timeRemainingInTheMatch = (matchdate: string) => {
    const matchday = new Date(matchdate); //match started day
    const today = new Date(); //today

    const timeDifference = matchday.getTime() - today.getTime(); //the matchday - the today = remaining day

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); //calculation in seconds and convert to days

    const text: string = "Maç bitib"; //define text

    const filterTime = daysDifference < 0 ? text : daysDifference; //if days small by 0 show text

    return filterTime; //return remaining days
  };

  //get api request for over-under full time match odds

  const [overUnderOdd, setOverUnderOdd] = React.useState<any>([]);
  const getOverUnderOdds = async (fixtureID: number) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8", //bet 365 id
        bet: "5", //full time
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data) {
        const bookmakers = response.data.response.map((bookmakers: any) => bookmakers.bookmakers);
        const resultBookmakers = bookmakers.map((bets_values: any) => bets_values[0].bets[0].values);
        setOverUnderOdd(resultBookmakers);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error, "over-under bets endpoint");
    }
  };

  //get api request for over-under FIRST half match odds
  const getOverUnderOddsFirstHalf = async (fixtureID: number) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8", //bet 365 id
        bet: "6", //for first time
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    try {
      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setOverUnderOdd(results);
      } else {
        response.status;
      }
    } catch (error) {
      console.log("getHomeAwayDraw odd values endpoint error", error);
    }
  };

  //get api request for over-under SECOND half match odds
  const getOverUnderOddsSecondHalf = async (fixtureID: number) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8", //bet 365 id
        bet: "26", //for second time
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    try {
      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setOverUnderOdd(results);
      } else {
        response.status;
      }
    } catch (error) {
      console.log("getHomeAwayDraw odd values endpoint error", error);
    }
  };

  //get api request for home-away-draw (Ev, Heç heçə, Qonaq) full time match odds
  const [homeAwayDrawOdd, setHomeAwayDrawOdd] = React.useState<any>([]);
  const getHomeAwayDrawOddValues = async (fixtureID: number) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8", //bet 365 id
        bet: "1", //full time home-away-draw
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    try {
      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setHomeAwayDrawOdd(results);
      } else {
        response.status;
      }
    } catch (error) {
      console.log("getHomeAwayDraw odd values endpoint error", error);
    }
  };

  //BTS (both teams score) get api request FULL TIME - First time - Second time
  const [bothTeamScoreOdds, setBothTeamScoreOdds] = React.useState<any>([]);
  const BtsFullTime = async (fixtureID: number | null) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8",
        bet: "8",
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setBothTeamScoreOdds(results);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("bts endpoint api error", error);
    }
  };

  const BtsFirstHalf = async (fixtureID: number | null) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8",
        bet: "34",
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setBothTeamScoreOdds(results);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("bts endpoint api error", error);
    }
  };

  const BtsSecondHalf = async (fixtureID: number | null) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8",
        bet: "35",
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setBothTeamScoreOdds(results);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("bts endpoint api error", error);
    }
  };

  //DC (double chance) get api request FULL TIME - First time - Second time
  const [doubleChanceOdd, setDoubleChanceOdd] = React.useState<any>([]);

  const DcFullTime = async (fixtureID: number | null) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8",
        bet: "12",
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setDoubleChanceOdd(results);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("bts endpoint api error", error);
    }
  };

  const DcFirstHalf = async (fixtureID: number | null) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8",
        bet: "20",
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setDoubleChanceOdd(results);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("bts endpoint api error", error);
    }
  };

  const DcSecondHalf = async (fixtureID: number | null) => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: {
        fixture: fixtureID,
        bookmaker: "8",
        bet: "33",
      },
      headers: {
        "X-RapidAPI-Key": "698e7cd394msha86e95346496330p10602ejsn518dfc936671",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data) {
        const results = response.data.response.map((item: any) => item.bookmakers[0].bets[0].values);
        setDoubleChanceOdd(results);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("bts endpoint api error", error);
    }
  };

  const teamAway = matchstatus
    .filter((team: FixtureData) => team.fixtureID === fixtureID)
    .map((team: FixtureData) => team.away);

  const teamHome = matchstatus
    .filter((team: FixtureData) => team.fixtureID === fixtureID)
    .map((team: FixtureData) => team.home);

  //according titles mapping for handleOpenPostModal function param;
  const MatchResult = accordingList
    .filter((item: accordingType) => item.id === 1)
    .map((item: accordingType) => item.title); //Maçın nəticəsi 1X2
  const TotalGoals = accordingList
    .filter((item: accordingType) => item.id === 2)
    .map((item: accordingType) => item.title); //Qol Cəmi
  const BTS = accordingList.filter((item: accordingType) => item.id === 3).map((item: accordingType) => item.title); //Both Team Score (qarşılıqlı qol);
  const DC = accordingList.filter((item: accordingType) => item.id === 4).map((item: accordingType) => item.title); //Double Chance (cüt şans);

  React.useEffect(() => {
    if (fixtureID) {
      if (timeodd === "firsthalf") {
        getOverUnderOddsFirstHalf(fixtureID);
        BtsFirstHalf(fixtureID);
        DcFirstHalf(fixtureID);
      } else if (timeodd === "allmatch") {
        getOverUnderOdds(fixtureID);
        BtsFullTime(fixtureID);
        DcFullTime(fixtureID);
        getHomeAwayDrawOddValues(fixtureID);
      } else if (timeodd === "secondhalf") {
        getOverUnderOddsSecondHalf(fixtureID);
        BtsSecondHalf(fixtureID);
        DcSecondHalf(fixtureID);
      }
    }
  }, [timeodd]);

  const handleOpenPostTipModal = (
    index: number | string,
    oddname: string,
    teamAway: string,
    teamHome: string,
    timeodd: string,
    yes?: string,
    no?: string,
    column?: string,
    value?: string,
    overUnderValue?: string,
    tip_type?: string,
    selectedlig?: string,
    selectedCountry?: string,
  ) => {
    const key = `${index}_${oddname}`;

    const isTeamAlreadySelected = Object.values(selectedOddValue).some(
      (value) => value.includes(teamAway) && value.includes(teamHome)
    );

    if (isTeamAlreadySelected) {
      console.log("Eyni maça 1dən çox tip əlavə edilə bilməz");
      return;
    }

    if (!isTeamAlreadySelected && Object.keys(selectedOddValue).length < maxOddAddedVal) {
      setSelectedOddValue((prevValue) => ({
        ...prevValue,
        [key]: [oddname, teamAway, teamHome, timeodd, yes, no, column, value, overUnderValue, tip_type, selectedlig, selectedCountry],
      }));
      setSelectedIndex(index);
      setPostTipModal(true);
    } else {
      console.log("Maksimum tip sayını keçə bilməzsiniz. (15)");
    }
  };

  React.useEffect(() => {
    console.log(selectedOddValue, "secilen deyerlerin ici<<-");
  }, [selectedOddValue]);

  const uniqueOddValues: any = [];

  overUnderOdd.forEach((subArray: any) => {
    subArray.forEach((item: any) => {
      const oddValue = item.value.split(" ")[1];
      if (!uniqueOddValues.includes(oddValue)) {
        uniqueOddValues.push(oddValue);
      }
    });
  });

  return (
    <div className="match-informations-container">
      <div className="information-header">
        {/* mapping match status values (home, away, homelogo, awaylogo and more..) */}
        {matchstatus.map((item, index) => (
          <div className="teams-header" key={index}>
            <div className="teamleft-info">
              <div className="teamlogo-wrapper">
                <img src={item.homelogo} alt="teamlogo" loading="lazy" />
              </div>

              <span>{item.home}</span>
            </div>

            <div className="teamstatus-info">
              <article className="after-time">
                {/* IF THE NUMBER OF DAYS IS NEGATIVE, THEN WRITE A MESSAGE ACCORDINGLY */}
                {/* EGER GUN SAYI menfi deyer alirsa o zaman ona gore mesaj yazdir */}
                {timeRemainingInTheMatch(item.date) !== "Maç bitib" ? (
                  <span>{timeRemainingInTheMatch(item.date)} gün</span>
                ) : (
                  <span>Maç bitib</span>
                )}
              </article>

              <article className="time">
                <span>{formattedDate(item.date)}</span>
              </article>
            </div>

            <div className="teamright-info">
              <div className="teamlogo-wrapper">
                <img src={item.awaylogo} alt="teamlogo" loading="lazy" />
              </div>

              <span>{item.away}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="match-bottom-informations">
        <div className="odds-section">
          <div className="odds">
            <div
              className="all-match"
              //this style prop for odds classnames. and this according state change color and bg;
              style={{
                background: timeodd === "allmatch" ? "#292744" : "",
                color: timeodd === "allmatch" ? "#fff" : "",
              }}
              onClick={() => toggleTimeOdd("allmatch")}>
              <span>Bütün Maç</span>
            </div>

            <div
              className="first-half"
              //this style prop for odds classnames. and this according state change color and bg;
              style={{
                background: timeodd === "firsthalf" ? "#292744" : "",
                color: timeodd === "firsthalf" ? "#fff" : "",
              }}
              onClick={() => toggleTimeOdd("firsthalf")}>
              <span>1ci Hissə</span>
            </div>

            <div
              className="second-half"
              //this style prop for odds classnames. and this according state change color and bg;
              style={{
                background: timeodd === "secondhalf" ? "#292744" : "",
                color: timeodd === "secondhalf" ? "#fff" : "",
              }}
              onClick={() => toggleTimeOdd("secondhalf")}>
              <span>2ci Hissə</span>
            </div>
          </div>
        </div>

        <div className="navigation-on-odds">
          {accordingList.map((accords) => (
            <div key={accords.id} className={`accordion-content ${according[accords.id] ? "active-accordion" : ""}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(accords.id)}>
                <span>{accords.title}</span>
                {according[accords.id] ? (
                  <FaAngleDown id="open-the-accordion" />
                ) : (
                  <FaAngleUp id="close-the-accordion" />
                )}
              </div>

              {/* ( MATCH RESULTS 1X2) */}
              {accords.id === 1 && according[accords.id] && (
                <div className="according-main" key={accords.id}>
                  {homeAwayDrawOdd.length !== 0 ? (
                    homeAwayDrawOdd.map((item: any, index: any) => (
                      <React.Fragment key={index}>
                        <div className="odds-title">
                          <span>{item[0]?.value}</span>
                          <span>{item[1]?.value}</span>
                          <span>{item[2]?.value}</span>
                        </div>
                        <div className="odds-wrapper">
                          <span
                            className="span"
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[0].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                '', '', '', '', item[0]?.value && '1',
                                accords.title && '1X2',
                                selectedlig?.toString(),
                                ligCountry?.toString(),
                              )
                            }>
                            {item[0]?.odd}
                          </span>
                          <span
                            className="span"
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[1].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                '', '', '', '', item[1]?.value && 'X',
                                accords.title && '1X2',
                                selectedlig?.toString(),
                              )
                            }>
                            {item[1]?.odd}
                          </span>
                          <span
                            className="span"
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[2].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                '', '', '', '', item[2]?.value && '2',
                                accords.title && '1X2',
                                selectedlig?.toString(),
                              )
                            }>
                            {item[2]?.odd}
                          </span>
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <span style={{ fontSize: "13.5px", color: "#6F8CAA" }}>Hələ ki, təxmin mövcud deyil..</span>
                  )}
                </div>
                // <div className="according-main" key={accords.id}>
                //   <div className="odds-title">
                //     {HomeAwayDrawTitles.map((title, index) => (
                //       <React.Fragment key={index}>
                //         <div className="odds-home">
                //           <span>{title.title}</span>
                //         </div>
                //       </React.Fragment>
                //     ))}

                //   </div>
                //   <div className="odds-wrapper">
                //      {homeAwayDrawOdd.length !== 0 ? homeAwayDrawOdd.map((innerArray:any, index:any) => (
                //       <div className="home-away-wrapper" key={index}>
                //         {innerArray.length !== 0 && (
                //           <React.Fragment key={index}>
                //           {innerArray.map((item:any, index:any) => (
                //             <div className="values-home-away-draw" key={index}>
                //             <span
                //             onClick={() => handleOpenPostTipModal(index, item?.odd, teamAway.toString(), teamHome.toString(), timeodd.toString(), MatchResult.toString(), '', '', [Ev1!.toString(), HecHeceX!.toString(), Qonaq2!.toString()] )}
                //             >{item?.odd}</span>
                //             </div>
                //           ))}
                //           </React.Fragment>
                //         )}
                //       </div>
                //      )) : (
                //       <span style={{fontSize: '13.5px', color: "#6F8CAA"}}>Hələ ki, təxmin mövcud deyil..</span>
                //      )}
                //   </div>
                // </div>
              )}

              {/* ( TOTAL GOALS ) */}
              {accords.id === 2 && according[accords.id] && (
                <div className="over-under-odds">
                  <div className="left">
                    <span className="oddname">Oddname</span>
                    {uniqueOddValues.map((item: any, index: number) => (
                      <span key={index} className="odd-no">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="over-container">
                    <span className="over_oddname">Over</span>
                    {overUnderOdd.map((item: any, index: number) => (
                      <React.Fragment key={index}>
                        {item.map((inner: any, index: number) => (
                          <React.Fragment key={index}>
                            {inner?.value.includes("Over") ? <span className="odd"
                            onClick={() => handleOpenPostTipModal(index, inner?.value.includes("Over") && inner?.odd, teamAway.toString(), teamHome.toString(), timeodd.toString(), '', '', '', '', inner?.value.includes("Over") && inner?.value, accords.title && 'OU', selectedlig?.toString())}
                            >{inner?.odd}</span> : ""}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="under-container">
                    <span className="under_oddname">Under</span>
                    {overUnderOdd.map((item: any, index: number) => (
                      <React.Fragment key={index}>
                        {item.map((inner: any, index: number) => (
                          <React.Fragment key={index}>
                            {inner?.value.includes("Under") ? <span className="odd"
                            onClick={() => handleOpenPostTipModal(index, inner?.value.includes("Under") && inner?.odd, teamAway.toString(), teamHome.toString(), timeodd.toString(), '', '', '', '', inner?.value.includes("Under") && inner?.value, accords.title && 'OU', selectedlig?.toString())}
                            >{inner?.odd}</span> : ""}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* BTS (Both team score) */}
              {accords.id === 3 && according[accords.id] && (
                <div className="both-team-score" key={accords.id}>
                  {bothTeamScoreOdds.length !== 0 ? (
                    bothTeamScoreOdds.map((item: any, index: any) => (
                      <React.Fragment key={index}>
                        <div className="value-yes-no">
                          <span>{item[0]?.value}</span>
                          <span>{item[1]?.value}</span>
                        </div>
                        <div className="odds-bts">
                          <span
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[0].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                item[0]?.value,
                                BTS.toString(),
                                '', '', item[0]?.value,
                                accords.title && 'BTS',
                                selectedlig?.toString(),
                              )
                            }>
                            {item[0]?.odd}
                          </span>
                          <span
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[1].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                item[1]?.value,
                                BTS.toString(),
                                '', '', item[1]?.value,
                                accords.title && 'BTS', 
                                selectedlig?.toString(),
                              )
                            }>
                            {item[1]?.odd}
                          </span>
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <span style={{ fontSize: "13.5px", color: "#6F8CAA" }}>Hələ ki, təxmin mövcud deyil..</span>
                  )}
                </div>
              )}

              {/* DC (double chance) */}
              {accords.id === 4 && according[accords.id] && (
                <div className="double-chance" key={accords.id}>
                  {doubleChanceOdd.length !== 0 ? (
                    doubleChanceOdd.map((item: any, index: any) => (
                      <React.Fragment key={index}>
                        <div className="value-1x-12-2x">
                          <span>{item[0].value && "1X"}</span>
                          <span>{item[1].value && "12"}</span>
                          <span>{item[2].value && "2X"}</span>
                        </div>
                        <div className="odds-dc">
                          <span
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[0].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                item[0]?.value && "1X",
                                DC.toString(),
                                '', '', item[0]?.value && '1X',
                                accords.title && 'DC',
                                selectedlig?.toString(),
                              )
                            }>
                            {item[0]?.odd}
                          </span>
                          <span
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[1].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                item[1]?.value,
                                DC.toString(),
                                '', '', item[1]?.value && '12',
                                accords.title && 'DC',
                                selectedlig?.toString(),
                              )
                            }>
                            {item[1]?.odd}
                          </span>
                          <span
                            onClick={() =>
                              handleOpenPostTipModal(
                                index,
                                item[2].odd,
                                teamAway.toString(),
                                teamHome.toString(),
                                timeodd.toString(),
                                item[2]?.value && "2X",
                                DC.toString(),
                                '', '', item[2]?.value && '2X',
                                accords.title && 'DC',
                                selectedlig?.toString()
                              )
                            }>
                            {item[2]?.odd}
                          </span>
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <span style={{ fontSize: "13.5px", color: "#6F8CAA" }}>Hələ ki, təxmin mövcud deyil..</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedMatch;
