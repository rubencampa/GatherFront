import Button from "@material-ui/core/Button"
import Logo from "../../../resources/img/logo_gather.png"
import "../Header/header.css"
import style from "../../atoms/Button/buttonsStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useLocation,useNavigate } from "react-router-dom"
import { useState } from "react"
import Pfp from '../../../resources/img/user_img.png'
import { login } from "../../services/LoginService"
import Constantes from "../../../utils/Constantes"
import {Link} from 'react-router-dom'
import { getPostsByTitulo, getPosts } from "../../services/PostsService"

const Header = ({handleDatosBuscador}) => {
  const navigate = useNavigate()
  const usuario = useLocation();
  const [usuarioActual] = useState(usuario)
  const usernameActual = localStorage.getItem('username')
  const userActual = JSON.parse(localStorage.getItem('user'))
  const [filteredData, setFilteredData]=useState([])
  // console.log(userActual)
  const handlePostPorTitulo = e => {
    // console.log(e.target.value);
    if (e.target.value === "") {
      setFilteredData([])
      handleDatosBuscador(filteredData)
    }else{
      const datosFiltrados = []
      getPosts().then((posts) => {
        // posts.filter((post) => {
        //   if ( ((post.titulo).toLowerCase().startsWith((e.target.value).toLowerCase()))) {
        //     datosFiltrados.push(post)
        //     setFilteredData(datosFiltrados)
        //   }
        // })
        posts.forEach(post => {
          if ( ((post.titulo).toLowerCase().includes((e.target.value).toLowerCase()))) {
            datosFiltrados.push(post)
            // console.log(post);
            setFilteredData(datosFiltrados)
          }
        });
        handleDatosBuscador(filteredData)
      })
    }
  }
    return (
    <>
    {/* <div className="header container-fluid w-100"> */}
    <header className="w-100">
        <div className="logo col-md-4">
          <img className="img-fluid pe-3 imagenHeader" src={Logo} alt="" onClick={() => navigate('/home',{state:{username:usernameActual}})} />
          <h1 className="brand-name text-white">Gather</h1>
        </div>
        <div className="buscador-header col-7 my-sm-5 my-md-5 col-md-4">
          <div className="searchBar">
            <form action="#">
            <input
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              onChange={handlePostPorTitulo}
            />
            <button
              id="searchQuerySubmit"
              type="button"
              name="searchQuerySubmit"
            >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            </form>
          </div>
        </div>
        <div className="userData col-md-4 justify-content-center">
        {/* {usuarioActual.state != null? (<> */}
          <div className="nombreUsuario text-center mt-5 mt-sm-3 mt-md-4 mt-lg-0">
            {/* {usuarioActual.state?.username} */}
            <Link to="/userInfo" className="userLink" state={{'user': JSON.parse(localStorage.getItem('user'))}}>
            {userActual.imagePfp ? 
                            (<><div className="Pfp_on_header"><img src={`${Constantes.api_url}${userActual.imagePfp}`} alt="" /></div></>)    
                        : (<> <div className="Pfp_header"><img src={Pfp} alt="" /></div></>)}
              {/* <img className='img-fluid' src={Pfp} alt="" /> */}
              <p>{usernameActual}</p>
            </Link>
          </div>
          <div className="botones">
          {usuarioActual.state != null? (<>
            <Button className="button btn-login" variant="contained" onClick={() => navigate('/newPost')} style={style}>
              Crear post
            </Button>
          </>) : null}
          <Button className="button btn-login" variant="contained" onClick={() => {
            localStorage.setItem('access_token','')
            localStorage.setItem('refresh_token','')
            localStorage.setItem('user','')
            navigate('/register')
          }} style={style}>
            cerrar sesión
          </Button>
          </div>  
        </div>
      </header>
    {/* </div> */}
    </>
  );
};

export default Header;
