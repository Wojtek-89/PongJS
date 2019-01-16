const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1000;
canvas.height = 500;
let gameWith = canvas.width;
let playerPoints = 0;
let computerPoints = 0;

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

    this.move = collisionObjects => {
        let collision = 0;
        const ballLeft = this.positionX;
        const ballRight = this.positionX + this.width;
        const ballTop = this.positionY;
        const ballBottom = this.positionY + this.height;

        if(this.directionX && this.directionY){
            for(let i = 0; i < collisionObjects.length; i++){
                let objectLeft = collisionObjects[i].positionX;
                let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
                let objectTop = collisionObjects[i].positionY;
                let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

                if(this === collisionObjects[i]){
                    continue;
                }
                else if((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight) &&
                        (objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom)){
                    this.directionX != this.directionX;
                    break;
                }

                if((ballLeft < objectRight && ((objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight) || (objectLeft <= ballRight + this.speedX && ballRight <= objectRight + this.speedX))) &&
                   (ballTop < objectBottom && ((objectTop <= ballTop + this.speedY && ballTop + this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom <= objectBottom + this.speedY)))){
                    collision = 1;
                    break;
                }
                else if(ballBottom + this.speedY > canvas.height){
                    collision = 2;
                    break;
                }
                else if(ballRight + this.speedX > canvas.width){
                    collision = 3;
                    playerPoints++;
                    break;
                }
            }
        }
        else if(this.directionX && !this.directionY){
            for(let i = 0; i < collisionObjects.length; i++){
                let objectLeft = collisionObjects[i].positionX;
                let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
                let objectTop = collisionObjects[i].positionY;
                let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

                if(this === collisionObjects[i]){
                    continue;
                }
                else if((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight) &&
                        (objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom)){
                    this.directionX != this.directionX;
                    break;
                }

                if((ballLeft < objectRight && ((objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight) || (objectLeft <= ballRight + this.speedX && ballRight <= objectRight + this.speedX))) &&
                   (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom <= objectBottom - this.speedY)))){
                    collision = 1;
                    break;
                }
                else if(ballTop - this.speedY < 0){
                    collision = 2;
                    break;
                }
                else if(ballRight + this.speedX > canvas.width){
                    collision = 3;
                    playerPoints++;
                    break;
                }
            }
        }
        else if(!this.directionX && this.directionY){
            for(let i = 0; i < collisionObjects.length; i++){
                let objectLeft = collisionObjects[i].positionX;
                let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
                let objectTop = collisionObjects[i].positionY;
                let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

                if(this === collisionObjects[i]){
                    continue;
                }
                else if((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight) &&
                        (objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom)){
                    this.directionX != this.directionX;
                    break;
                }

                if((ballRight > ballLeft && ((objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight) || (objectLeft <= ballRight - this.speedX && ballRight <= objectRight - this.speedX))) &&
                   (ballTop < objectBottom && ((objectTop <= ballTop + this.speedY && ballTop + this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom <= objectBottom + this.speedY)))){
                    collision = 1;
                    break;
                }
                else if(ballBottom + this.speedY > canvas.height){
                    collision = 2;
                    break;
                }
                else if(ballLeft - this.speedX < 0){
                    collision = 3;
                    computerPoints++;
                    break;
                }
            }
        }
        else{
            for(let i = 0; i < collisionObjects.length; i++){
                let objectLeft = collisionObjects[i].positionX;
                let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
                let objectTop = collisionObjects[i].positionY;
                let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

                if(this === collisionObjects[i]){
                    continue;
                }
                else if((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight) &&
                        (objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom)){
                    this.directionX != this.directionX;
                    break;
                }

                if((ballRight > ballLeft && ((objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight) || (objectLeft <= ballRight - this.speedX && ballRight <= objectRight - this.speedX))) &&
                   (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom <= objectBottom - this.speedY)))){
                    collision = 1;
                    break;
                }
                else if(ballTop - this.speedY < 0){
                    collision = 2;
                    break;
                }
                else if(ballLeft - this.speedX < 0){
                    collision = 3;
                    computerPoints++;
                    break;
                }
            }
        }

        if(collision){
            if(Math.round(Math.random())){
                this.speedX += Math.round(Math.random()) / 10;
            }
            else{
                this.speedY += Math.round(Math.random()) / 10;
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
                //this.resetBall(); -- koniec gry
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