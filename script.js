const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const playerPointsTable = document.querySelector('.playerPoints');
const computerPointsTable = document.querySelector('.computerPoints');
const buttonReset = document.querySelector('.reset');
const buttonAdd = document.querySelector('.addBall');
const buttonRemove = document.querySelector('.removeBall');

buttonAdd.addEventListener('click', () =>{
    const tempBall = new Ball(20, 'white', canvas.width / 2 - 4, canvas.height / 2 - 4);
    collisionObjects.push(tempBall);
    ballsGame.push(tempBall);
});

buttonRemove.addEventListener('click', () =>{
    if(collisionObjects.length > 3){
        collisionObjects.pop();
    }

    if(ballsGame.length > 1){
        ballsGame.pop();
    }
});

canvas.width = 1000;
canvas.height = 500;
let gameWith = canvas.width;
let playerPoints = 0;
let computerPoints = 0;
const startSpeed = 2;
let multiplayer = true;
const difficult = 0.2;

const resetGame = () => {
    playerPoints = computerPoints = 0;
    clearInterval(timer);
    
    if(ballsGame.length != 1){
        var elementToDelete = ballsGame.length - 1;
        for(let i = 0; i < elementToDelete; i++){
            ballsGame.pop();
            collisionObjects.pop();
        }
    }

    ballsGame.forEach(ballGame => {
        ballGame.resetBall();
    });

    timer = setInterval(run, 1000 / 60);
}

const updateScore = () => {
    playerPointsTable.textContent = playerPoints;
    computerPointsTable.textContent = computerPoints;
}

const keybordSupport = event => {
    if(event.keyCode == 87){
        playerPaddel.moveUp(ballsGame);
    }
    else if(event.keyCode == 83){
        playerPaddel.moveDown(ballsGame);
    }

    if(multiplayer){
        if(event.keyCode == 219){
            computerPaddel.moveUp(ballsGame);
        }
        else if(event.keyCode == 186){
            computerPaddel.moveDown(ballsGame);
        }
    }
}

const ballMove = ballsGame => {
    ballsGame.forEach(ballGame => {
        ballGame.move(collisionObjects);
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

    this.autoMove = ballsGame => {
        let minX = canvas.width;
        let numberOfMinElements;
        let tempX;

        for(let i = 0; i < ballsGame.length; i++){
            if(this.positionX < ballsGame[i].positionX){
                tempX = this.positionX - ballsGame[i].positionX;
            }
            else{
                tempX = ballsGame[i].positionX - this.positionX;
            }

            if(minX > tempX){
                minX = tempX;
                numberOfMinElements = i;
            }
        }

        if(this.positionY + this.middleHeight > ballsGame[numberOfMinElements].positionY + ballsGame[numberOfMinElements].middleHeight){
            this.moveUp(ballsGame);
        }
        else{
            this.moveDown(ballsGame);
        }
    }

    this.moveUp = ballsGame => {
        const paddelTop = this.positionY;
        const paddelLeft = this.positionX;
        const paddelRight = this.positionX + this.width;
        let ballBottom;
        let ballLeft;
        let ballRight;
        let collision = false;

        for(let i = 0; i < ballsGame.length; i++){
            ballBottom = ballsGame[i].positionY + ballsGame[i].height;
            ballLeft = ballsGame[i].positionX;
            ballRight = ballsGame[i].positionX + ballsGame[i].width;

            if(((paddelLeft <= ballLeft && ballLeft <= paddelRight) || (paddelLeft <= ballRight && ballRight <= paddelRight)) && 
               ((paddelTop >= ballBottom) && (paddelTop - this.speed <= ballBottom))){
                   this.positionY = ballBottom;
                   collision = !collision;
                   break;
            }
            else if(paddelTop - this.speed < 0){
                this.positionY = 0;
                collision = !collision;
                break;
            }
        }

        if(!collision){
            this.positionY -= this.speed;
        }
    }

    this.moveDown = ballsGame => {
        const paddelBottom = this.positionY + this.height;
        const paddelLeft = this.positionX;
        const paddelRight = this.positionX + this.width;
        let ballTop;
        let ballLeft;
        let ballRight;
        let collision = false;

        for(let i = 0; i < ballsGame.length; i++){
            ballTop = ballsGame[i].positionY;
            ballLeft = ballsGame[i].positionX;
            ballRight = ballsGame[i].positionX + ballsGame[i].width;

            if(((paddelLeft <= ballLeft && ballLeft <= paddelRight) || (paddelLeft <= ballRight && ballRight <= paddelRight)) && 
               ((paddelBottom <= ballTop) && (paddelBottom + this.speed >= ballTop))){
                   this.positionY = ballTop - this.height;
                   collision = !collision;
                   break;
            }
            else if(paddelBottom + this.speed > canvas.height){
                this.positionY = canvas.height - this.height;
                collision = !collision;
                break;
            }
        }

        if(!collision){
            this.positionY += this.speed;
        }
    }
} 

function Ball(size, color, positionX, positionY){
    this.width = size;
    this.height = size;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.middleHeight = size / 2;
    this.speedX = startSpeed;
    this.speedY = startSpeed;
    this.directionX = true; // true -> w prawo
    this.directionY = true; // true -> w dół

    this.resetBall = () => {
        if(Math.round(Math.random())){
            this.directionX = !this.directionX;
        }

        if(Math.round(Math.random())){
            this.directionY = !this.directionY;
        }

        this.speedX = startSpeed;
        this.speedY = startSpeed;
        this.positionX = canvas.width / 2 - this.width / 2;
        this.positionY = canvas.height / 2 - this.height / 2;
    }

    this.move = collisionObjects => {
        const ballLeft = this.positionX;
        const ballRight = this.positionX + this.width;
        const ballBottom = this.positionY + this.width;
        const ballTop = this.positionY;
        let collision = 0;
        for (let i = 0; i < collisionObjects.length; i++) {
            let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
            let objectLeft = collisionObjects[i].positionX;
            let objectTop = collisionObjects[i].positionY;
            let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;
            if (this === collisionObjects[i]) //break all instructions when it is the same object
                continue;
            else if (((objectLeft <= ballRight && ballRight <= objectRight) || (objectLeft <= ballLeft && ballLeft <= objectRight)) && ((objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom))) {
                this.directionX != this.directionX; //no collision when object is in object (on start >1 ball), only set other direction
                break;
            }
            if (this.directionX && (ballRight + this.speedX > canvas.width)) { //check collision with the end x-axis canvas
                collision = 3;
                computerPoints++;
                break;
            } else if (!this.directionX && (ballLeft - this.speedX < 0)) { //check collision with the start x-axis canvas
                collision = 3;
                computerPoints++;
                break;
            }
            if (this.directionY && (ballBottom + this.speedY > canvas.height)) { //check collision with the end y-axis canvas
                collision = 2;
                break;
            } else if (!this.directionY && (ballTop - this.speedY < 0)) { //check collision with the start y-axis canvas
                collision = 2;
                break;
            }
            if (this.directionX && this.directionY) {
                if ((ballLeft < objectRight && ((objectLeft <= ballRight + this.speedX && ballRight + this.speedX <= objectRight) || (objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight))) && (ballTop < objectBottom && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom + this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            } else if (this.directionX && !this.directionY) {
                if ((ballLeft < objectRight && ((objectLeft <= ballRight + this.speedX && ballRight + this.speedX <= objectRight) || (objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight))) && (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom - this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            } else if (!this.directionX && this.directionY) {
                if ((ballRight > objectLeft && ((objectLeft <= ballRight - this.speedX && ballRight - this.speedX <= objectRight) || (objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight))) && (ballTop < objectBottom && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom + this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            } else {
                if ((ballRight > objectLeft && ((objectLeft <= ballRight - this.speedX && ballRight - this.speedX <= objectRight) || (objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight))) && (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom - this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            }
        }

        if(collision){
            if(Math.round(Math.random())){
                this.speedX += difficult + Math.round(Math.random()) / 10;
            }
            else{
                this.speedY += difficult + Math.round(Math.random()) / 10;
            }

            if(collision == 1){
                this.directionX = !this.directionX;

                if(Math.round(Math.random())){
                    this.directionY = !this.directionY;
                }
            }
            else if(collision == 2){
                this.directionY = !this.directionY;
            }
            else{
                this.resetBall();
            }
        }
        else{
            if(this.directionX){
                this.positionX += this.speedX;
            }
            else{
                this.positionX -= this.speedX;
            }

            if(this.directionY){
                this.positionY += this.speedY;
            }
            else{
                this.positionY -= this.speedY;
            }
        }
    }
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
const ball1 = new Ball(20, 'white', canvas.width / 2 - 4, canvas.height / 2 - 4);

collisionObjects.push(playerPaddel, computerPaddel, ball1);
ballsGame.push(ball1);

const run = () => {
    if(gameWith !== canvas.width){
        updateGameWindow();
    }

    clearScreen();
    ballMove(ballsGame);
    computerPaddel.autoMove(ballsGame);
    updateScore();    
    drawObject(collisionObjects, ctx);

    if(playerPoints == 10 || computerPoints == 10){
        clearInterval(timer);
    }
}

buttonReset.addEventListener('click', resetGame);
window.addEventListener("keydown", keybordSupport);
let timer = setInterval(run, 1000 / 60);