import {BrowserRouter, Route, Routes} from "react-router-dom"
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import NewPost from "../pages/newPost/NewPost";
import UserInfo from "../pages/UserInfo/UserInfo";
import Register from './../pages/Register/Register'
import Ayuda from "../pages/Help/Ayuda";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/userInfo" element={<UserInfo/>}></Route>
      <Route path="/newPost" element={<NewPost/>}></Route>
      <Route path="/ayuda" element={<Ayuda/>}></Route>
      {/* Paginas de error (crea los componentes en la carpeta de páginas) */}
      <Route path="/error" element={<Error/>}></Route>
      <Route path="/noAutorizado" element={<Error/>}></Route>
      <Route path="*" element={<Error/>}></Route>

    </Routes>
  </BrowserRouter>
)

export default App;
