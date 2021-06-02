const personGenerator = {
	surnameJson: `{  
		"count": 16,
		"list": {
			"id_1": "Иванов",
			"id_2": "Смирнов",
			"id_3": "Кузнецов",
			"id_4": "Васильев",
			"id_5": "Петров",
			"id_6": "Михайлов",
			"id_7": "Новиков",
			"id_8": "Федоров",
			"id_9": "Кравцов",
			"id_10": "Николаев",
			"id_11": "Семёнов",
			"id_12": "Славин",
			"id_13": "Степанов",
			"id_14": "Павлов",
			"id_15": "Александров",
			"id_16": "Морозов"
		}
	}`,
	firstNameMaleJson: `{
		"count": 10,
		"list": {     
			"id_1": "Александр",
			"id_2": "Максим",
			"id_3": "Иван",
			"id_4": "Артем",
			"id_5": "Дмитрий",
			"id_6": "Николай",
			"id_7": "Михаил",
			"id_8": "Даниил",
			"id_9": "Егор",
			"id_10": "Андрей"
		}
	}`,
	firstNameFemaleJson: `{
		"count": 10,
		"list": {
			"id_1": "Александра",
			"id_2": "Мария",
			"id_3": "Маргарита",
			"id_4": "Светлана",
			"id_5": "Марина",
			"id_6": "Ольга",
			"id_7": "Ксения",
			"id_8": "Екатерина",
			"id_9": "Юлия",
			"id_10": "Татьяна"
		}
	}`,
	professionJson: `{
		"count": 9,
		"list": {
			"id_1": ["Программист", "Программистка"],
			"id_2": ["Писатель", "Писательница"],
			"id_3": ["Художник", "Художница"],
			"id_4": ["Преподаватель", "Преподавательница"],
			"id_5": ["Психолог", "Психологиня"],
			"id_6": ["Адвокат", "Адвокатесса"],
			"id_7": ["Шахтер", "Шахтерша"],
			"id_8": ["Слесарь", "Слесарша"],
			"id_9": ["Воин", "Воительница"]
		}
	}`, // задание требует феминитивов!


    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

		// случайный выбор гендера
    randomFirstName: function(gender) {
			return (gender === 'Мужчина' ? this.randomValue(this.firstNameMaleJson) : this.randomValue(this.firstNameFemaleJson));
    },

		// создает случайное отчество на основе мужских имен
		randomPatronym: function(gender) {
			let fatherName = this.randomFirstName("Мужчина");

			let letter = ''; // буква, соединяющая основу с окончанием
			if (fatherName.slice(-1) === 'й') {
				letter = 'е';
				fatherName = fatherName.slice(0,-1);
			} else {
				letter = 'о';
			}

			let ending = gender === 'Женщина' ? 'вна' : 'вич'; // присоединение окончания

			return fatherName + letter + ending;
		},

		randomSurname: function(gender) {
			let baseSurname = this.randomValue(this.surnameJson);
			if (gender === 'Женщина') {
				return baseSurname + 'а';
			} else {
				return baseSurname;
			}
    },

		// выбирает случайную профессию
		randomProfession: function(gender) {
			let professionType = this.randomValue(this.professionJson);
			return (gender === 'Мужчина' ? professionType[0] : professionType[1]);
		},

		// выбирает случайный пол
		randomGender: function() {
			return this.randomIntNumber() == 1 ? this.GENDER_FEMALE : this.GENDER_MALE;
		},

		// создает случайную дату
		randomDate: function() {
			let year = this.randomIntNumber(2000, 1920);
			let month = this.randomIntNumber(12, 1);
			let daysMax = 31;
			const monthes = {
				1: 'января',
				2: 'февраля',
				3: 'марта',
				4: 'апреля',
				5: 'мая',
				6: 'июня',
				7: 'июля',
				8: 'августа',
				9: 'сентября',
				10: 'октября',
				11: 'ноября',
				12: 'декабря'
			};
			
			if ([4,6,9,11].includes(month)) {
				daysMax -= daysMax;
			} else if (month === 2) {
				daysMax = daysMax - 3;
			}; // месяцы с уменьшенным числом дней

			let day = this.randomIntNumber(daysMax, 1);

			return `${day} ${monthes[month]} ${year}`;
		},


    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
				this.person.surname = this.randomSurname(this.person.gender);
				this.person.patronym = this.randomPatronym(this.person.gender);
				this.person.profession = this.randomProfession(this.person.gender);
				this.person.date = this.randomDate();
        return this.person;
    },

		clearPerson: function () {
			this.person = {};
		}
};
