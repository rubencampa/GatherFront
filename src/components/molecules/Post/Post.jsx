import './post.css'
import Pfp from '../../../resources/img/user_img.png'
import Constantes from '../../../utils/Constantes'
import {Link} from 'react-router-dom'

const Post = (postData) => {
    // console.log(postData.postData.userid.imagePfp);
    const userActual = JSON.parse(localStorage.getItem('user'))
    return (
    <>
    <div className="div-post my-5" tabIndex={0}>
            <div className="header-post p-3">
              <h5>{postData.postData.titulo}</h5>
              {/* <div className="post-user"> */}
                <div className='userLink post-user' to="/userInfo">
                {(postData.postData.userid.imagePfp != null)? 
                            (<><div className="Pfp_on_header"><img src={`${Constantes.api_url}${postData.postData.userid.imagePfp}`} alt="" /></div></>)    
                        : (<> <div className="Pfp_header"><img src={Pfp} alt="" /></div></>)}
                  <div className="nomUsuario">{postData.postData.userid.username}</div>
                </div>
              {/* </div> */}
            </div>
            <div className="main-post my-auto ">
              {postData.postData.tipoPost == 1 ? 
              postData.postData.contenido
              :
              <img className='img-fluid' src={`${Constantes.api_url}${postData.postData.rutaImgPost}`} alt="" />}
            
            </div>
            <div className="footer-post py-3 px-5">
                
            </div>
    </div>
    </>
    )

}

export default Post