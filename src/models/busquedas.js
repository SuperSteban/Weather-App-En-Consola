import axios from 'axios';
import * as dotenv from 'dotenv'
dotenv.config()
// import axios from 'axios';
export class Busqueda {
	historial = [];

	get paramsMapbox() {
		return {
			'access_token': process.env.MAP_BOX_KEY,
			'limit': 5,
			'language': 'es',
		};
	}

	constructor() {
		// TODO : Leer DB si existe
		console.log(this.historial);
	}

	async cuidad(lugar = '') {
		try {
			const instancia = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
				params: this.paramsMapbox,
			});

			// const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?language=es&access_token=pk.eyJ1IjoiMjctamVzdGViYW5zYW4yOCIsImEiOiJjbGc0aGp2b3YwNW5tM2RrOTlsa2Fhb2J6In0.WfuZHPFvkgb1WDLGQLlTcg`);
			const resInst = await instancia.get();
			console.log(resInst);
			// console.log(res.data);
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
			return [];
		}
	}
}
