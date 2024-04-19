/////// ACCORDING MATCH STATUS , SHOW VALUES TIME OR MATCH STATUS
////// THIS FUNCTION USED BE Games.tsx component as <span> GamesByDate(items) </span> 

const formattedDate = (datetime: string) => {
  const date = new Date(datetime);

  //conver to hours and minutes formatted
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  //return formattedTime;
  return formattedTime;
};
export const GamesByDate = (items: any) => {
  if (items.fixture.status?.short === "HT") {
    return <span style={{color: 'red'}}>{items.fixture.status?.short}</span>
  } else if (items.fixture.status?.short === "FT") {
    return <span style={{color: 'red'}}>Bitdi</span>
  } else if (items.fixture.status?.short === "2H") {
    return items.fixture.status?.short;
  } else if (items.fixture.status?.short === "PST") {
    return items.fixture.status?.short;
  } else if (items.fixture.status?.short === "ABN") {
    return items.fixture.status?.short;
  } else if (items.fixture.status?.short === "SUS") {
    return items.fixture.status?.short;
  } else if (items.fixture.status?.short === "INT") {
    return items.fixture.status?.short;
  } else if (items.fixture.status?.short === "CANC") {
    return <span style={{color: 'red'}}>Ləğv</span>
  } else if (items.fixture.status?.short === "AWT") {
    return items.fixture.status?.short;
  } else {
    return formattedDate(items.fixture?.date);
  }
};
