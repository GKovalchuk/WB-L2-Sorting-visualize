import { drawArray } from "./visualize.js";
import * as sortFs from "./sortFunctions.js";

const select = document.getElementById("sorts");
const begin = document.getElementById("begin");
const pause = document.getElementById("pause");
const arrLength = document.getElementById("arrLength");
const delayFactorInput = document.getElementById("delayFactor");
const delayFactorText = document.getElementById("delayFactorText");

// Коэффициент для задержки.
let delayFactor;

// Флаг для сортировки без необходимости вручную создавать новый массив.
let sortAgain = false;

// Генерим массив из случайных чисел.
// Создаем переменные.
let array = [];
// Получаем длину.
let length = Number(arrLength.value);
//  Максимальное значение в массиве.
let max = length + 2;
// Минимальное значение в массиве.
let min = 2;

// Сброс состояний кнопок.
export let resetButtons = () => {
	// Меняем вид кнопки.
	pause.dataset.pause = "play";
	pause.textContent = "Приостановить";
	// Задаем состояния кнопкам.
	begin.disabled = false;
	pause.disabled = true;
	arrLength.disabled = false;
	// Возвращаем старое значение троттлингу.
	throttle = (size) => {
		const delay = delayFactor / size;
		return new Promise((resolve) => setTimeout(resolve, delay));
	};
};

// Запускаем сортировку, выбранную пользователем.
const sort = async () => {
	let method = select.value;
	// Задаем состояния кнопкам.
	begin.disabled = true;
	pause.disabled = false;
	arrLength.disabled = true;

	// Запускаем сортировку.
	switch (method) {
		case "Сортировка пузырьком":
			await sortFs.bubbleSort(length, array);
			break;
		case "Сортировка выбором":
			await sortFs.selectionSort(length, array);
			break;
		case "Сортировка вставками":
			await sortFs.insertionSort(length, array);
			break;
		case "Быстрая сортировка":
			await sortFs.quickSort(0, length - 1, length, array);
			break;
		case "Сортировка кучей":
			await sortFs.heapSort(length, array);
			break;
	}
	// Задаем состояния кнопкам.
	resetButtons();
	// Разрешаем автогенерацию нового массива.
	sortAgain = true;
};

// Функция задержки выполнения кода.
// Троттлит визуализацию и ставит код на паузу по нажатию кнопки паузы.
export let throttle = (size) => {
	const delay = delayFactor / size;
	return new Promise((resolve) => setTimeout(resolve, delay));
};

// Функция приостановки выполнения сортировки.
function togglePause() {
	// Если мы останавливаем сортировку.
	if (pause.dataset.pause === "play") {
		// Разрешаем автогенерацию нового массива.
		sortAgain = true;
		// Задаем состояние кнопке "Заново".
		begin.disabled = false;

		// Меняем вид кнопки.
		pause.dataset.pause = "pause";
		pause.textContent = "Продолжить";
		arrLength.disabled = false;

		// Делаем троттлинг бесконечным.
		throttle = function () {
			return new Promise((resolve) => {});
		};

		// Если мы возобновляем сортировку.
	} else {
		// Запрещаем автогенерацию нового массива.
		sortAgain = false;
		// Задаем состояние кнопке "Заново".
		begin.disabled = true;

		// Меняем вид кнопки.
		pause.dataset.pause = "play";
		pause.textContent = "Приостановить";
		arrLength.disabled = false;

		// Возвращаем старое значение троттлингу.
		throttle = (size) => {
			const delay = delayFactor / size;
			return new Promise((resolve) => setTimeout(resolve, delay));
		};
		sort();
	}
}

//  Заполняем массив.
function fillArray() {
	// Обнуляем старый массив.
	array = [];

	// Заполняем. Числа могут повторяться.
	for (let i = 0; i < length; i++) {
		array.push(Math.floor(Math.random() * (max - min + 1) + min));
	}

	// Запрещаем автогенерацию нового массива.
	sortAgain = false;

	// Приводим кнопок в начальное состояние
	resetButtons();
}

// Заполняем массив и канвас при загрузке страницы.
fillArray();
drawArray(length, array, max);

// Назначаем прослушиватели событий кнопкам и инпутам.
begin.onclick = () => {
	if (sortAgain) {
		// Меняем вид кнопки.
		pause.dataset.pause = "play";
		pause.textContent = "Приостановить";
		arrLength.disabled = false;
		fillArray();
		drawArray(length, array, max);
	}
	sort();
};
pause.onclick = () => togglePause();
arrLength.addEventListener("input", (e) => {
	length = Number(e.target.value);
	if (length > 500) {
		length = 500;
		e.target.value = 500;
		attentionText.textContent = "Максимум 500 элементов";
		attentionText.hidden = false;
	} else if (length < 10) {
		length = 10;
		attentionText.textContent = "Минимум 10 элементов";
		attentionText.hidden = false;
	} else {
		attentionText.hidden = true;
	}
	max = length + 2;
	min = 2;
	fillArray();
	drawArray(length, array, max);
});
delayFactorInput.addEventListener("input", (e) => {
	delayFactor = Number(e.target.value);
	if (delayFactor > 99750) {
		delayFactor = 99750;
		e.target.value = 99750;
		delayFactorText.hidden = false;
	} else if (delayFactor < 0) {
		delayFactor = 0;
		delayFactorText.hidden = false;
	} else {
		attentionText.hidden = true;
	}
});
