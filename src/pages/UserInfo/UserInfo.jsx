import Header from '../../components/molecules/Header/Header'
import Footer from '../../components/molecules/Footer/Footer'
import './userInfo.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Pfp from '../../resources/img/user_img.png'
import Button from "@material-ui/core/Button"
import { useState } from 'react';
import Constantes from '../../utils/Constantes';
import style from "../../components/atoms/Button/btnActualizarPerfil"
import style2 from "../../components/atoms/Button/buttonsStyles"
import ModalImagenPerfil from '../../components/molecules/Modal/ModalImagenPerfil';
// import ModalLogin from '../../components/molecules/Modal/ModalLogin';
import { updateUsuariosById } from '../../components/services/UsersService';

const UserInfo = () => {
    const navigate = useNavigate();
    // if(localStorage.getItem('user') == null){navigate('/register')}
    const datos = useLocation();
    const [usuarioActualizado, setUsuarioActualizado] = useState(Constantes.UsuarioVacio)
    const [usuarioActual] = useState(JSON.parse(localStorage.getItem('user')))
    const [showModalCambiaImagen , setShowModalCambiaImagen] = useState(false)

    if (datos!=null) {
        console.log(datos);
    }

    const handleImagenPerfil = () =>{
        setShowModalCambiaImagen(!showModalCambiaImagen)
    }

    const handleGetImagen = (e) =>{
        setUsuarioActualizado({
			...usuarioActualizado,
			// Trimming any whitespace
			imagePfp: e
		});
    } 

    const handleChange = (e) => {
		setUsuarioActualizado({
			...usuarioActualizado,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
    // console.log(usuarioActualizado)
    // console.log(parseInt(localStorage.getItem('userid')));
	};

    const handleChangeTextArea = (e) => {
		setUsuarioActualizado({
			...usuarioActualizado,
			// Trimming any whitespace
			descripcion: e.target.innerHTML,
		});
    // console.log(parseInt(localStorage.getItem('userid')));
	};

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (usuarioActualizado.password === "") {
            usuarioActualizado.password = usuarioActual.password
        }
        if (usuarioActualizado.username === "") {
            usuarioActualizado.username = usuarioActual.username
        }
        if (usuarioActualizado.email === "") {
            usuarioActualizado.email = usuarioActual.email
        }
        if (usuarioActualizado.name === "") {
            usuarioActualizado.name = usuarioActual.name
        }
        if (usuarioActualizado.last_name === "") {
            usuarioActualizado.last_name = usuarioActual.last_name
        }
        if (usuarioActualizado.direccion === "") {
            usuarioActualizado.direccion = usuarioActual.direccion
        }
        if (usuarioActualizado.descripcion === "") {
            usuarioActualizado.descripcion = usuarioActual.descripcion
        }
        console.log(usuarioActualizado)
        updateUsuariosById(usuarioActual.id,usuarioActualizado).then((res) => {
            // setMessage(res)
            // setShowMessage(true)
        })
    }

    console.log(usuarioActual);

    return (<>
        <Header/>
        <main>
            <div className="container-userInfo">
                <h3>Información del usuario</h3>
                <div className="userInfo">
                    <form action="#" className='datosUsuario' onSubmit={handleSubmit}>
                       
                        {usuarioActual.imagePfp ? 
                            (<><div className="Pfp_on"><img src={`${Constantes.api_url}${usuarioActual.imagePfp}`} alt="" /></div></>)    
                        : (<> <div className="Pfp"><img src={Pfp} alt="" /></div></>)}
        
                        <Button onClick={handleImagenPerfil} variant="contained" type="button" className='mt-3 btn-actualizar' style={style2} >CAMBIAR IMAGEN</Button>
                        <div className="elto_info username">
                            <label htmlFor="username">Nombre de usuario </label>
                            <input onChange={handleChange} id='username' name='username' type="text" className='datos fs-4' defaultValue={usuarioActual?.username} />
                        </div>

                        <div className="elto_info name row">
                            <div className="col-md-6">
                                <label htmlFor="usuario">Nombre</label>
                                <input onChange={handleChange} name="name" id='usuario' type="text" className='datos fs-4' defaultValue={usuarioActual?.name} />
                            </div>
                            <div className="col-md-6 mt-sm-5 mt-lg-0">
                            <label htmlFor="usuario">Apellidos</label>
                            <input onChange={handleChange} name="last_name" id='usuario' type="text" className='datos fs-4' defaultValue={usuarioActual?.last_name} />
                            </div>
                        </div>
                        
                        <div className="elto_info email">
                            <label htmlFor="usuario">Correo electrónico </label>
                            <input onChange={handleChange} name="email" id='usuario' type="text" className='datos fs-4' defaultValue={usuarioActual?.email} />
                        </div>

                        <div className="elto_info direccion">
                            <label htmlFor="usuario">Dirección</label>
                            <input onChange={handleChange} name="direccion" id='usuario' type="text" className='datos fs-4' defaultValue={usuarioActual?.direccion} />
                        </div>

                        <div className="elto_info descripcion">
                            <label htmlFor="usuario">Descripción</label>
                            <span onBlur={handleChangeTextArea} name="descripcion" className='datos textarea_desc' id="" cols="1" rows="1" contentEditable={true} >{usuarioActual?.descripcion}</span>
                        </div>

                        <Button variant="contained" type="submit" className='btn-actualizar' style={style}>ACTUALIZAR</Button>
                    </form>
                </div>
            </div>
        </main>
        <Footer/>
        {showModalCambiaImagen ? (<>
                <ModalImagenPerfil
                    show={showModalCambiaImagen}
                    onHide={handleImagenPerfil}
                    handleGetImagen={handleGetImagen}
                />
        </>) : null}
    </>)
}

export default UserInfo