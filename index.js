let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('content/food.mp3');
const gameOverSound = new Audio('content/gameover.mp3');
const musicSound = new Audio('content/music.mp3');
const moveSound = new Audio('content/move.mp3');

let speed = 20;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 5, y: 9 };
let score = 0;


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {
    //if snake bump into his body
    for(let i = 1; i<snakeArr.length; i++){
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    //if the snake clash with the walls
    if (snakeArr[0].x >=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine() {
    
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to start again");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }

        //after eating the food , adding food to it and increasing score
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score +=1;
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }; //generating random no. between 2 nos.
    }
        //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;  //adding food in between X-dir
    snakeArr[0].y += inputDir.y;  //adding food in between Y-dir

    board.innerHTML = "";  // making the board empty

    //displaying the snake in grid
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else
            snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    //displaying the food in grid

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

















window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };  //Starting the snake
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log("right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});