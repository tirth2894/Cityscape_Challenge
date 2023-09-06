let playArea = document.getElementById("container");
let player = document.getElementById("player");
let object1 = document.getElementById("object1");
let object2 = document.getElementById("object2");
let object3 = document.getElementById("object3");
let object4 = document.getElementById("object4");
let score = document.getElementById("score");
let msg = document.getElementById("msg");

let out = false;
let sc = 0;
let originaltop = parseInt(getComputedStyle(player).top);
let outSound = new Audio('component/out.mp3');
let jumpSound = new Audio('component/jump.mp3');


//Ball Jumping
window.addEventListener("keydown", function fun() {

    let objects = this.document.getElementsByClassName("object");
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.add("ani");
        player.classList.remove("out");

    }
    
    if (out == true) {
        sc = 0;
        out = false;
        score.innerHTML = "Score : 0";
    }

    outSound.load();
    jumpSound.play();
    player.style.top = "-45%";
    setTimeout(() => {
        player.style.height = "5%";
        player.style.top = "0%";
        player.style.boxShadow = "0px 0px 15px black";

        setTimeout(() => {
            player.style.height = "7%";
            player.style.boxShadow = "0px 0px 0px black";
        }, 200);

    }, 450);
})

window.addEventListener("click", function fun() {

    let objects = this.document.getElementsByClassName("object");
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.add("ani");
    }

    if (out == true) {
        sc = 0;
        out = false;
        score.innerHTML = "Score : 0";
    }

    outSound.load();
    jumpSound.play();
    player.style.top = "-45%";
    setTimeout(() => {
        player.style.height = "5%";
        player.style.top = "0%";
        player.style.boxShadow = "0px 0px 15px black";

        setTimeout(() => {
            player.style.height = "7%";
            player.style.boxShadow = "0px 0px 0px black";
        }, 200);

    }, 450);
})


setInterval(() => {

    if (window.innerWidth < 600) {
        playArea.style.display = "none";
        score.style.display = "none";
        msg.innerHTML = "Rotate your device for better Experince.";
        msg.style.fontSize = "40px";
    }
    else {
        playArea.style.display = "block";
        msg.innerHTML = "";
    }

    // Checking each object
    if (out == false) {
        check(object1);
        check(object2);
        check(object3);
        check(object4);
    }
    else {
        score.innerHTML = "";
        msg.innerHTML = "Game Over <br>Your score is : " + sc + "<br>Click or Press Any key to play";
        object1.classList.remove("ani");
        object2.classList.remove("ani");
        object3.classList.remove("ani");
        object4.classList.remove("ani");

        player.classList.add("out");
    }
}, 100);


// Function check the ball is overlap or not
function check(obj) {
    let pwidth = parseInt(getComputedStyle(player).width);
    let pleft = parseInt(getComputedStyle(player).left);
    let ptop = parseInt(getComputedStyle(player).top);

    let oleft = parseInt(getComputedStyle(obj).left);
    let oheight = parseInt(getComputedStyle(obj).height);
    let owidth = parseInt(getComputedStyle(obj).width);


    if (oleft < (pleft + pwidth) && oleft > pleft && (originaltop - ptop) < oheight) {
        
        outSound.play();
        out = true;
    }
    else if (oleft <= (pleft - pwidth)) {
        sc += 10;
        score.innerHTML = "Score : " + sc;
    }
}