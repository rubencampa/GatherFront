import Footer from "../../components/molecules/Footer/Footer"
import Header from "../../components/molecules/Header/Header"
import Constantes from "../../utils/Constantes"
import {useState,useEffect} from 'react'
import Select from 'react-select'
import "./newPost.css"
// import { getUsuariosById } from "../../components/services/UsersService"

import { getTemas, insertPosts } from "../../components/services/PostsService"

const NewPost = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [message,setMessage] = useState()
  const [postAEnviar,setPostAenviar] = useState(Constantes.PostVacio)
  const [temas,setTemas] = useState([{
    label:"",
    value:""
  }])
  const usuarioActualId = parseInt(localStorage.getItem('userid'))
  console.log(usuarioActualId)
  const handleSubmit = (e) =>{
    e.preventDefault();
    postAEnviar.userid = usuarioActualId
    console.log(postAEnviar);
    insertPosts(postAEnviar).then((res) => {
      setMessage(res)
      setShowMessage(true)
		})
    setTimeout(() => {
      setShowMessage(false)
    }, 3000);
  }

  const handleChange = (e) => {
		setPostAenviar({
			...postAEnviar,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
    // console.log(postAEnviar)
    console.log(parseInt(localStorage.getItem('userid')));
	};

  const handleImgPost = (e) => {
    console.log(e.target.files[0]);
    setPostAenviar({
			...postAEnviar,
			// Trimming any whitespace
			rutaImgPost: e.target.files[0]
		});
  }

  const handleChangeSelect = (e) => {
		setPostAenviar({
			...postAEnviar,
			// Trimming any whitespace
			tema: e.value,
		});
	};

  const handleChangeRadio = (e) => {
		setPostAenviar({
			...postAEnviar,
			// Trimming any whitespace
			tipoPost: parseInt(e.target.value),
		});

    if(postAEnviar.tipoPost === 1){
        document.querySelector('textarea').disabled = true
        document.querySelector('input[type="file"]').disabled = false
    }else if(postAEnviar.tipoPost === 2){
        document.querySelector('textarea').value = ""
        document.querySelector('textarea').disabled = false
        document.querySelector('input[type="file"]').disabled = true
    }
	};

  useEffect(() => {
    getTemas().then((res) => {
      setTemas(
        res?.map(item => {
          return {value:item.id, label:item.nombre}
        })
      )
    })
  }, [usuarioActualId])
  

  return (
    <>
      <Header />
      <main className="container-newpost">
        <h3 className="titulo-newPost text-center pt-5">NEW POST</h3>
        <div id="form-main">
          <div id="form-div">
            <form className="form" id="form1" enctype="multipart/form-data">
              <p className="name">
                <input
                  name="titulo"
                  type="text"
                  className="feedback-input"
                  placeholder="Titulo"
                  id="tituloPost"
                  onChange={handleChange}
                />
              </p>
             <Select
              options={temas}
              name="tema"
              onChange={handleChangeSelect}
             />
              <div className="select-tipoPost form-check d-flex justify-content-around my-3">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="1"
                    onChange={handleChangeRadio}
                    defaultChecked={true}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Texto
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="2"
                    onChange={handleChangeRadio}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Imagen
                  </label>

                  <input
                    className="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                    onChange={handleImgPost}
                  ></input>
                </div>
              </div>

              <p className="text">
                <textarea
                  name="contenido"
                  className="feedback-input overflow-hidden"
                  id="comment"
                  placeholder="Contenido"
                  onChange={handleChange}
                ></textarea>
              </p>

              <div className="submit">
                <input type="submit" value="PUBLICAR" id="button-blue" onClick={handleSubmit} />
                <div className="ease"></div>
              </div>
            </form>
            {(message!=null && showMessage) ? (<><div className="text-light msg-conf">{message}</div></>) : null}
          </div>
         
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewPost;
