const cards = document.querySelectorAll('.card'); //constante para selecionar os elementos com classe card
let temFlipCard = false; //varíavel com valor booleano que traz o valor booleno false como inicial 
let primeiroCard, segundoCard; // variáveis que indicam a ordem dos cards nos clicks
let blockTabuleiro = false; // variável booleana que inicia com valor false. O tabuleiro está bloquado? False.

/*O game inicia quando clicamos em uma das cartas. Para cada carta será adicionado um evento click, esse evento acionará a função
flipCard, que fará as verificações if e adicionará a class flip. */ 
cards.forEach((cards) => {  
    cards.addEventListener('click', flipCard);

});

function flipCard() { // função flipcard 
    if (blockTabuleiro) return;
    if (this === primeiroCard) return;
    this.classList.add('flip');
    if (!temFlipCard) {
        temFlipCard = true;
        primeiroCard = this;
        return;
    }

    segundoCard = this;
    temFlipCard = false;
    checarCartas(); // função que vai checar os dois cards abertos se são iguais.
}

/*Comparar se as cartas são iguais*/

function checarCartas() {
    if (primeiroCard.dataset.card === segundoCard.dataset.card) { 
        desabilitarCard(); //se as cartas foresm iguais chama-se a função desabilitarCard, isso impedira de clicar novamente nas cartas já encontradas.
        return;
    }

    unflipCard(); //se as cartas forem diferentes, chama a função unflipCard, que fará com que as cartas se escondam novamente. 
}

function desabilitarCard() { //se for encontrado um par de cartas, essa função desabilitará novos click, removendo o evento click e a função flipCard. 
    primeiroCard.remove.addEventListener('click', flipCard);
    segundoCard.remove.addEventListener('click', flipCard);
    resetTabuleiro();

}

function unflipCard() { //se as cartas forem diferentes na checagem a função unflipCard será chamada, removendo a class flip e desvirando as cartas num tempo de 1500ms
    blockTabuleiro = true;
    setTimeout(() => {
        primeiroCard.classList.remove('flip');
        segundoCard.classList.remove('flip');
        resetTabuleiro();
    }, 1500);

}


function resetTabuleiro() {  //manipulação de Array 
    [temFlipCard, blockTabuleiro] = [false, false];
    [primeiroCard, segundoCard] = [null, null]
}

(function embaralharCards() {
    cards.forEach((card) => {
        let positionAleatoria = Math.floor(Math.random() * 12);
        card.style.order = positionAleatoria;
    })
}
)();  //Immediately Invoked Function Expression - chama uma função assim que inicia o game


