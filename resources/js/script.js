let numberOfCubes = 25
let result = Math.floor(numberOfCubes / 2);

async function generateNewBingo() {

    const bingoBoard = document.getElementById("bingo");
    bingoBoard.innerHTML = ""; //limpa o bingo, se não o vai gerar um bingo em baixo do bingo antigo
    
    
    const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
    shuffleArray(numbers);

    const data = await fetch("data.txt").then((res) => res.text());
    const lines = data
        .split("\n")
        .map((line) => line.trim())

    if (lines.length < numberOfCubes) {
        alert(`O arquivo deve conter pelo menos ${numberOfCubes} frases!`);
        return;
    }

    shuffleArray(lines);

    for (let i = 0; i < numberOfCubes; i++) {
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = generateNewBingo;