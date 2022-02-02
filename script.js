function virarCarta(botao) {
    let idFrente = botao.querySelector(".face")
    let idVerso = botao.querySelector(".verso")
    idFrente.classList.toggle("frente-rotate")
    idVerso.classList.toggle("verso-rotate")
}

let numeroDeCartas = prompt("Com quantas cartas você deseja jogar")
let cartas = []
const card = `
<div class="card" onclick="virarCarta(this)">
            <div class="face"></div>
            <div class="face verso"></div>
</div>
 `
while (numeroDeCartas < 4 || numeroDeCartas > 14) {
    numeroDeCartas = prompt("Com quantas cartas você deseja jogar")
}
console.log(numeroDeCartas)
const main = document.querySelector("main")
console.log(main)

for (let i = 0; i < numeroDeCartas; i++) {
    cartas.push(card)

}
main.innerHTML = cartas.toString().replace(/,/g, "")