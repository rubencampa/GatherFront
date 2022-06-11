// import {useState} from 'react'
// import { useNavigate } from "react-router-dom";
import "./register.css";
// import Button from "@material-ui/core/Button";
// import style from "../../components/atoms/Button/buttonsStyles";
import Logo from "../../resources/img/logo_gather.png";
import { useState } from "react";
import ModalLogin from "../../components/molecules/Modal/ModalLogin";
import ModalReg from "../../components/molecules/Modal/ModalReg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import Constantes from "../../utils/Constantes";

const Register = () => {
  const [mostrarFormLogin, setMostrarFormLogin] = useState(false);
  const [mostrarFormReg, setMostrarFormReg] = useState(false);
  // let navigate = useNavigate();
  const showFormLogin = () => {
    setMostrarFormLogin(!mostrarFormLogin);
   
  }; 

  const showFormReg = () => {
    setMostrarFormReg(!mostrarFormReg);
    
  };
  return (
    <>
      <div className="container-register d-flex flex-column">
        <div className="container-content my-auto px-5">
          {/* <div className="div-sup col-12 d-flex justify-content-between">
            <Button
              className="button btn-login my-4"
              variant="contained"
              style={style}
              onClick={() => {
                navigate("/home");
              }}
            >
              Ir a inicio
            </Button>
          </div> */}
          <div className="div-sup col-12 d-flex">
            <h3 className="text-center w-100">Interact with our communities</h3>
          </div>
          <div className="logo-register col-md-12 mt-5">
            <div className="logo d-flex flex-column">
              <img className="img-fluid" src={Logo} alt="" />
              <h1 className="name text-white">Gather</h1>
            </div>
          </div>
          <div className="btn-acciones row justify-content-center align-items-center">
          <div className="button-form col-md-3 d-flex mt-5">
            <div className="box mx-auto fs-2" onClick={showFormReg}>REGISTER</div>
          </div>
          <div className="button-form col-md-3 d-flex mt-5">
            <div className="box mx-auto" onClick={showFormLogin}>JOIN IN</div>
          </div>
          </div>
          <div className="div-sup col-12 d-flex justify-content-between">
          <ul className="wrapper redes align-items-center">
              <li className="icon linkedIn">
                <span className="tooltip">LinkedIn</span>
                <span className="sm-logo">
                  <a href="https://www.linkedin.com/in/rub%C3%A9n-campanario-di%C3%A9guez-64ba6a1b9/">  <FontAwesomeIcon icon={faLinkedinIn}/></a>
                </span>
              </li>
              <li className="icon twitter">
                <span className="tooltip">Twitter</span>
                <span className="sm-logo">
                <a href="https://twitter.com/rubencampa163"> <FontAwesomeIcon icon={faTwitter} /></a>
                </span>
              </li>
              <li className="icon github">
                <span className="tooltip">Github</span>
                <span className="sm-logo">
                <a href="https://github.com/rubencampa"><FontAwesomeIcon icon={faGithub} /></a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
            {mostrarFormLogin ? (
              <ModalLogin
                show={mostrarFormLogin}
                onHide={showFormLogin}
              />
            ) : null}

      {mostrarFormReg ? (
        <ModalReg
          show={mostrarFormReg}
          onHide={showFormReg}
        />
      ) : null}
    </>
  );
};

export default Register;
