let comparaId = []
let armazenaCarta = []
function virarCarta(cartaClicada) {
    let classFrente = cartaClicada.querySelector(".face")
    let classVerso = cartaClicada.querySelector(".verso")
    classFrente.classList.toggle("frente-rotate")
    classVerso.classList.toggle("verso-rotate")
    comparaId.push(cartaClicada.id)
    armazenaCarta.push(cartaClicada)
    // Caso as cartas sejam iguais, permanencem viradas.
    if (comparaId.length == 2){
        if (comparaId[0] == comparaId[1]) {
            armazenaCarta[0].disabled = true
            armazenaCarta[1].disabled = true
            comparaId = []
            armazenaCarta = []
        } else{
            // Desvira as cartas após 1 segundo, caso elas sejam diferentes.
            setTimeout(() => {
                armazenaCarta[0].querySelector(".face").classList.toggle("frente-rotate")
                armazenaCarta[0].querySelector(".verso").classList.toggle("verso-rotate")
                classFrente.classList.toggle("frente-rotate")
                classVerso.classList.toggle("verso-rotate")
                armazenaCarta = []
            }, 1000);
            comparaId = []
        }
    }

}

let cartas = []
let numeroDeCartas = parseInt(prompt("Com quantas cartas você deseja jogar"))
while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 != 0) {
    numeroDeCartas = parseInt(prompt("Com quantas cartas você deseja jogar"))
}
const main = document.querySelector("main")
for (let i = 0; i < numeroDeCartas / 2; i++) {
    let card = `
    <button class="card" id="${i}" onclick="virarCarta(this)">
        <div class="face">
            <img src="gifs/front.png" alt="front">
        </div>
        <div class="face verso">
               <img src="gifs/gif${i}.gif" alt="gif${i}">
        </div>
    </button>
    `
    cartas.push(card)
    cartas.push(card)
}
// 
function comparador() {
    return Math.random() - 0.5;
}
cartas.sort(comparador)
main.innerHTML = cartas.toString().replace(/,/g, "")

