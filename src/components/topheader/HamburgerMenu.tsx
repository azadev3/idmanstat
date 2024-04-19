import React from "react";
import "./responsiveheader.scss";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useHamburgerContext } from "../../context/responsivecontext/HamburgerContext";
import { TopHeaderLoginType, TopHeaderNavbarType } from "../../types/TopHeaderNavbarType";
import '../../styles/responsive/responsive.css';
import Navigation from "../secondheader/Navigation";

const HamburgerMenu = () => {
  const TopHeaderItems: TopHeaderNavbarType[] = [
    {
      id: 1,
      title: "Xəbərlər",
      to: '/news',
    },
    {
      id: 2,
      title: "Kuponlar",
      to: '/tips',
    },
    {
      id: 3,
      title: "Bokmekerlər",
    },
    {
      id: 4,
      title: "Turnir Cədvəli",
    },
  ];

  const RightLoginItems: TopHeaderLoginType[] = [
    {
      id: 1,
      icon: "./profileicon.svg",
    },
    {
      id: 2,
      icon: "./favouriteicon.svg",
    },
    {
      id: 3,
      icon: "./ball1.svg",
    },
  ];

  const { setHamburgerMenu, hamburgerMenu } = useHamburgerContext(); //close hamburger and more;

  const hamburgerMenuDivRef = React.useRef<HTMLDivElement | null>(null); //referance to hamburger menu div element;

  //if outside clicked menu, close the hamburgermenu modal;
  React.useEffect(() => {
    const outsideClicked = (e: React.MouseEvent | MouseEvent) => {
      if (hamburgerMenuDivRef.current && !hamburgerMenuDivRef.current.contains(e.target as Node)) {
        setHamburgerMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);

    return () => document.removeEventListener("mousedown", outsideClicked);
  }, [hamburgerMenu]);

  const [hiddenItems, setHiddenItems] = React.useState<boolean>(false);

  return (
    <div className="hamburger-menu" ref={hamburgerMenuDivRef}>
      <header className="header-hamburger-menu">
        <div className="logo">
          <Link to="/" id="img-link">
            <img src="./idmanstatlog.svg" alt="idmanstat-logo" />
          </Link>
        </div>

        <div className="close-hamburger">
          <MdClose id="closeicon-hamburger" onClick={() => setHamburgerMenu(false)} />
        </div>
      </header>

      <main className="content-hamburger-menu">

        <div className="list-items">
          <Navigation hiddenItems={hiddenItems} setHiddenItems={setHiddenItems}/>
          {TopHeaderItems.map((items) => (
            <Link to={items.to || ''} id="link-top-header" key={items.id} onClick={() => setHamburgerMenu(false)}>
              <span>{items.title}</span>
            </Link>
          ))}
        </div>

        <div className="register-items">
          {RightLoginItems.map((register_items) => (
            <Link to="" id="link-bottom-header" key={register_items.id}>
               <img src={register_items.icon} alt="register_items_icon" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HamburgerMenu;
