import React from "react";
import "../../../../styles/tipspage/tips.scss";
import { VscSettings } from "react-icons/vsc";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

interface Country {
  id: number;
  title?: string;
  country?: string;
  counts: string;
}

interface Cupon {
  id: number;
  title: string;
  count: string;
}

interface Statuses {
  id: number;
  title: string;
  count: string;
}

interface AuthorReyting {
  id: number;
  title: string;
  count: string;
}

const Filters:React.FC = () => {
  //country filters
  const CountryFilterItems: Country[] = [
    {
      id: 1,
      title: "Hamısı",
      counts: "1776",
    },
    {
      id: 2,
      country: "İngiltərə",
      counts: "1573",
    },
    {
      id: 3,
      country: "Almaniya",
      counts: "94",
    },
    {
      id: 4,
      country: "Fransa",
      counts: "127",
    },
    {
      id: 5,
      country: "Norveç",
      counts: "6",
    },
  ];

  //cupons filters
  const CuponItems: Cupon[] = [
    {
      id: 1,
      title: "Ödənişli",
      count: "1776",
    },
    {
      id: 2,
      title: "Ödənişsiz",
      count: "148",
    },
  ];

  //status filters
  const StatusFilterItems: Statuses[] = [
    {
      id: 1,
      title: "Aktiv",
      count: "1776",
    },
    {
      id: 2,
      title: "Gözləmədə",
      count: "399",
    },
    {
      id: 3,
      title: "Qalib",
      count: "317711",
    },
    {
      id: 4,
      title: "Məğlub",
      count: "253513",
    },
  ];

  //author reyting filters
  const AuthorReytingItems: AuthorReyting[] = [
    {
      id: 1,
      title: "Hamısı",
      count: "1776",
    },
    {
      id: 2,
      title: "Top 10",
      count: "93",
    },
    {
      id: 3,
      title: "Top 100",
      count: "300",
    },
  ];

  //filter selectes process
  const [selectedCountry, setSelectedCountry] = React.useState<number>(1); //selected country
  const [selectedCupons, setSelectedCupons] = React.useState<number>(1); //selected cupons
  const [selectedAuthorReyting, setSelectedAuthorReyting] = React.useState<number>(1); //selected author reytings
  const [selectedStatus, setSelectedStatus] = React.useState<number>(1); //selected status
  //filter close or open
  const [filterCountry, setFilterCountry] = React.useState<boolean>(); //filter country
  const [filterCupons, setFilterCupons] = React.useState<boolean>(); //filter cupons
  const [filterStatus, setFilterStatus] = React.useState<boolean>(); //filter status
  const [filterAuthorReyting, setFilterAuthorReyting] = React.useState<boolean>(); //filter author reyting
  const [filterCoefficient, setFilterCoefficient] = React.useState<boolean>(); //filter coefficient

//filter selected functions
  const toggleSelectedCountry = (num: number) => {
    setSelectedCountry(num);
  };

  const toggleSelectedCupon = (num: number) => {
    setSelectedCupons(num);
  };

  const toggleSelectedStatus = (num: number) => {
    setSelectedStatus(num);
  };

  const toggleSelectedAuthorReyting = (num: number) => {
    setSelectedAuthorReyting(num);
  };

//filter title open or close functions
  const toggleFilterCountry = () => {
    setFilterCountry(!filterCountry);
  };

  const toggleFilterCupons = () => {
    setFilterCupons(!filterCupons);
  }

  const toggleFilterStatus = () => {
    setFilterStatus(!filterStatus);
  }

  const toggleFilterAuthorReyting = () => {
    setFilterAuthorReyting(!filterAuthorReyting);
  }

  const toggleFilterCoefficient = () => {
    setFilterCoefficient(!filterCoefficient);
  };


  //in coefficient filter, the range input values and show the values on the input type text;
  const [leftRangeValue, setLeftRangeValue] = React.useState<number>(0);
  const [rightRangeValue, setRightRangeValue] = React.useState<number>(0);

  const handleRangeChange = (num: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (num === 1) {
      setLeftRangeValue(Number(e.target.value));
    } else if (num === 2) {
      setRightRangeValue(Number(e.target.value));
    }
  };

  return (
    <div className="filters-container">
      <div className="title">
        <VscSettings id="filter-icon" />
        <span>Filterlər</span>
      </div>


      <div className="country-filter" style={{ minHeight: filterCountry ? "50px" : "300px" }}>
        <div className="title" onClick={() => toggleFilterCountry()}>
          <span>Ölkələr</span>
          {filterCountry ? <RiArrowDownSLine id="down" /> : <RiArrowUpSLine id="down" />}
        </div>
        {CountryFilterItems.map((items) => (
          <div className={`filter-box ${filterCountry ? "close" : ""}`} key={items.id}>
            <li onClick={() => toggleSelectedCountry(items.id)}>
              {items.id === 1 ? items.title : items.country} ({items.counts})
            </li>
            {selectedCountry === items.id ? <FaCheck id="check-icon" /> : ""}
          </div>
        ))}
      </div>

      {/* <div className="cupons" style={{ minHeight: filterCupons ? "50px" : "170px" }}>
        <div className="title" onClick={() => toggleFilterCupons()}>
          <span>Kupon Növü</span>
          {filterCupons ? <RiArrowDownSLine id="down" /> : <RiArrowUpSLine id="down" />}
        </div>

        {CuponItems.map((items) => (
          <div className={`cupons-box ${filterCupons ? "close" : ""}`} key={items.id}>
          <li onClick={() => toggleSelectedCupon(items.id)}>
            {items.title} ({items.count})
          </li>
          {selectedCupons === items.id ? <FaCheck id="check-icon" /> : ""}
        </div>
        ))}
      </div> */}

      <div className="coefficients" style={{ minHeight: filterCoefficient ? "50px" : "100px" }}>
        <div className="title" onClick={toggleFilterCoefficient}>
          <span>Əmsal</span>
          {filterCoefficient ? <RiArrowDownSLine id="down" /> : <RiArrowUpSLine id="down" />}
        </div>

        <div className={`select-container ${filterCoefficient ? "close" : ""}`}>
           <div className="coefficient-box">
              <div className="left-cof">
                <input type="text" 
                value={leftRangeValue}
                readOnly
                />
              </div>

              <div className="right-cof">
                <input type="text" 
                value={rightRangeValue}
                readOnly
                />
              </div>
           </div>

           <div className="selector">
            <input type="range" 
            onChange={(e) => handleRangeChange(1, e)} 
            />
            <input type="range" 
            onChange={(e) => handleRangeChange(2, e)} 
            />
          </div>

        </div>
      </div>

      <div className="statuses" style={{ minHeight: filterStatus ? "50px" : "170px" }}>
        <div className="title" onClick={() => toggleFilterStatus()}>
          <span>Status</span>
          {filterStatus ? <RiArrowDownSLine id="down" /> : <RiArrowUpSLine id="down" />}
        </div>

        {StatusFilterItems.map((items) => (
          <div className={`cupons-box ${filterStatus ? "close" : ""}`} key={items.id}>
          <li onClick={() => toggleSelectedStatus(items.id)}>
            {items.title} ({items.count})
          </li>
          {selectedStatus === items.id ? <FaCheck id="check-icon" /> : ""}
        </div>
        ))}
      </div>

      <div className="author-reytings" style={{ minHeight: filterAuthorReyting ? "50px" : "150px" }}>
        <div className="title" onClick={() => toggleFilterAuthorReyting()}>
          <span>Müəllif Reyting</span>
          {filterAuthorReyting ? <RiArrowDownSLine id="down" /> : <RiArrowUpSLine id="down" />}
        </div>

        {AuthorReytingItems.map((items) => (
          <div className={`cupons-box ${filterAuthorReyting ? "close" : ""}`} key={items.id}>
          <li onClick={() => toggleSelectedAuthorReyting(items.id)}>
            {items.title} ({items.count})
          </li>
          {selectedAuthorReyting === items.id ? <FaCheck id="check-icon" /> : ""}
        </div>
        ))}
      </div>


    </div>
  );
};

export default Filters;
