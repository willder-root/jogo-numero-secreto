const min = 1;
const max = 10;
let pontuacao;
let numeroSecreto;
let tentativas;
let listaNumerosSorteados = [];


function insereConteudoNaTag(tag,conteudo){
    let elemeto = document.querySelector(tag);
    elemeto.innerHTML = conteudo;
    responsiveVoice.speak(conteudo,'Brazilian Portuguese Female',{rate:1.2})
}

function verificarChute(){
    const numeroChute = document.querySelector('input');
    const chute = numeroChute.value;
    if(!chute) {
        insereConteudoNaTag('p','Número não informado');
        pontuacao -= 40;
        tentativas += 1;
        return
    }else if(isNaN(chute)){
        insereConteudoNaTag('p','Informe apenas números');
        pontuacao -= 40;
        tentativas += 1;
        return
    }else{
        if(chute == numeroSecreto){
            mensagemVencedor = pontuacao > 100 ? `Sua pontuação é ${pontuacao}, você venceu!` :
            `Sua pontuação é ${pontuacao}, você perdeu!`;
            mensagemTentativa = tentativas > 1 ? `foram necessários ${tentativas} tentativas` :
            `Foi necessário ${tentativas} tentativa` ;
            insereConteudoNaTag('p',`Você acertou o número secreto ${numeroSecreto}! <br>${mensagemTentativa}<br> ${mensagemVencedor}`);
            document.querySelector('#reiniciar').removeAttribute('disabled');
            return
        }else{
            tentativas += 1;
            pontuacao -= 20;
            const valorNumber = Number(chute);
            if(valorNumber > numeroSecreto) {
                insereConteudoNaTag('p',`O número secreto é menor que ${chute}`);
            }else{
                insereConteudoNaTag('p',`O número secreto é maior que ${chute}`);
            }
        }
    }

}

function GerarNumeroAleatorio(min,max) {
    const numero = Math.random() * (max - min) + min;    
    if(listaNumerosSorteados.includes(numero)){
        return GerarNumeroAleatorio(min,max);
    }
    listaNumerosSorteados.push(numero);
    return parseInt(numero);
}

function NovoJogo() {
    if(listaNumerosSorteados.length === max){
        insereConteudoNaTag('p', 'Todas os numeros já foram sorteados');
        return;
    }
    numeroSecreto = GerarNumeroAleatorio(min,max);
    tentativas = 0;
    pontuacao = 300;
    insereConteudoNaTag('input','');
    insereConteudoNaTag('h1','Jogo do número secreto');
    insereConteudoNaTag('p','Digite um número entre 1 e 10');
    document.querySelector('#reiniciar').setAttribute('disabled',true);
}

NovoJogo();