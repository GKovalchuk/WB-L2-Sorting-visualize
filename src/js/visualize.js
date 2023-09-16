import { throttle } from "./app.js";

// Создаем canvas.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// Подготавливаем создание ширины и высоты canvas.
let width;
let height;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
// Раскрашиваем.
context.fillStyle = "white";
context.strokeStyle = "black";

// Рисуем массив на canvas.
export const drawArray = (length, array, max) => {
	// Задаем размеры canvas.
	width = canvas.width / length;
	height = canvas.height / max;

	// Очищаем canvas.
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Создаем столбцы.
	for (let i = 0; i < length; i++) {
		// Координаты и высота столбца.
		let x = i * width;
		let y = canvas.height - array[i] * height;
		let h = array[i] * height;
		if (i == 0) {
			context.fillStyle = "#f87c56";
		} else if (i == 1) {
			context.fillStyle = "#3CAE74";
		} else {
			context.fillStyle = "white";
		}

		// Рисуем столбец.
		context.fillRect(x, y, width, h);
		context.strokeRect(x, y, width, h);
	}
};

const drawArrSorts = async (col1, col2, length, array) => {
	// Очищаем canvas.
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Перерисовываем массив.
	// Создаем столбцы.
	for (let i = 0; i < length; i++) {
		// Координаты и высота столбца.
		let x = i * width;
		let y = canvas.height - array[i] * height;
		let h = array[i] * height;
		// При перерисовке col1 и col2 выделяем цветом.
		if (i == col1) {
			context.fillStyle = "#f87c56";
		} else if (i == col2) {
			context.fillStyle = "#3CAE74";
		} else {
			context.fillStyle = "white";
		}

		// Рисуем столбец.
		context.fillRect(x, y, width, h);
		context.strokeRect(x, y, width, h);
	}

	// Задержка перед следующим проходом.
	// Величина задержки тем меньше, чем больше длина массива.
	await throttle(length);
};

// Обмен двух элементов массива.
export const swap = async (col1, col2, length, array) => {
	// Рисуем состояние массива перед свапом.
	await drawArrSorts(col1, col2, length, array);
	// Обмениваем значения col1 и col2.
	[array[col1], array[col2]] = [array[col2], array[col1]];
	// Рисуем состояние массива после свапа.
	await drawArrSorts(col1, col2, length, array);
};
