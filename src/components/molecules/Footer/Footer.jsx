import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="contenido-footer">
          
          <div className="cajaRedes">
            <label className="">Redes</label>
            <ul className="wrapper redes">
              <li className="icon linkedIn">
                <span className="tooltip">LinkedIn</span>
                <span className="sm-logo" aria-label="LinkedIn">
                  <a href="https://www.linkedin.com/in/rub%C3%A9n-campanario-di%C3%A9guez-64ba6a1b9/">
                    {" "}
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </span>
              </li>
              <li className="icon twitter">
                <span className="tooltip">Twitter</span>
                <span className="sm-logo" aria-label="Twitter">
                  <a href="https://twitter.com/rubencampa163">
                    {" "}
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </span>
              </li>
              <li className="icon github">
                <span className="tooltip">Github</span>
                <span className="sm-logo" aria-label="Github">
                  <a href="https://github.com/rubencampa">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </span>
              </li>
            </ul>
          </div>
          

          <div className="copy">
            <h4 className="">
              Todos los derechos reservados &copy;
            </h4>
          </div>

          <div className="correo">
            <label className="my-1">Información</label>
            <ul className="wrapper iconoCorreo">
              <li className="icon correo">
                <span className="tooltip">Correo</span>
                <span className="sm-logo" aria-label="Correo electrónico">
                  <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvrcSTtgJJCnqXNWRSbsLnpJXXRGHMgnhFzlFqxnmDJLTsrQBxRWQvczWsmXwWWLGMNDVV">
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </span>
              </li>
              <li className="icon correo">
                <span className="tooltip">Ayuda</span>
                <span className="sm-logo" aria-label="Ayuda">
                  <Link to="/ayuda"> <FontAwesomeIcon icon={faCircleQuestion} /></Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
