import axios from "axios";
import Constantes from "../../utils/Constantes";

const API_URL = Constantes.api_url;

// Primer peticion de ejemplo para traer usuarios

export async function getPosts() {
  return await axios({
    method: "GET",
    url: `${API_URL}/posts/posts/`,
  })
    .then((response) => {
        return response.data})
    .catch(function (error) {
      if (error.reponse) {
        return error.response;
      }
    });
}

export async function insertPosts(publicacion) {
  // console.log(publicacion);
  return await axios({
    method: "POST",
    url: `${API_URL}/posts/posts/`,
    data:publicacion,
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      console.log(response);
        return "Post publicado correctamente"})
    .catch(function (error) {
      if (error.reponse) {
        return "Error al publicar el post"
      }
    });
}

export async function getPostsByTema(idtema) {
  return await axios({
    method: "GET",
    url: `${API_URL}/posts/posts/${idtema}/`,
  })
    .then((response) => {
        return response.data})
    .catch(function (error) {
      if (error.reponse) {
        return error.response;
      }
    });
}

export async function getPostsByTitulo(titulo) {
  return await axios({
    method: "GET",
    url: `${API_URL}/posts/posts/search/${titulo}/`,
  })
    .then((response) => {
        return response.data})
    .catch(function (error) {
      if (error.reponse) {
        return error.response;
      }
    });
}


export async function getTemas() {
  return await axios({
    method: "GET",
    url: `${API_URL}/posts/temas/`,
  })
    .then((response) => {
        return response.data})
    .catch(function (error) {
      if (error.reponse) {
        return error.response;
      }
    });
}