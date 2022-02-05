// Definindo variaveis
let comparaId = []
let armazenaCarta = []
let numeroDeJogadas = 0;
let numeroViradas = 0;
let cartas = []
let meuRelogio = setInterval(relogio, 1000)
// Função que vira as cartas e analisa se devem as mesmas devem permanecer viradas ou "desvirarem"
function virarCarta(cartaClicada) {
    // Acrescenta 1 ao numero de jogadas total
    numeroDeJogadas += 1;
    // Selecionando classes de frente e verso das cartas 
    let classFrente = cartaClicada.querySelector(".face")
    let classVerso = cartaClicada.querySelector(".verso")
    classFrente.classList.toggle("frente-rotate")
    classVerso.classList.toggle("verso-rotate")
    // Armazenando Id's e as cartas que foram clicadas
    comparaId.push(cartaClicada.id)
    armazenaCarta.push(cartaClicada)
    // Caso duas cartas sejam clicadas ou/e não seja ela mesma
    if (comparaId.length == 2 && armazenaCarta[0] != armazenaCarta[1]) {
        // Impede o click em outras cartas enquanto as analises/animações são feitas
        document.getElementById("1").parentNode.style.pointerEvents = "none"
        // Caso os Ids das cartas sejam iguais, os pares permanencem virados.
        if (comparaId[0] == comparaId[1]) {
            armazenaCarta[0].disabled = true
            armazenaCarta[1].disabled = true
            // Esvaziando listas
            comparaId = []
            armazenaCarta = []
            // Acrescentando +1 no número de jogadas
            numeroViradas += 1
            // Caso o numero de viradas seja o total de cartas / 2 o jogo chega ao fim
            if (numeroViradas == numeroDeCartas / 2) {
                clearInterval(meuRelogio)
                let segundos = document.querySelector(".relogio")
                // Alerta de fim de jogo após a renderização da ultima animação de carta virando
                setTimeout(() => {
                    alert(`Você ganhou em ${numeroDeJogadas} jogadas e em ${segundos.innerHTML} segundos!`)
                }, 500);
                // Opção de jogar novamente após o alert de finalizar o jogo
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
    setTimeout(() => {
        // Reabilita os clicks após as cartas serem verificadas/desviradas
        document.getElementById("1").parentNode.style.pointerEvents = ""
    }, 1600);
}
// Função que acrescenta de 1 em 1 o relógio.
function relogio() {
    let classRelogio = document.querySelector(".relogio")
    classRelogio.innerHTML = parseInt(classRelogio.innerHTML) + 1
}
// Enquanto o numero de cartas for invalido.
let numeroDeCartas = parseInt(prompt("Com quantas cartas você deseja jogar (Min: 4 - Max: 14)"))
while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 != 0) {
    numeroDeCartas = parseInt(prompt("Com quantas cartas você deseja jogar (Min: 4 - Max: 14)"))
}
// Criando um array de acordo com o numero de cartas escolhido pelo jogador.
for (let i = 0; i < numeroDeCartas / 2; i++) {
    let card = `
    <button class="card" id="${i}" onclick="virarCarta(this)"  data-identifier="card">
        <div class="face" data-identifier="front-face">
            <img src="gifs/front.png" alt="front">
        </div>
        <div class="face verso" data-identifier="back-face">
               <img src="gifs/gif${i}.gif" alt="gif${i}">
        </div>
    </button>
    `
    // A cada loop do for, um par de cartas é adcionado ao array.
    cartas.push(card)
    cartas.push(card)
}
// Ramdomizando a distribuição de cartas
function comparador() {
    return Math.random() - 0.5;
}
cartas.sort(comparador)
// Selecionando onde o array com as cartas devem ser inseridos/inserindo-os.
const main = document.querySelector("main")
main.innerHTML += cartas.toString().replace(/,/g, "")

