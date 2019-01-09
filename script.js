const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1000;
canvas.height = 500;
let gameWith = canvas.width;

const ballMove = ballsGame => {
    ballsGame.forEach(ballGame => {
        //ballGame.move(collisionObjects); //tymczasowo wykomentowane
    })
}

const updateGameWindow = () => {
    gameWith = canvas.width;
    computerPaddel.positionX = canvas.width - 30;
}

const clearScreen = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function Paddel(width, height, color, positionX, positionY){
    this.width = width;
    this.height = height;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speed = 3;
    this.middleHeight = height / 2;
} 

function Ball(size, color, positionX, positionY){
    this.width = size;
    this.height = size;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.middleHeight = size / 2;
    this.speedX = 2;
    this.speedY = 2;
    this.directionX = true; // true -> w prawo
    this.directionY = true; // true -> w dół
}

const drawObject = (collisionObjects, context) => {
    collisionObjects.forEach(collisionObject => {
        context.fillStyle = collisionObject.color;
        context.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height);
    });
}

const collisionObjects = [];
const ballsGame = [];

const playerPaddel = new Paddel(20, 120, 'green', 10, 50);
const computerPaddel = new Paddel(20, 120, 'red', canvas.width - 30, 100);
const ball1 = new Ball(8, 'white', canvas.width / 2 - 4, canvas.height / 2 - 4);

collisionObjects.push(playerPaddel, computerPaddel, ball1);
ballsGame.push(ball1);

const run = () => {
    if(gameWith !== canvas.width){
        updateGameWindow();
    }

    clearScreen();
    ballMove(ballsGame);
    drawObject(collisionObjects, ctx);
}

let timer = setInterval(run, 1000/ 60);