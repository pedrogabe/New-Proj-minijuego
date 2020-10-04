const tRex = document.querySelector('.t-rex');
const gameContainer = document.querySelector('.game-container');
const pauseMenu = document.querySelector('.pause-menu');
var paused=true, reset=false, iteration=0, badguys=[], willGenerateIn_coefficient=120, kills=0;
var instance=1, direction=1, goingLeft=false, goingRight=false, jumping=false, speedUpwards=0, playerY=0, playerX=0;

/*debug*/
var debug = document.createElement('p');
debug.style.position='fixed'
function activateDebug(){
    document.body.appendChild(debug);
    debug.innerHTML='Debug'
}
/*debug*/

function pause(){
    paused=true;
    pauseMenu.style.display='flex'
}
function unpause(){
    pauseMenu.style.display='none';
    paused=false;
}

function sayToUser(mainText,subtext=null){
    document.querySelector('.pause-menu-header').innerHTML=mainText;
    if(subtext){
        document.querySelector('.pause-menu-subtext').style.display='unset';
        document.querySelector('.pause-menu-subtext').innerHTML=subtext;
    }else{
        document.querySelector('.pause-menu-subtext').style.display='none';
    }
    document.querySelector('.pause-menu-points').style.display='unset';
    document.querySelector('.pause-menu-points').innerHTML="Llegaste a hacer "+iteration+" puntos";
    if(kills>0){
        document.querySelector('.pause-menu-points').innerHTML+=" - Evitaste "+kills+" dinosuarios"
    }
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

}) //Probablemente usar el evento mouseleave evitaría todo esta función

var interval = window.setInterval(function(){
    if(!paused){
        if(reset){
            while(badguys.length>0){
                badguys[0].kill()
            }
            iteration=0;
            kills=0;
            willGenerateIn_coefficient=120;
            playerX=0;
            playerY=0;
            tRex.style.left=playerX+"px";
            reset=false;
        }
        iteration++;
        if(jumping){
            instance=1;
            if(speedUpwards==0 && playerY==0){
                speedUpwards=16
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
            if((playerX-7)<0){
                playerX=0;
            }else{
                playerX-=7;
            }
            tRex.style.left=playerX+"px";
        }
        if(goingLeft==false && goingRight==true){
            if((playerX+7)>(document.body.clientWidth-tRex.width)){
                playerX=document.body.clientWidth-tRex.width
            }else{
                playerX+=7;
            }
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
        for(index in badguys){
            let badguy = badguys[index];
            if(badguy!=null){
                let img = badguy.img;
                if( (img.x+img.width)>playerX && img.x<(playerX+tRex.width) && playerY<img.height ){
                    console.log('collision');
                    lost();
                }
                badguys.forEach(function(badguy2){
                    if(badguy!=badguy2){
                        let img2 = badguy2.img;
                        if( (img.x+img.width)>img2.x && (img.x+img.width)<(img2.x+img2.width) ){
                            console.log('bad guys collision');
                            console.log(badguys)
                            badguy.kill();
                            badguy2.kill();
                        }       
                    }
                })
            }
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
    var img = document.createElement('img');
    var walkedPixels=-img.width, badGuyInstance=1;
    img.style.position='absolute';
    img.style.bottom=0;
    this.img=img;
    var thisGuy = this;
    badguys.push(this)
    if(direction=='right'){
        img.style.left=walkedPixels;
    }else{
        img.style.right=walkedPixels;
        img.style.transform='rotateY(180deg)';
    }
    gameContainer.appendChild(img);
    var badGuyinterval = setInterval(function(){
        if(!paused){
            if(walkedPixels+5>document.body.clientWidth){
                thisGuy.kill()
                console.log('badguy left')
            }else{
                walkedPixels+=5;
                if(direction=='right'){
                    img.style.left=walkedPixels+'px';
                }else{
                    img.style.right=walkedPixels+'px';
                }
                if(iteration/4 % 2 === 0){
                    badGuyInstance=1;
                }else if (iteration/4 % 1 === 0){
                    badGuyInstance=2;
                }
                img.src="https://pedrogabe.github.io/New-Proj-minijuego/bad-red-trex-"+badGuyInstance+".png";
            }
        }
    },25)
    this.kill = function(){
        img.remove(); 
        img=null, walkedPixels=null, badGuyInstance=null, badguys.splice(badguys.indexOf(this),1);
        clearInterval(badGuyinterval)
        badGuyinterval=null;
        kills++;
    }
}

function lost(){
    sayToUser('Perdiste :(',"¡Chocaste con un dinosaurio enemigo!")
    pause()
    reset=true;
}


window.addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 37: if(!paused){e.preventDefault(); direction=0; goingLeft=true;} break;
        case 39: if(!paused){e.preventDefault(); direction=1; goingRight=true;} break;
        case 38: if(!paused){e.preventDefault(); jumping=true} break;
        case 80: if(!paused){sayToUser('Pausa'); pause()} break;
    }
})

window.addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 37: goingLeft=false;break;
        case 39: goingRight=false;break;
    }
})
