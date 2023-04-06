import { inquirerMenu, leerInput, pausa } from './src/helpers/inquirer.js';
import { Busqueda } from './src/models/busquedas.js';


const main = async () => {
	const busquedas = new Busqueda();
	let opt;
	do {
		opt = await inquirerMenu();
		let lugar = '';
		switch (opt) {
			case '1':
				// mostrar mensaje
				lugar = await leerInput('Cuidad: ');
				console.log(lugar);
				await pausa();
				// buscar lugar
				await busquedas.cuidad(lugar);
				// seleccionar lugar
				// mostrar resultado
				console.log(`\nCuidad: \n`);
				console.log(`\nLat: \n`);
				console.log(`\nLng: \n`);
				console.log(`\nTemperatura : \n`);
				console.log(`\nTemperatura Max: \n`);
				console.log(`\nTemperatura Min: \n`);

				break;
		}
		if (opt !== 0) {
			await pausa();
		}
	} while (opt !== '0');
};
main();
