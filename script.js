const cvs = document.getElementById('gCanvas');
const ctx = cvs.getContext('2d');


/* Resizing the canvas */
window.onload = function() {
    draw;
    window.addEventListener('resize', draw, false);
}

let cvsWidth = window.innerWidth - 4;
let cvsHeight = window.innerHeight - 4;
ctx.canvas.width = cvsWidth;
ctx.canvas.height = cvsHeight;


const foodImg = new Image();
foodImg.src = "img/food.png"

// Size varibale 
const size = 25;

/*Creatng the snake as an array */
let snake = [];
snake[0] = {
    x: Math.floor(Math.random() / 25 * cvsWidth) * size,
    y: Math.floor(Math.random() / 25 * cvsHeight) * size

}
//Food variable 
let food = {
    x: Math.floor(Math.random() / 25 * cvsWidth) * size,
    y: Math.floor(Math.random() / 25 * cvsHeight) * size

}

//Score variable 
let score = 0;

//Controls 
let d;

document.addEventListener("keydown", direction)

function direction(event) {
    let key = event.keyCode
    if (key == 37 || key == 65 && d != "RIGHT") {
        d = "LEFT"
    } else if (key == 38 || key == 87 && d != "DOWN") {
        d = "UP"
    } else if (key == 39 || key == 68 && d != "LEFT") {
        d = "RIGHT"
    } else if (key == 40 || key == 83 && d != "UP") {
        d = "DOWN"
    }
    //Game reset
    if (key == 82) {
        window.location.reload();
    }
}


// Collision detection
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;

        }
    }
    return false;


}

//Drawing on the canvas 
function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(1, 1, cvsWidth, cvsHeight);

    ctx.strokeStyle = "gray";
    ctx.strokeRect(0, 0, cvsWidth, cvsHeight);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "skyblue" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, size, size);


        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, size, size);

    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, size, size);

    ctx.strokeStyle = "white";
    ctx.strokeRect(food.x, food.y, size, size);

    //old head position 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //Which direction to go 
    if (d == "LEFT")
        snakeX -= size;

    if (d == "UP")
        snakeY -= size;

    if (d == "RIGHT")
        snakeX += size;

    if (d == "DOWN")
        snakeY += size;

    //Food eating checker 
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() / 25 * cvsWidth) * size,
            y: Math.floor(Math.random() / 25 * cvsHeight) * size
        }

    } else {
        snake.pop();
    }

    /*New head after eating the food*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Game over condition
    if (snakeX < 0 || snakeX > cvsWidth || snakeY < 0 || snakeY > cvsHeight || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    /*Score text  */
    ctx.fillStyle = "white";
    ctx.font = "45px Roboto slab q";
    ctx.fillText(score, cvsWidth - 30, 40);


}


/* Game update interval */
let game = setInterval(draw, 65);