
const start = document.getElementById('start');
const task = document.getElementById('task');
const eyesClosed = document.getElementById('eyesClosed');
const eyesOpen = document.getElementById('eyesOpen');
const hands = document.getElementById('hands');
const door = document.getElementById('door');
const move = document.getElementById('move');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const cont = document.getElementById('cont');
const danger = document.getElementById('danger');
const creepy = document.getElementById('creepy');
const screamer = document.getElementById('screamer');
const player = document.getElementById('player');
const preview = document.getElementById('preview');
const death = document.getElementById('death');
const end = document.getElementById('end');
const again = document.getElementById('again');
const home = document.getElementById('home');

let eyesAreOpen = false;
let positionLeft = 30;
let positionTop = 503;
let gameOver = false;
let timeLeft = 60;
let timerInterval;
let monsterTimeout = null;


document.addEventListener('DOMContentLoaded', () => {
    let flashCount = 0; 
    const maxFlashes = 20; 
    let currentBrightness = 0.1; 
    let currentContrast = 200;
    let currentBlur = 10;
    let intervalDelay = 80; 

    function applyFilters() {
        preview.style.filter = `brightness(${currentBrightness}) contrast(${currentContrast}%) blur(${currentBlur}px)`;
    }

    function flickerBackground() {
        if (flashCount < maxFlashes) {
            flashCount++;

            if (flashCount % 2 !== 0) {
                currentBrightness = Math.min(1, 0.1 + flashCount * 0.05);
                currentContrast = Math.max(100, 200 - flashCount * 10); 
                currentBlur = Math.max(0, 10 - flashCount * 0.5); 

                preview.style.transition = 'filter 0.05s ease-out';
                applyFilters();

            } else { 
                currentBrightness = Math.max(0.1, currentBrightness * 0.8);
                currentContrast = Math.min(200, currentContrast * 1.1);
                currentBlur = Math.min(10, currentBlur * 1.2);

                preview.style.transition = 'filter 0.08s ease-in';
                applyFilters();
            }

            intervalDelay += 10;
            setTimeout(flickerBackground, intervalDelay);

        } else {
            preview.style.transition = 'filter 1s ease-out'; 
            preview.style.filter = 'brightness(1) contrast(100%) blur(0px)';

            setTimeout(showTaskText, 1000);
        }
    }

    flickerBackground();
});

function flickerTask() {
    task.classList.add('horror-shaking');
    
    setTimeout(() => {
        task.classList.remove('horror-shaking');
    }, 150); 
    const nextFlickerDelay = Math.random() * 500 + 500; 
    setTimeout(flickerTask, nextFlickerDelay);
}

function showTaskText() {
    task.style.display = 'inline-block'; 
    setTimeout(() => {
        task.style.opacity = '1';
    }, 50);
    flickerTask();

    setTimeout(() => {
        start.style.display = 'inline-block'; 

        setTimeout(() => {
            start.style.opacity = '1';
        }, 10);

    }, 2000);

}

function triggerScreamer(reasonMessage) {
    if (gameOver) return; 
    
    gameOver = true;
    clearInterval(timerInterval); 
    screamer.currentTime = 0;
    screamer.play();
    creepy.pause();

    message.style.display = 'inline-block';
    player.style.display = 'none';
    door.style.display = 'none';
    move.style.display = 'none';
    timerDisplay.style.display = 'none';
    eyesClosed.style.display = 'none';
    cont.style.display = 'none';
    preview.style.display = 'none';
    end.style.display = 'inline-block';
    death.style.display = 'inline-block';
    again.style.display = 'inline-block';
    home.style.display = 'inline-block';

    screamer.currentTime = 0;
    screamer.play();

    message.textContent = reasonMessage;
}

again.onclick = () => {
    clearTimeout(monsterTimeout);
    eyesAreOpen = false;


    end.style.display = 'none';
    death.style.display = 'none';
    message.style.display = 'none';
    again.style.display = 'none';

    gameOver = false;
    positionLeft = 30;
    positionTop = 503;
    timeLeft = 60;
    player.style.left = positionLeft + "px";
    player.style.top = positionTop + "px";

    cont.style.display = 'inline-block';
    eyesClosed.style.display = 'inline-block';
    door.style.display = 'inline-block';
    move.style.display = 'inline-block';
    timerDisplay.style.display = 'inline-block';
    player.style.display = 'inline-block';

    creepy.currentTime = 0;
    creepy.play();
    
    timerInterval = setInterval(() => {
        if (gameOver) return;
        timeLeft--;
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const seconds = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            triggerScreamer("시간 끝났어! 💀");
        }
    }, 1000);

    monster();
}

home.onclick = () => {
    home.onclick = () => {
    end.style.display = 'none';
    death.style.display = 'none';
    message.style.display = 'none';
    again.style.display = 'none';
    home.style.display = 'none';

    gameOver = false;
    positionLeft = 30;
    positionTop = 503;
    timeLeft = 60;
    
    cont.style.display = 'none';
    player.style.display = 'none';
    door.style.display = 'none';
    move.style.display = 'none';
    timerDisplay.style.display = 'none';
    eyesClosed.style.display = 'none';
    eyesOpen.style.display = 'none';

    preview.style.display = 'inline-block';
    preview.style.filter = 'brightness(0.1) contrast(200%) blur(10px)';
    start.style.display = 'flex';
    start.style.opacity = '0';
    task.style.display = 'flex';
    task.style.opacity = '0';

    document.dispatchEvent(new Event('DOMContentLoaded'));
};

}



start.onclick = () => {
    start.style.display = 'none';
    task.style.display = 'none';
    player.style.display = 'inline-block';
    door.style.display = 'inline-block';
    move.style.display = 'inline-block';
    timerDisplay.style.display = 'inline-block';
    eyesClosed.style.display = 'inline-block';
    cont.style.display = 'inline-block';

    creepy.currentTime = 0;
    creepy.play();
   
    timerInterval = setInterval(() => {
        if (gameOver) return;
        timeLeft--;
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const seconds = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            triggerScreamer("시간 끝났어! 💀");
        }
    }, 1000);

    
    monster();
};


function monster() {
  if (gameOver) {
    danger.pause();
    creepy.pause();

   return;
  }

  eyesAreOpen = !eyesAreOpen;
  if (eyesAreOpen) {
    } else {

    }

  eyesClosed.style.display = eyesAreOpen ? 'none' : 'block';
  eyesOpen.style.display = eyesAreOpen ? 'block' : 'none';

  const delay = Math.random() * 4000 + 500;
  monsterTimeout = setTimeout(monster, delay);
}


function shakeScreen() {
    const cont = document.getElementById('cont');
    cont.classList.add('shake');
    setTimeout(() => cont.classList.remove('shake'), 300);
}


move.onclick = () => {
    if (gameOver) return;

    shakeScreen();

    if (eyesAreOpen) {
       triggerScreamer("괴물이 널 발견했어!");
    } else {
    const doorLeft = door.offsetLeft;
    const doorTop = door.offsetTop;
    const step = 15;

    positionLeft = Math.min(positionLeft + step, doorLeft);
    player.style.left = positionLeft + "px";
    positionTop = Math.max(positionTop - step, doorTop);
    player.style.top = positionTop + "px";

    if (positionTop <=doorTop && doorLeft >= positionLeft ) {
        message.textContent = "도망쳤어! 🎉";
        gameOver = true;

        }

    }

};