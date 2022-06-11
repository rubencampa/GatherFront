import Constantes from '../../utils/Constantes'
import axios from "axios";
import { getUsuarios } from './UsersService';

const API_URL = Constantes.api_url; 

const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-type': 'aplication/json',
        accept: 'application/json'
    }
})

export default axiosInstance

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === API_URL + '/api/token/refresh/'
		) {
			window.location.href = '/register/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// En el momento que se expiran se obtiene la fecha actual para pillar la fecha de expiracion del token
				const now = Math.ceil(Date.now() / 1000);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/api/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/register/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/register/';
			}
		}
		return Promise.reject(error);
	}
);

// ======================================================
// DIFERENTE NOMENCLATURA PARA REALIZAR PETICIONES
// ======================================================

export async function login(usuario){
  return await axios({
      method: "POST",
      url: `${API_URL}/api/token/`,
      data:usuario
    })
      .then((res) => {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
		  getUsuarios().then((res) => {
			for (let i = 0; i < res.length; i++) {
				if (res[i].username === usuario.username) {
					localStorage.setItem('user',JSON.stringify(res[i]));
					localStorage.setItem('userid', res[i].id);
					localStorage.setItem('username',res[i].username)
				}
			}
		  });
          return "Acceso Concedido"})
      .catch(function (error) {
        if (error.reponse) {
          return "Error en la credenciales";
        }
      });
}

export async function registerUser(usuario) {
  return await axios({
    method: "POST",
    url: `${API_URL}/usuario/register/`,
    data:usuario
  })
    .then((response) => {
        return response.data})
    .catch(function (error) {
      if (error.reponse) {
        return error.response;
      }
    });
}


export async function RefreshAccessToken(RefreshToken){
  return await axios({
      method: "POST",
      url: `${API_URL}/api/token/refresh/`,
      data:RefreshToken
    })
      .then((res) => {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          return null})
      .catch(function (error) {
        // if (error.reponse) {
        //   return "Error en la credenciales";
        // }
        console.log(error);
      });
  }