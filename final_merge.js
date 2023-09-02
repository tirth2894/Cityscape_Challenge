let map = document.getElementById("map");
let camera = document.getElementById("camera");
let player = document.getElementById("player");
let character = document.getElementById("player");
let items = document.getElementsByClassName("item");
let elisahome = document.getElementById("elisahome");
let policestation = document.getElementById("policestation");
let firestation = document.getElementById("firestation");
let govtoffice = document.getElementById("govtoffice");
let mall = document.getElementById("mall");
let hospital = document.getElementById("hospital");
let gamezone = document.getElementById("gamezone");
let school = document.getElementById("school");
let postoffice = document.getElementById("postoffice");
let home = document.getElementById("home");
let bank = document.getElementById("bank");
let hotel = document.getElementById("hotel");
let garden = document.getElementById("garden");
let johnhome = document.getElementById("johnhome");
let theater = document.getElementById("theater");

let message = document.getElementById("msg");

function update() {

    let chara = document.getElementById("character");
    let camera_width = parseInt(getComputedStyle(camera).width);
    let camera_height = parseInt(getComputedStyle(camera).height);
    let map_width = parseInt(getComputedStyle(map).width);
    let map_height = parseInt(getComputedStyle(map).height);
    let player_height = parseInt(getComputedStyle(player).height);
    let player_width = parseInt(getComputedStyle(player).width);
    let speed = 3;
    let pos;

    
    addEventListener('keydown', e => {

        if(e.key == "w" || e.key == "a" ||e.key == "s" ||e.key == "d")
        {
            chara.src = "image/sprite_walk.png";
            chara.classList.add("walk");
        }


        switch (e.key) {
            case 'w':
            case 'ArrowUp':
                
                pos = parseInt(getComputedStyle(map).top);

                if (pos < 0) {
                    map.style.top = pos + speed + "px";
                }

                pos = parseInt(getComputedStyle(player).top);

                if (pos > 0) {
                    player.style.top = pos - speed + "px";

                    overlap();
                    character.style.transform = "rotate(0deg)";
                }
                break;


            case 's':
            case 'ArrowDown':
                pos = parseInt(getComputedStyle(map).top);

                if (Math.abs(pos) < (map_height - camera_height)) {
                    map.style.top = pos - speed + "px";
                }

                pos = parseInt(getComputedStyle(player).top);

                if (pos < Math.abs(player_height - camera_height)) {
                    player.style.top = pos + speed + "px";

                    overlap();
                    character.style.transform = "rotate(180deg)";
                }
                break;


            case 'a':
            case 'ArrowLeft':
                pos = parseInt(getComputedStyle(map).left);

                if (pos < 0) {
                    map.style.left = pos + speed + "px";
                }

                pos = parseInt(getComputedStyle(player).left);

                if (pos > 0) {
                    player.style.left = pos - speed + "px";
                
                    overlap();
                    character.style.transform = "rotate(270deg)";
                }
                break;


            case 'd':
            case 'ArrowRight':
                pos = parseInt(getComputedStyle(map).left);
                
                if (Math.abs(pos) < (map_width - camera_width)) {
                    map.style.left = pos - speed + "px";
                }

                pos = parseInt(getComputedStyle(player).left);
                
                if (pos < Math.abs(player_width - camera_width)) {
                    player.style.left = pos + speed + "px";
                    
                    overlap();
                    character.style.transform = "rotate(90deg)";
                }
                break;
        }

    });

    addEventListener('keyup', e => {

        if(e.key == "w" || e.key == "a" ||e.key == "s" ||e.key == "d" || e.key == "ArrowUp" || e.key == "ArrowDown" ||e.key == "ArrowLeft" ||e.key == "ArrowRight")
        {
            chara.classList.remove("walk");
            chara.src = "image/sprite_stand.png";
        }
    
    });
}

update();


function overlap(){

    if(check(elisahome) || check(policestation) || check(firestation) || check(govtoffice) || check(mall) || check(hospital) || check(gamezone) || check(school) || check(postoffice) || check(home) || check(bank) || check(hotel) || check(garden) || check(johnhome) || check(theater) ||   check(elisahome))
    {
        message.innerHTML = "Press ENTER to go inside..";
    }
    else{
        message.innerHTML = "";

    }
}


function check(item) {

    let itemPosition = item.getBoundingClientRect();
    let playerPosition = player.getBoundingClientRect();

    let player_top = Math.abs(playerPosition.top);
    let player_left = Math.abs(playerPosition.left);
    let player_right = Math.abs(playerPosition.right);
    let player_bottom = Math.abs(playerPosition.bottom);
    
    let item_width = Math.abs(itemPosition.width);
    let item_height = Math.abs(itemPosition.height);

    let item_top = Math.abs(itemPosition.top    );
    let item_left = Math.abs(itemPosition.left  );
    let item_right = Math.abs(itemPosition.right    );
    let item_bottom = Math.abs(itemPosition.bottom  );

    if (player_top >= item_top && player_bottom <= item_bottom && player_left >= item_left && player_right <= item_right) {
        return true;
    }
}