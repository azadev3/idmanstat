import React, { SetStateAction } from "react";
import "../../../styles/loginregister/loginregister.scss";
import { Form, Formik, Field } from "formik";
import { LoginSchema } from "./schema/Schema";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../loadingandlazy/LoadingAnimation";
import { useRegisterContext } from "../../../context/RegisterContext";
import { Zoom, ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useProfileModal } from "../../../context/UserProfileEditModal";

export type RegisterLoginProps = {
  setLoadBtn: React.Dispatch<SetStateAction<boolean>>;
  loadBtn: boolean,
}

const Login = ({loadBtn, setLoadBtn}:RegisterLoginProps) => {

  const { setNavRegister, setNavRegisterActivedPage } = useRegisterContext();

  //loading button if clicked button
  const handleLoadingBtn = () => {
    setLoadBtn(true);
    const timeout:NodeJS.Timeout = setTimeout(() => {
      setLoadBtn(false);
      if(localStorage.getItem('username') || localStorage.getItem('nationality')) {
        return window.location.reload();
      } else {
        setNavRegister("Tebrikler");
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }

  return (
    <div className="login-container">
      <div className="title">
        <span>Xoş Gördük</span>
      </div>

      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const api = 'http://127.0.0.1:8000/account/api/user-login/';
          const data = values;
          const options = {
            validateStatus: (status:any) => {
              if(status === 200 || status >= 200) {
                return status
              };
            },
          };

          try {
            const response = await axios.post(api, data, options);
            if(response.data && response.status === 200) {
              toast.success('Daxil oldunuz və yönləndirilirsiniz...', {
                position: "top-center"
              });
              
              type dataType = {
                data: {
                  email: string,
                };
                token: string,
              };

              const backendDatas:dataType = response.data;
              // console.log(backendDatas.data, backendDatas.token); 
              const token = backendDatas.token;
              const email = backendDatas.data.email;

              //set localstorage this values;
              token && localStorage.setItem('authtoken', token);
              email && localStorage.setItem('email', email);

              if(localStorage.getItem('authtoken')){
                handleLoadingBtn();
              }
              
            } else if(response.data && response.status === 404) {
              toast.error('Bu istifadəçi ümumiyyətlə tapılmadı. Zəhmət olmasa qeydiyyatdan keçin.', {
                position: 'top-center',
              });
            } else if(response.data && response.status === 401) {
              toast.warn('Şifrə yaxud Email məlumatlarınız səhv daxil edilib. Yenidən yoxlayın.', {
                position: 'top-center',
              });
            } else {
              toast.error('Server gözlənilməz bir xəta ilə qarşılaşdı. Lütfən səhifəni yeniləyib, yenidən yoxlayın.', {
                position: 'top-right',
              })
            }
          }catch(error) {
            console.log('login ednpoint error', error);
          }


        }}>
        {(props) => (
          <Form className="form">
            <ToastContainer autoClose={1500} transition={Zoom} theme="colored"/>
            <div className="field-areas">
              <div className="field">
                <label htmlFor="email">E-mail ünvanını yaz</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  autoComplete="current-email"
                />
                {props.touched.email && props.errors.email && <span id="err-msg">{props.errors.email}</span>}
              </div>

              <div className="field">
                <div className="label-pass">
                  <label htmlFor="password">Şifrə</label>
                  <Link to="" className="primary-forgot-password">
                    Şifrəni Unutmusan ?
                  </Link>
                </div>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="***"
                  autoComplete="current-password"
                />
                {props.touched.password && props.errors.password && <span id="err-msg">{props.errors.password}</span>}
              </div>
            </div>

            <div className="buttons-and-more">
              <div className="primary-login-button">
                {/* LOADING BUTTON ANIMATION */}
                {loadBtn ? (
                  <LoadingAnimation />
                ):(
                <button id="primaryLoginBtn" type="submit">
                  Daxil ol
                </button>
                )}
              </div>
              <div className="additional-title">
                <span>və ya</span>
              </div>
              <div className="additional-options">
                <Link to="" id="additional-link"
                onClick={() => {
                  setNavRegister("Qeydiyyat");
                  setNavRegisterActivedPage("Qeydiyyat")
                }}
                >
                  Qeydiyyatdan Keç
                </Link>
                <Link to="" id="additional-link">
                  Qaydalar və şərtlər
                </Link>
                <Link to="" id="additional-link">
                  Gizlilik Şərtləri
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
