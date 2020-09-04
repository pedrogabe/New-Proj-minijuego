var iteration=0, instance=1, direction=1, goingLeft=false, goingRight=false, playerX=1;
const tRex = document.querySelector('.t-rex');
var interval = window.setInterval(function(){
    iteration++;
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
    tRex.src="trex-"+instance+".png";

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
},25);

window.addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 37: direction=0; goingLeft=true; break;
        case 39: direction=1; goingRight=true; break;
    }
})

window.addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 37: goingLeft=false;break;
        case 39: goingRight=false;break;
    }
})