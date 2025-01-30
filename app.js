let listaDeNumerosSorteados = [];
let numeroMaximo = 100
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1
let linguaDoAudio = 'pt-BR'

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = linguaDoAudio;
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Web Speech API não suportada neste navegador.');
    };
};

function textoNaTela() {
exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', `Escolha um número de 1 a ${numeroMaximo}:`);
};

textoNaTela();

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', '🎉 Parabéns, você acertou!');
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('input').setAttribute('disabled', true);
        document.querySelector('button').setAttribute('disabled', true);
    } else {
        let diferenca = Math.abs(chute - numeroSecreto);

        if (chute > numeroSecreto) {
            if (tentativas >= 3 && diferenca > 30) {
                exibirTextoNaTela('p', '🔥 O número secreto é MUITO menor!');
            } else {
            exibirTextoNaTela('p', '🔽 O número secreto é menor!');
            }
        } else {
            if (tentativas >= 3 && diferenca > 30) {
                exibirTextoNaTela('p', '❄️ O número secreto é MUITO maior!');
            } else {
                exibirTextoNaTela('p', '🔼 O número secreto é maior!');
            };   
        };
        tentativas++
        limpasCampo(); 
    };
};

function gerarNumeroSecreto() {
    numeroGerado = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    } else if (listaDeNumerosSorteados.includes(numeroGerado)) {
        return gerarNumeroSecreto();
    } else {
        listaDeNumerosSorteados.push(numeroGerado);
        console.log(listaDeNumerosSorteados);
        return numeroGerado;
    };
};

function limpasCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
};

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limpasCampo();
    tentativas = 1
    textoNaTela();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.querySelector('input').removeAttribute('disabled'); 
    document.querySelector('button').removeAttribute('disabled');
};