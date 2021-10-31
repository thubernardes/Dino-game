const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let position = 0; 

//Pontuação
let elemento = document.querySelector('#contador');
		let contador = 0;
		
		setInterval(() => elemento.innerHTML = contador++, 70);

let isJumping = false;

function handleKeyUp(event) {
    if (event.keyCode == 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump () {

    isJumping = true;

    let upInterval = setInterval (() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                  position -= 20;
                  dino.style.bottom = position + 'px';        
                }
            }, 20);
        } else {
        //subindo
        position += 20; 
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 5000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval (() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
            } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)
     
    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);
 