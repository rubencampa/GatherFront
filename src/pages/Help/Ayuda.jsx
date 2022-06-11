import Footer from "../../components/molecules/Footer/Footer"
import Header from "../../components/molecules/Header/Header"
import './ayuda.css'
const Ayuda = () =>{

    return (<>
    <Header/>
    <main>
        <div className="container-ayuda">
            <h3>Ayuda</h3>
            <div className="imagenes-ayuda">
            <div className="img img-1">
                <img className="img-fluid" src="http://localhost:8000/media/static/help/1.png" alt="" />
            </div>
            <div className="img img-btn-admin">
                <img className="img-fluid" src="http://localhost:8000/media/static/help/btn-admin.png" alt="" />
                <p>Botón que con el que accedes a la zona de administrador con el que puedes gestionar los diferentes usuarios, posts, temas ...</p>
            </div>
            <div className="img img-2">
                <img className="img-fluid" src="http://localhost:8000/media/static/help/2.png" alt="" />
            </div>
            <div className="img img-3">
                <img className="img-fluid" src="http://localhost:8000/media/static/help/3.png" alt="" />
            </div>
            <div className="img img-4">
                <img className="img-fluid" src="http://localhost:8000/media/static/help/4.png" alt="" />
            </div>
            </div>
        </div>
    </main>
    <Footer/>
    </>)
}

export default Ayuda