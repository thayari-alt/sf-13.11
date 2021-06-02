
window.onload = function()
{
	const fields = {
		surnameOutput: document.querySelector('#surnameOutput'),		
		firstNameOutput: document.querySelector('#firstNameOutput'),
		patronymOutput: document.querySelector('#patronymOutput'),
		genderOutput: document.querySelector('#genderOutput'),
		birthYearOutput: document.querySelector('#birthYearOutput'),
		professionOutput: document.querySelector('#professionOutput')
	}

	const fillData = (params) => {
		for (const [index, [key, value]] of Object.entries(Object.entries(fields))) {
			fields[key].innerText = params[index];
		}
	}

	const fillPersonData = () => {
		const initPerson = personGenerator.getPerson();
		const params = [
			initPerson.surname, 
			initPerson.firstName,
			initPerson.patronym,
			initPerson.gender,
			initPerson.date,
			initPerson.profession
		];

		fillData(params);
	}

	const clearData = () => {
		personGenerator.clearPerson();
		const params = ['Фамилия', 'Имя', 'Отчество', 'Пол', 'Дата рождения', 'Профессия'];

		fillData(params);
	}

	document.querySelector('#button-generate').addEventListener('click', fillPersonData);
	document.querySelector('#button-clear').addEventListener('click', clearData);
};

