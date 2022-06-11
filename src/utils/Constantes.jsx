// const usuarioLocalStorage = JSON.parse(localStorage.getItem('user',''))
// console.log(JSON.parse(localStorage.getItem('user')).password)
const Constantes = {
    api_url: process.env.REACT_APP_API_URL,
    PostVacio : {
        "userid": 0,
        "tema": 0,
        "titulo": "",
        "tipoPost": 0,
        "contenido": "",
        "rutaImgPost": null
    },
    UsuarioVacio : {
        "username": "",
        "email":"",
        "name": "",
        "last_name": "",
        "direccion": "",
        "descripcion": "",
        "password":  "",
        "imagePfp":"",
        "is_active": 1
    }
}

export default Constantes