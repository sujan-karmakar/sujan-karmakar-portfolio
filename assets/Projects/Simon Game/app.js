let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

let highestScore = 0;

let heading = document.querySelector("h3");
let highestScoreHeading = document.querySelector("h4");

document.addEventListener("keydown", function (event) {
    if (started === false) {
        levelUp();
        setGameSeq();
        started = true;
    } else {
        let key = event.key;
        if (["1", "2", "3", "4"].includes(key)) {
            let btn = document.querySelector(`#item${key}`);
            btn.click();
        }
    }
});

let buttonFlash = () => {
    let rand = Math.ceil(Math.random() * 4);
    let box = document.querySelector(`#item${rand}`);

    box.classList.add("glow");

    setTimeout(() => {
        box.classList.remove("glow");
    }, 500);

    gameSeq.push(rand);
}

let userFlash = (btn) => {
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 250);
}

let levelUp = () => {
    level++;
    heading.innerText = `Level ${level}`;
}

let setGameSeq = () => {
    for (let i = 0; i < level; i++) {
        setTimeout(() => {
            buttonFlash();
        }, i * 1000);
    }
}

let checkSeq = () => {
    let i;
    for (i = 0; i < level; i++) {
        if (gameSeq[i] != userSeq[i]) {
            return false;
        }
    }
    if (userSeq[i]) return false;

    return true;
}


let allBtns = document.querySelectorAll(".items");

function buttonPress() {
    let btn = this;
    userFlash(btn);
    let clickedButtonId = btn.getAttribute("id");
    let id = parseInt(clickedButtonId[clickedButtonId.length - 1]);
    userSeq.push(id);
    if (userSeq.length === level) {
        if (checkSeq()) {
            setTimeout(nextLevel, 500);
        } else {
            setTimeout(gameOver, 500);
        }
    }
}

for (let btn of allBtns) {
    btn.addEventListener("click", buttonPress);
}

function nextLevel() {
    gameSeq = [];
    userSeq = [];
    levelUp();
    setGameSeq();
}

function gameOver() {
    if(highestScore < level - 1){
        highestScore = level - 1;
        heading.innerHTML = `Game Over, your score was ${level - 1}<br>NEW HIGHEST SCORE<br>Press any key to start again.`;

        highestScoreHeading.innerText = `Highest Score is ${highestScore}`;
    } else {
        heading.innerHTML = `Game Over, your score was ${level - 1}<br>Highest Score is ${highestScore}<br>Press any key to start again.`;
    }
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}