const tRex = document.querySelector('.t-rex');
const gameContainer = document.querySelector('.game-container');
const pauseMenu = document.querySelector('.pause-menu')
var paused=true, iteration=0, badguys=[], willGenerateIn_coefficient=120;
var instance=1, direction=1, goingLeft=false, goingRight=false, jumping=false, speedUpwards=0, playerY=0, playerX=1;


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
    }
    if(parentIsGameContainer==false){pause()}

})

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
        
        if(goingLeft==true && goingRight==false && playerX>0){
            playerX-=5;
            tRex.style.left=playerX+"px";
        }
        if(goingLeft==false && goingRight==true && playerX<(document.body.clientWidth-tRex.width)){
            playerX+=5;
            tRex.style.left=playerX+"px";
        }

        if(false){
            if(iteration%(60)===0){
                let creationProbability = 1/Math.floor(iteration/1000)
                console.log('Iterations:'+iteration)
                console.log('creationProbability:'+creationProbability)
                if(Math.random()>creationProbability){
                    console.log(true);
                    if(Math.random()<0.5){
                        new BadGuy();
                    }else{
                        new BadGuy('right');
                    }
                }else{console.log(false)}
        }
    }
    
        if(iteration%(120)===0 && (willGenerateIn_coefficient-iteration) >=120 ){
            createBadGuy()
        }
        if(iteration===willGenerateIn_coefficient){
            createBadGuy();
            willGenerateIn_coefficient += Math.floor( (60/(iteration/5))*500+Math.random()*60+40 )
            console.log(willGenerateIn_coefficient)
        }
    }

},25);

function createBadGuy(){
    if(Math.random()<0.5){
        new BadGuy();
    }else{
        new BadGuy('right')
    }
}
function BadGuy(direction){
    var x=0, badGuyInstance=1;
    var img = document.createElement('img');
    var index = badguys.push(img)
    index--;
    img.style.position='absolute';
    img.style.bottom=0;
    if(direction=='right'){
        img.style.left=0;
    }else{
        img.style.right=0
        img.style.transform='rotateY(180deg)';
    }
    gameContainer.appendChild(img);
    var badGuyinterval = setInterval(function(){
        if(!paused){
            if(x+5>document.body.clientWidth-img.width){
                img.remove(); 
                img=null, x=null, badGuyInstance=null, badguys[index]=null, index=null;
                clearInterval(badGuyinterval)
                badGuyinterval=null;
            }else{
                x+=5;
                if(direction=='right'){
                    img.style.left=x+'px';
                }else{
                    img.style.right=x+'px';
                }
                if(iteration/4 % 2 === 0){
                    badGuyInstance=1;
                }else if (iteration/4 % 1 === 0){
                    badGuyInstance=2;
                }
                img.src="bad-red-trex-"+badGuyInstance+".png";
            }
        }
    },25)
    this.kill = function(){
        img.remove(); 
        img=null, x=null, badGuyInstance=null, badguys[index]=null, index=null;
        clearInterval(badGuyinterval)
        badGuyinterval=null;
    }
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
