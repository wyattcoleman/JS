
// REMEBER: the (x,y) grid starts in the top left corner of the canvas


//get canvas instance
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//starting postion of ball
var x = canvas.width/2;
var y = canvas.height-30;

// change in ball location
var dx = 2;
var dy = -2;

//ball def
var ballRadius = 10;
var ballSpeed = 10;

//paddle def
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;


function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function buttonPressed(){
    if(rightPressed){
        paddleX += 7;
        if(paddleWidth + paddleX > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
        
    }
    else if(leftPressed){
        paddleX -= 7;
        if(paddleX < 0){
            paddleX = 0;
        }
    }
}

function ballBoundaries(){
    if(x + dx < ballRadius || x + dx > canvas.width-ballRadius){
        dx = -dx;
    }
    if(y + dy < ballRadius ){
        dy = -dy;
    }
    // check if ball hits the paddle or goes throught the bottom
    else if(y + dy > canvas.height-ballRadius){
        if(x > paddleX && x  < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
       
    }

}

function draw(){
    //clear previous frame
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //draw code
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    ballBoundaries();
    buttonPressed();

}
document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}



var interval = setInterval(draw,ballSpeed);

// //Red rectange
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// //Green Ball
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// //blue outline rectange
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
