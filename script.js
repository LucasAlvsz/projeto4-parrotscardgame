let comparaId = []
let armazenaCarta = []
let numeroDeJogadas = 0;
let numeroViradas = 0;
function virarCarta(cartaClicada) {
    numeroDeJogadas += 1;
    let classFrente = cartaClicada.querySelector(".face")
    let classVerso = cartaClicada.querySelector(".verso")
    classFrente.classList.toggle("frente-rotate")
    classVerso.classList.toggle("verso-rotate")
    comparaId.push(cartaClicada.id)
    armazenaCarta.push(cartaClicada)
    console.log("numero jogadas:" + numeroDeJogadas)
    if (comparaId.length == 2) {
        // Desabilita clicks enquanto as cartas são verificadas
        // document.getElementById("1").parentNode.style.pointerEvents = "none"
        // Caso as cartas sejam iguais, permanencem viradas.
        if (comparaId[0] == comparaId[1]) {
            armazenaCarta[0].disabled = true
            armazenaCarta[1].disabled = true
            comparaId = []
            armazenaCarta = []
            numeroViradas += 1
            console.log("numero viradas:" + numeroViradas)
            console.log("numero cartas:" + numeroDeCartas / 2)
            if (numeroViradas == numeroDeCartas / 2) {
                clearInterval(meuRelogio)
                let segundos = document.querySelector(".relogio")
                setTimeout(() => {
                    alert(`Você ganhou em ${numeroDeJogadas} jogadas e em ${segundos.innerHTML} segundos!`)
                }, 500);
                setTimeout(() => {
                    if (prompt("Você deseja jogar novamente? 1: Sim - 2: Não") == "1") {
                        location.reload();
                    }
                }, 1000);
                
            }
        } else {
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

function relogio() {
    let classRelogio = document.querySelector(".relogio")
    classRelogio.innerHTML = parseInt(classRelogio.innerHTML) + 1
}
let meuRelogio = setInterval(relogio, 1000)
let cartas = []
let numeroDeCartas = parseInt(prompt("Com quantas cartas você deseja jogar (Min: 4 - Max: 14)"))
while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 != 0) {
    numeroDeCartas = parseInt(prompt("Com quantas cartas você deseja jogar (Min: 4 - Max: 14)"))
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
main.innerHTML += cartas.toString().replace(/,/g, "")

