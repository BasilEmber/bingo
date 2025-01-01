let numberOfPhrases = 25; //depois conectar isso com o valor do dropdown
let result = Math.floor(numberOfPhrases / 2);

const textArea = document.getElementById("bingoTextArea");

async function loadData() {
	const response = await fetch("resources/data.txt");
	const data = await response.text();
	textArea.value = data;

	if(JSON.parse(localStorage.getItem("bingoValues"))){
		loadBingo();	
	}
}

function generateNewBingo() {
	const bingoValues = textArea.value
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line);

	if (bingoValues.length < numberOfPhrases) {
		alert(`O arquivo deve conter pelo menos ${numberOfPhrases} frases!`);
		return;
	}

	shuffleArray(bingoValues);
	//textArea.value = bingoValues.toString().Replace(',','\n');

	createBingoBoard(bingoValues,numberOfPhrases);
	storeBingo(bingoValues,numberOfPhrases);
}

function createBingoBoard(bingoValues, numberOfPhrases){	
	const bingoBoard = document.getElementById("bingo");
	bingoBoard.innerHTML = ""; //limpa o bingo, se não o vai gerar um bingo em baixo do bingo antigo

	for (let i = 0; i < numberOfPhrases; i++) {
		const cell = document.createElement("div");
		cell.className = "bingoCube";
		cell.textContent = i === result ? "FREE" : bingoValues[i];
		if (i === result) cell.classList.add("marked");
		cell.addEventListener("click", () => {
			if (i !== result) cell.classList.toggle("marked");
			storeMarkedCubes();
		});
		bingoBoard.appendChild(cell);
	}
}


function markCube(index){
	document.getElementsByClassName("bingoCube")[index].classList.add("marked");
}

function getMarkedCubes(){
	let markedCubes = [];
	const bingoCubes = Array.from(document.getElementsByClassName("bingoCube"));
	
	bingoCubes.forEach(element => {
		markedCubes[bingoCubes.indexOf(element)] = element.className.split(' ').indexOf("marked") != -1 ? true : false;
		//console.log(element);
	});

	//console.log(markedCubes);
	return markedCubes;
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

function storeBingo(bingoValues,numberOfPhrases){
	localStorage.setItem("bingoValues", JSON.stringify(bingoValues));
	localStorage.setItem("amount", numberOfPhrases);
}

function storeMarkedCubes(){
	localStorage.setItem("markedCubes", JSON.stringify(getMarkedCubes()));
}

function loadBingo(){
	bingoValues = JSON.parse(localStorage.getItem("bingoValues")) ? JSON.parse(localStorage.getItem("bingoValues")) : fetch("resources/data.txt");
	numberOfPhrases = localStorage.getItem("amount") ? localStorage.getItem("amount") : 25 ;
	markedCubes = JSON.parse(localStorage.getItem("markedCubes"));

	createBingoBoard(bingoValues, numberOfPhrases);

	if(markedCubes)
	for(i = 0; i < markedCubes.length; i++){
		if(markedCubes[i]){
			markCube(i);
		}
	}
}

toggleTextarea()
window.onload = loadData();
