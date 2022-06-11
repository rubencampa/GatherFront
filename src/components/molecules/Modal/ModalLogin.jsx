import { Modal } from "react-bootstrap";
// import { Button } from "@material-ui/core";
// import { Logo } from '../../../resources/img/'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { login } from "../../services/LoginService";
import './modalLogin.css'

const ModalLogin = (props) => {
  let navigate = useNavigate();
  
  const [message,setMessage] = useState()

  const initialFormData = Object.freeze({
		username: '',
		password: '',
	});

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
		setFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

  const handleSubmit = (e) => {
		e.preventDefault();
		login(formData).then((res) => {
      if (res === "Acceso Concedido") {
        setMessage(res)
        setTimeout(() => {
          navigate('/home',{state:{username:formData.username}})
        }, 2000);
      }else{
        setMessage("Acceso denegado")
      }

    });
	};

  return (
    <div className="containerModal">
      <Modal
      {...props}
      className="modal"
      size="md"
      aria-labelledby="contained-modal-title-vcenter modal-sm"
      backdrop="static"
      keyboard={false}
      centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-modal">
          <div className="brand-logo"></div>
          <div className="brand-title text-center">Gather</div>
          <div className="inputs mx-5">
            {message? (<><div className="text-center p-2">{message}</div></>) : null}
            <label>USERNAME</label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} autoFocus={true}/>
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Mínimo 6 caracteres" onChange={handleChange}/>
            <button type="submit"  onClick={handleSubmit} className="btn-login">LOG IN</button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ModalLogin;
