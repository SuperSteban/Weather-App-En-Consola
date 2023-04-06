import inquirer from 'inquirer';

const questions = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Qué hacer?\n\n',
		choices: [
			{
				value: '1',
				name: '1. BUSCAR CIUDAD',
			},
			{
				value: '2',
				name: '2. HISTORIAL',
			},
			{
				value: '0',
				name: '0. SALIR',
			},
		],
	},
];

const inputInquiere = [
	{
		type: 'input',
		name: 'theInput',
		message: 'Presiona Enter Para Continuar\n',
	},
];

export const inquirerMenu = async () => {
	console.clear();
	const { opcion } = await inquirer.prompt(questions);
	return opcion;
};

export const pausa = async () => {
	await inquirer.prompt(inputInquiere);
};

export const leerInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) {
					return 'Ingrese un valor';
				}
				return true;
			},
		},
	];
	const { desc } = await inquirer.prompt(question);
	return desc;
};

export const listarLugares = async (lugares = []) => {
	const choices = lugares.map((lugares, i) => {
		const indx = i + 1;
		return {
			value: lugares.id,
			name: `${indx} ${lugares.name}`,
		};
	});

	choices.unshift({
		value: '0',
		name: '0. Cancelar',
	});
	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'Seleciona Lugar: ',
			choices,
		},
	];
	const { id } = await inquirer.prompt(preguntas);

	return id;

};
export const CompletadoCheckList = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const indx = i + 1;
		return {
			value: tarea.id,
			name: `${indx} ${tarea.description}`,
			checked: tarea.completadoEn === 0,
		};
	});

	choices.unshift({
		value: '0',
		name: '0. Cancelar',
	});
	const pregunta = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione',
			choices,
		},
	];
	const { ids } = await inquirer.prompt(pregunta);

	return ids;

	/* {
        value: tareas.id
        name:  
    } */
};
export const confirmarAccion = async (mensaje) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			mensaje,
		},
	];
	const { ok } = await inquirer.prompt(question);
	return ok;
};
