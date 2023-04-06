import {
	inquirerMenu,
	leerInput,
	listarLugares,
	pausa,
} from './src/helpers/inquirer.js';
import { Busqueda } from './src/models/busquedas.js';

const main = async () => {
	const busquedas = new Busqueda();
	let opt;
	do {
		opt = await inquirerMenu();
		switch (opt) {
			case '1':
				// mostrar mensaje
				const lugar = await leerInput('Cuidad: ');
				// buscar lugar
				const lugares = await busquedas.cuidad(lugar);

				// seleccionar lugar
				const idSeleccionado = await listarLugares(lugares);
				const lugarSeleccionado = lugares.find(
					(sitio) => idSeleccionado === sitio.id
				);
				// mostrar resultado
				console.log(`\nCuidad: ${lugarSeleccionado.name}\n`);
				console.log(`\nLat: ${lugarSeleccionado.lat}\n`);
				console.log(`\nLng: ${lugarSeleccionado.lng}\n`);
				// mostrar temperatura
				const tempeLugar = await busquedas.climaDelLugar(
					lugarSeleccionado.lat,
					lugarSeleccionado.lng
				);
				console.log(`\nTemperatura : ${tempeLugar.temp}\n`);
				console.log(`\nTemperatura Max: ${tempeLugar.max}\n`);
				console.log(`\nTemperatura Min: ${tempeLugar.min}\n`);
				console.log(`\nDescripción: ${tempeLugar.desc}\n`);

				break;
		}
		if (opt !== 0) {
			await pausa();
		}
	} while (opt !== '0');
};
main();
