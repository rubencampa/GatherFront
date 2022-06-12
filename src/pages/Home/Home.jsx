import "./home.css";
import Header from "../../components/molecules/Header/Header";
import Footer from "../../components/molecules/Footer/Footer";
import ScrollMenu from "../../components/molecules/ScrollMenu/ScrollMenu";
import Post from "../../components/molecules/Post/Post";
import { getUsuarios } from "../../components/services/UsersService";
import { getPosts, getPostsByTema } from "../../components/services/PostsService";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import * as React from 'react'
import Constantes from "../../utils/Constantes";


const Home = ({route}) => {
  // console.log(localStorage.getItem('user') == "");
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState();
  const [posts, setPosts] = useState();
  const [postsFiltrados,setPostsFiltrados] = useState()
  const [postsFiltradosPorBuscador,setPostsFiltradosPorBuscador] = useState([])
  const [idTema, setIdTema] = useState()
  const [temaEsSeleccionado, setTemaEsSeleccionado] = useState(false)
  const usuarioActual = JSON.parse(localStorage.getItem('user'))
  const bloquePosts = []
  const bloquePostsFiltrados = []
  const bloquePostsFiltradosPorBuscador = []
  
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const validateUserToken = (accessToken) => {
    setInterval(() => {
      const decodedJwt = parseJwt(accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("se acabo la sesion")
        localStorage.setItem('access_token','')
        localStorage.setItem('refresh_token','')
        localStorage.setItem('user','')
        navigate('/register')
      }
    }, 1800000);
  }

  const handleTemas = (e) => {
    setIdTema(e.id)
    setTemaEsSeleccionado(true)
  }

  const handleReiniciarTemas = () => {
    setTemaEsSeleccionado(false)
  }

  const handleDatosBuscador = (e) =>{
    setPostsFiltradosPorBuscador(e)
  }
  console.log(postsFiltradosPorBuscador.length);

  if (posts != null) {
    posts.forEach(post => {
      bloquePosts.push(
        <>
            <Post
              className = "publicacion"
              postData={post}
              />
        </>
      )
    });  
  }

  if (postsFiltrados != null) {
    postsFiltrados.forEach(post => {
      bloquePostsFiltrados.push(
        <>
            <Post
              className = "publicacion"
              postData={post}
              />
        </>
      )
    });  
  }

  
  // if (postsFiltradosPorBuscador.length != 0) {

    
    postsFiltradosPorBuscador.map((elto,index) => {(
      bloquePostsFiltradosPorBuscador.push((
        <>  
            <Post
              key={index}
              className = "publicacion"
              postData={elto}
              />
        </>
      ))
    )});  
  // }

  useEffect(() => {
    getUsuarios().then((res) => {
      setUsuarios(res);
    });
    getPosts().then((res) => {
      setPosts(res);
    })
    if (idTema != null) {
      getPostsByTema(idTema).then((res) => {
        setPostsFiltrados(res);
      }) 
    }
  }, [idTema]);

  return (
    <>
      <div className="container-home d-flex flex-column " onLoad={validateUserToken(localStorage.getItem('access_token'))}>
        <Header 
          handleDatosBuscador={handleDatosBuscador}
        />

        <ScrollMenu 
          id="menuScrollTemas"
          className="my-4" 
          handleTemas={handleTemas}
          handleReiniciarTemas={handleReiniciarTemas}
          />

        <main className="my-auto">
          {usuarioActual.is_superuser ? (<><div className="div_enlace-administrador"><a href="#" type="button" value="Administracion" className="enlace-administrador" onClick={() => window.location.href = `${Constantes.api_url}/admin`} >Administracion</a></div></>) : null}
          {/* {(postsFiltradosPorBuscador.length != 0) ? (<>{bloquePostsFiltradosPorBuscador}</>)
          :null} */}
          {/* {} */}
    
        {/* El filtro del buscador solo se ve cuando estoy en TODO */}
          {temaEsSeleccionado ? 
            (<>{bloquePostsFiltrados}</>) : 
              ((postsFiltradosPorBuscador.length > 0) ? (<>{bloquePostsFiltradosPorBuscador}</>) : 
                (<>{bloquePosts}</>))}
          
         {/* {bloquePostsFiltradosPorBuscador}  */}
        </main>

        <Footer />
      </div>
    </> 
  );
};

export default Home;
