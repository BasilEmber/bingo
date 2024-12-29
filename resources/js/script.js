let numberOfPhrases = 25; //depois conectar isso com o valor do dropdown
let result = Math.floor(numberOfPhrases / 2);

const textArea = document.getElementById("bingoTextArea");

async function loadData() {
	const response = await fetch("data.txt");
	const data = await response.text();
	textArea.value = data;
}

function generateNewBingo() {
	const bingoBoard = document.getElementById("bingo");
	bingoBoard.innerHTML = ""; //limpa o bingo, se não o vai gerar um bingo em baixo do bingo antigo

	const lines = textArea.value
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line);

	if (lines.length < numberOfPhrases) {
		alert(`O arquivo deve conter pelo menos ${numberOfPhrases} frases!`);
		return;
	}

	shuffleArray(lines);

	for (let i = 0; i < numberOfPhrases; i++) {
		const cell = document.createElement("div");
		cell.className = "bingoCube";
		cell.textContent = i === result ? "FREE" : lines[i];
		if (i === result) cell.classList.add("marked");
		cell.addEventListener("click", () => {
			if (i !== result) cell.classList.toggle("marked");
		});
		bingoBoard.appendChild(cell);
	}
}

function toggleTextarea() {
	const textArea = document.getElementById("bingoTextArea");

	if (textArea.style.display === "none") {
		textArea.style.display = "block";
	} else {
		textArea.style.display = "none";
	}
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function removeFree(){
	if (result == -1) {
		result = Math.floor(numberOfPhrases / 2);
		alert("Na proxima geração do bingo ele TERA o free no meio")
	} else{
		alert("Na proxima geração do bingo ele NÃO TERA o free no meio")
		result = -1
	}
}

toggleTextarea()
window.onload = loadData();
