import {appendFileSync, existsSync, readFileSync, writeFileSync}  from 'node:fs'
import axios from 'axios';
import * as dotenv from 'dotenv';
import { threadId } from 'node:worker_threads';
dotenv.config();
// import axios from 'axios';
export class Busqueda {
	historial = [];
	dbPath = './db/database.json';

	get paramsMapbox() {
		return {
			access_token: process.env.MAP_BOX_KEY,
			limit: 5,
			language: 'es',
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
			const resInst = await instancia.get();
			return resInst.data.features.map((item) => ({
				id: item.id,
				name: item.place_name,
				lng: item.center[0],
				lat: item.center[1],
			}));
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

	async climaDelLugar(lat, lon) {
		try {
			// instancia axios del lugar
			const instance = axios.create({
				baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric&lang=es`,
			});
			// extraer la data
			const res = await instance.get();
			// retornarla

			return {
				desc: res.data.weather[0].description,
				min: res.data.main.temp_min,
				max: res.data.main.temp_max,
				temp: res.data.main.temp,
			};
		} catch (error) {
			console.log(error);
		}
	}

	guardarHistorial(lugar = '') {
		const corte = (lugar.length - lugar.search(','));
		const shortNameLugar = lugar.slice(0,-corte);
		// if((this.historial.includes(shortNameLugar.toLocaleLowerCase()))) return;
		console.log('ShortNAme: ' ,shortNameLugar);
		this.historial.unshift(shortNameLugar.toLocaleLowerCase());

		this.guardarEnDB();
	}

	leerHistorial() {
		if(!existsSync(this.dbPath)) return;
		// leer data
		const data = readFileSync(this.dbPath, {encoding: 'utf-8'});

		// parsear data
		if(!data) return;
		// convierte el json a objeto js
		const info = JSON.parse(data);
		this.historial = info.historial;
	}

	guardarEnDB() {
		const payload = {
			historial: this.historial
		}
		writeFileSync(this.dbPath, JSON.stringify(payload));
	}
}
