import Header from '../../components/molecules/Header/Header'
import Footer from '../../components/molecules/Footer/Footer'
import './error.css'
const Error = () => {

    return (<>
        <Header/>
        <main>
            <div className="container-error text-light">
                <p>ERROR! PAGINA NO ENCONTRADA</p>
            </div>
        </main>
        <Footer/>
    </>)
}

export default Error