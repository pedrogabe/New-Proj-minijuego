const tRex = document.querySelector('.t-rex');
const gameContainer = document.querySelector('.game-container');
const pauseMenu = document.querySelector('.pause-menu')
var paused=true, iteration=0, badguys=[];
var instance=1, direction=1, goingLeft=false, goingRight=false, jumping=false, speedUpwards=0, playerY=0, playerX=0;


function pause(){
    paused=true;
    pauseMenu.style.display='flex'
}

function unpause(){
    pauseMenu.style.display='none';
    paused=false;
}

gameContainer.addEventListener('mouseout',function(e){
    let parentIsGameContainer = false;
    let element = e.toElement;
    while(parentIsGameContainer==false){
        if(element.className=='game-container'){
            parentIsGameContainer=true;
        }else if(element==document.body){
            break;
        }
        element = element.parentElement
        console.log(e.toElement)
    }
    if(parentIsGameContainer==false){pause()}

}) //Probablemente usar el evento mouseleave evitaría todo esta función

var interval = window.setInterval(function(){
    if(!paused){
        iteration++;
        if(jumping){
            instance=1;
            if(speedUpwards==0 && playerY==0){
                speedUpwards=15
            }else if(speedUpwards<0 && playerY==0){
                jumping=false
                speedUpwards=0;
            }else{
                speedUpwards-=1;
                playerY+=speedUpwards;
            }
            tRex.style.bottom=playerY+'px';
        }else
        if(goingLeft==false && goingRight==false || goingLeft==true && goingRight==true){
            instance=0;
        }
        else {
            if(iteration/4 % 2 === 0){
                instance=1;
            }else if (iteration/4 % 1 === 0){
                instance=2;
            }
        }
        tRex.src="https://pedrogabe.github.io/New-Proj-minijuego/trex-"+instance+".png";

        if(direction==1){
            tRex.style.transform='rotateY(0deg)'
        }else{
            tRex.style.transform='rotateY(180deg)';
        }
        
        if(goingLeft==true && goingRight==false){
            if((playerX-5)<0){
                playerX=0;
            }else{
                playerX-=5;
            }
            tRex.style.left=playerX+"px";
        }
        if(goingLeft==false && goingRight==true){
            if((playerX+5)>(document.body.clientWidth-tRex.width)){
                playerX=document.body.clientWidth-tRex.width
            }else{
                playerX+=5;
            }
            tRex.style.left=playerX+"px";
        }
    }
},25);

function BadGuy(x, id){
    this.x = x;
    var img = document.createElement('img');
    badguys.push(img)
    img.src="https://pedrogabe.github.io/New-Proj-minijuego/bad-red-trex-1.png"
    img.style.position='absolute';
    img.style.left=x+'px';
    img.style.bottom=0;
    gameContainer.appendChild(img);
}

window.addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 37: if(!paused){e.preventDefault(); direction=0; goingLeft=true;} break;
        case 39: if(!paused){e.preventDefault(); direction=1; goingRight=true;} break;
        case 38: if(!paused){e.preventDefault(); jumping=true} break;
        case 80: pause()
    }
})

window.addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 37: goingLeft=false;break;
        case 39: goingRight=false;break;
    }
})
