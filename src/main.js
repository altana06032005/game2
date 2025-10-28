
const startBtn = document.getElementById('start');
const task = document.getElementById('task');
const eyesClosed = document.getElementById('eyesClosed');
const eyesOpen = document.getElementById('eyesOpen');
const player = document.getElementById('player');
const door = document.getElementById('door');
const move = document.getElementById('move');
const freeze = document.getElementById('freeze');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');

let eyesAreOpen = false;
let frozen = false;
let position = 0;
let gameOver = false;
let timeLeft = 60;
let timerInterval;


startBtn.onclick = () => {
    startBtn.style.display = 'none';
    task.style.display = 'none';

    player.style.display = 'inline-block';
    door.style.display = 'inline-block';
    move.style.display = 'inline-block';
    freeze.style.display = 'inline-block';
    timerDisplay.style.display = 'inline-block';
    eyesClosed.style.display = 'inline-block';

   
    timerInterval = setInterval(() => {
        if (gameOver) return;
        timeLeft--;
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const seconds = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            message.textContent = "시간 끝났어! 💀";
            gameOver = true;
            clearInterval(timerInterval);
        }
    }, 1000);

    
    monster();
};


function monster() {
    if (gameOver) return;

const delay = Math.random() * 2000 + 500;
setTimeout(() => {
    eyesAreOpen = !eyesAreOpen;
        eyesClosed.style.display = eyesAreOpen ? 'none' : 'block';
        eyesOpen.style.display = eyesAreOpen ? 'block' : 'none';

        if (eyesAreOpen) {
            const openDuration = Math.random() * 2000 + 500; 
            setTimeout(() => {
                eyesAreOpen = false;
                eyesClosed.style.display = 'block';
                eyesOpen.style.display = 'none';
                monsterLoop();
            }, openDuration);
        } else {
            monsterLoop();
        }
    }, delay);
}


freeze.ontouchstart = () => frozen = true;
freeze.ontouchend = () => frozen = false;

move.onclick = () => {
    if (gameOver) return;

    if (eyesAreOpen && !frozen) {
        message.textContent = "괴물이 널 발견했어! 💀";
        gameOver = true;
    } else if (!frozen) {
        const doorLeft = door.offsetLeft;
        const step = 5;

        position = Math.min(position + step, doorLeft);
        player.style.left = position + "px";

        if (position >= doorLeft) {
            message.textContent = "도망쳤어! 🎉";
            gameOver = true;
        }
    }
};