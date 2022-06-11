import { Modal } from "react-bootstrap";
// import { Button } from "@material-ui/core";
// import { Logo } from '../../../resources/img/'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './modalLogin.css'
import './modalImagen.css'

const ModalImagenPerfil = (props) => {
  let navigate = useNavigate();
  
  const [message,setMessage] = useState()

  // const handleChang = (e) => {
	// 	setFormData({
	// 		...formData,
	// 		// Trimming any whitespace
	// 		[e.target.name]: e.target.value.trim(),
	// 	});
	// };


 //PRUEBA

 const [imgPerfil, setImgPerfil] = useState();

  const handleSelecionarImagen = (e) =>{
    let file = e.target.previousElementSibling.files[0]
    if (file !== undefined) {
      props.handleGetImagen(file)
    }
  }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     //logic to create new user...
//   };

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
        <Modal.Title id="contained-modal-title-vcenter" className="text-center w-100">Cambiar imagen perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-modal">
        <label for="file-input" className="text-center p-3">Haz clic o arrastra una imagen para seleccionarla</label>
        <input type="file" name="" id="file-input" />
        <button type="button" onClick={handleSelecionarImagen}>CONFIRMAR</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ModalImagenPerfil;
