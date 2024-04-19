import React from "react";
import "../../styles/loginregister/loginregister.scss";
import Login from "./reglog/Login";
import Register from "./reglog/Register";
import Options from "./optionspage/Options";
import { useRegisterContext } from "../../context/RegisterContext";
import { useProfileModal } from "../../context/UserProfileEditModal";

type RegisterElementsType = {
  id: number;
  title: string;
};

const Index = () => {
  const { setPopup, navRegister, setNavRegister, navRegisterActivedPage, setNavRegisterActivedPage } = useRegisterContext();
  const RegisterLoginElements: RegisterElementsType[] = [
    { id: 1, title: "Daxil Ol" },
    { id: 2, title: "Qeydiyyat" },
  ];


  const toggleNav = (title: string) => {
    setNavRegister(title);
    setNavRegisterActivedPage(title); //at actived page add the style value;
  };

  //loading button animations
  const [loadBtn, setLoadBtn] = React.useState<boolean>(false);

  //outside clicked 
  const modalwrapperef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const outsideClicked = (e: React.KeyboardEvent | KeyboardEvent) => {
        if(modalwrapperef.current && e.key === 'Escape') {
          setPopup(false);
        }
    }
  

    document.addEventListener('keydown', outsideClicked);
    return () => document.removeEventListener('keydown', outsideClicked);
  }, [])

  return (
    <div className="modal-wrapper" ref={modalwrapperef}>
      {navRegister === "Tebrikler" ? (
        <Options loadBtn={loadBtn} setLoadBtn={setLoadBtn}/>
      ) : (
        <React.Fragment>
          <div className="modal-head">
            {RegisterLoginElements.map((register) => (
              <li
                onClick={() => {
                  toggleNav(register.title);
                }}
                style={{
                  borderTop:
                    register.id === 1 && navRegisterActivedPage === "Daxil Ol"
                      ? "3px solid #292744"
                      : register.id === 2 && navRegisterActivedPage === "Qeydiyyat"
                      ? "3px solid #D8D10B"
                      : "",
                  background:
                    register.id === 1 && navRegisterActivedPage === "Daxil Ol"
                      ? "#fff"
                      : register.id === 2 && navRegisterActivedPage === "Qeydiyyat"
                      ? "#fff"
                      : "",
                }}
                key={register.id}>
                {register.title}
              </li>
            ))}
          </div>


          {/* RENDER COMPONENTS ACCORDİNG TO navRegister give in value */}
          {navRegister === "Daxil Ol" && (
            <Login
              setLoadBtn={setLoadBtn}
              loadBtn={loadBtn}
            />
          )}


          {navRegister === "Qeydiyyat" && (
            <Register
              setLoadBtn={setLoadBtn}
              loadBtn={loadBtn}
            />
          )}

        </React.Fragment>
      )}
    </div>
  );
};

export default Index;
