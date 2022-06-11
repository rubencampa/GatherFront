import { Modal } from "react-bootstrap";
// import { Button } from "@material-ui/core";
// import { Logo } from '../../../resources/img/'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './modalLogin.css'
import { registerUser } from "../../services/LoginService";


const ModalReg = (props) => {

  let navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false)
  const [message,setMessage] = useState()

  const initialFormData = Object.freeze({
		email: '',
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

		registerUser(formData).then((res) => {
      setMessage("Usuario registrado con exito")
      setShowMessage(true)
    });

    setTimeout(() => {
      setShowMessage(false)
    }, 3000);
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
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-modal">
          <div className="brand-logo"></div>
          <div className="brand-title text-center">Gather</div>
          <div className="inputs mx-5">
          {(message!=null && showMessage) ? (<><div className="text-center p-2 msg-conf">{message}</div></>) : null}
            <label>USERNAME</label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
            <label>EMAIL</label>
            <input type="email" name="email" placeholder="correo@mail.com" onChange={handleChange}/>
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Mínimo 6 caracteres" onChange={handleChange}/>
            <button type="submit"  onClick={handleSubmit}>REGISTER</button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ModalReg;
