let load = document.getElementById("loading");
let map = document.getElementById("map");
let camera = document.getElementById("camera");
let player = document.getElementById("player");
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

let mapUpdateEvent;
let objects;

const speed = 7;

window.onload = function () {
    load.style.display = "none";
    player.style.display = "block";

    mapUpdate(map, objects);
    playerupdate();

};


function mapUpdate(placeMap, objects) {
    addEventListener('keydown', mapUpdateEvent = e => {
        let camera_width = parseInt(getComputedStyle(camera).width);
        let camera_height = parseInt(getComputedStyle(camera).height);
        let map_width = parseInt(getComputedStyle(placeMap).width);
        let map_height = parseInt(getComputedStyle(placeMap).height);
        let pos;

        switch (e.key) {
            case 'w':
            case 'ArrowUp':

                pos = parseInt(getComputedStyle(placeMap).top);

                if (pos < 0) {
                    placeMap.style.top = pos + speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().top;
                        player.style.top = pos + speed + "px";
                    }
                }

                break;


            case 's':
            case 'ArrowDown':

                pos = parseInt(getComputedStyle(placeMap).top);

                if (Math.abs(pos) < (map_height - camera_height)) {
                    placeMap.style.top = pos - speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().top;
                        player.style.top = pos - speed + "px";
                    }
                }


                break;


            case 'a':
            case 'ArrowLeft':

                pos = parseInt(getComputedStyle(placeMap).left);

                if (pos < 0) {
                    placeMap.style.left = pos + speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().left;
                        player.style.left = pos + speed + "px";
                    }
                }

                break;


            case 'd':
            case 'ArrowRight':

                pos = parseInt(getComputedStyle(placeMap).left);

                if (Math.abs(pos) < (map_width - camera_width)) {
                    placeMap.style.left = pos - speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().left;
                        player.style.left = pos - speed + "px";
                    }
                }

                break;
        }

    });

}

function objectOverlap(objects) {
    if (objects == undefined) {
        return false;
    }
    else {

        for (let i = 0; i < objects.length; i++) {
            if (check(objects[i])) {
                return true;
            }
        }
        return false;
    }

}

function playerupdate() {

    let chara = document.getElementById("character");
    let camera_width = parseInt(getComputedStyle(camera).width);
    let camera_height = parseInt(getComputedStyle(camera).height);
    let player_height = parseInt(getComputedStyle(player).height);
    let player_width = parseInt(getComputedStyle(player).width);
    let pos;


    addEventListener('keydown', e => {

        if (!objectOverlap(objects) || objects == undefined) {

            switch (e.key) {
                case 'w':
                case 'ArrowUp':

                    pos = parseInt(getComputedStyle(player).top);

                    chara.classList.add("walk");
                    if (pos > 0) {
                        player.style.top = pos - speed + "px";
                        overlap();
                        chara.src = "image/sprite_up.png";

                    }
                    break;


                case 's':
                case 'ArrowDown':

                    pos = parseInt(getComputedStyle(player).top);
                    chara.src = "image/sprite_down.png";
                    chara.classList.add("walk");

                    if (pos < Math.abs(player_height - camera_height)) {
                        player.style.top = pos + speed + "px";

                        overlap();
                    }
                    break;


                case 'a':
                case 'ArrowLeft':

                    pos = parseInt(getComputedStyle(player).left);
                    chara.classList.add("walk");

                    if (pos > 0) {
                        player.style.left = pos - speed + "px";
                        overlap();
                        chara.src = "image/sprite_left.png";

                    }
                    break;


                case 'd':
                case 'ArrowRight':

                    pos = parseInt(getComputedStyle(player).left);
                    chara.classList.add("walk");

                    if (pos < Math.abs(player_width - camera_width)) {
                        player.style.left = pos + speed + "px";
                        overlap();
                        chara.src = "image/sprite_right.png";

                    }
                    break;
            }
        }
    });

    addEventListener('keyup', e => {

        if (e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
            chara.classList.remove("walk");
            chara.src = "image/sprite_stand.png";
        }

    });

}

function check(item) {

    let itemPosition = item.getBoundingClientRect();
    let playerPosition = player.getBoundingClientRect();

    if (playerPosition.right > itemPosition.left && playerPosition.left < itemPosition.right && playerPosition.bottom > itemPosition.top && playerPosition.top < itemPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}

function overlap() {

    if (check(elisahome)) {
        let tempMap = document.getElementById("elisahomeMap");
        objects = document.getElementsByClassName("elisaHomeObject");
        goinside(tempMap, objects);
    }
    else if (check(policestation)) {
        let tempMap = document.getElementById("policestationMap");
        objects = document.getElementsByClassName("policeStationObject");
        goinside(tempMap, objects);
    }
    else if (check(firestation)) {
        let tempMap = document.getElementById("firestationMap");
        objects = document.getElementsByClassName("fireStationObject");
        goinside(tempMap, objects);
    }
    else if (check(govtoffice)) {
        let tempMap = document.getElementById("govtofficeMap");
        objects = document.getElementsByClassName("govOfficeObject");
        goinside(tempMap, objects);
    }
    else if (check(mall)) {
        let tempMap = document.getElementById("mallMap");
        objects = document.getElementsByClassName("mallObject");
        goinside(tempMap, objects);
    }
    else if (check(hospital)) {
        let tempMap = document.getElementById("hospitalMap");
        objects = document.getElementsByClassName("hospitalObject");
        goinside(tempMap, objects);
    }
    else if (check(gamezone)) {
        let tempMap = document.getElementById("gamezoneMap");
        goinside(tempMap);
    }
    else if (check(school)) {
        let tempMap = document.getElementById("schoolMap");
        objects = document.getElementsByClassName("schoolObject");
        goinside(tempMap, objects);
    }
    else if (check(postoffice)) {
        let tempMap = document.getElementById("postofficeMap");
        objects = document.getElementsByClassName("postOfficeObject");
        goinside(tempMap, objects);
    }
    else if (check(home)) {
        let tempMap = document.getElementById("homeMap");
        objects = document.getElementsByClassName("homeObject");
        goinside(tempMap, objects);
    }
    else if (check(bank)) {
        let tempMap = document.getElementById("bankMap");
        objects = document.getElementsByClassName("bankObject");
        goinside(tempMap, objects);
    }
    else if (check(hotel)) {
        let tempMap = document.getElementById("hotelMap");
        objects = document.getElementsByClassName("hotelObject");
        goinside(tempMap, objects);
    }
    else if (check(garden)) {
        let tempMap = document.getElementById("gardenMap");
        objects = document.getElementsByClassName("gardenObject");
        goinside(tempMap, objects);
    }
    else if (check(johnhome)) {
        let tempMap = document.getElementById("johnhomeMap");
        objects = document.getElementsByClassName("johnHomeObject");
        goinside(tempMap, objects);
    }
    else if (check(theater)) {
        let tempMap = document.getElementById("theaterMap");
        objects = document.getElementsByClassName("theaterObject");
        goinside(tempMap, objects);
    }
}

function goinside(placeMap, objects) {
    let mapTop = map.getBoundingClientRect().top;
    let mapLeft = map.getBoundingClientRect().left;
    let playerTop = player.getBoundingClientRect().top;
    let playerLeft = player.getBoundingClientRect().left;


    map.style.display = "none";
    placeMap.style.display = "block";
    placeMap.style.top = "0%";
    placeMap.style.left = "0%";

    mapUpdate(placeMap, objects);

    message.innerHTML = "Press ENTER to exit..";

    addEventListener("keypress", e => {
        if (e.code == "Enter") {
            player.style.top = playerTop + "px";
            player.style.left = playerLeft + "px";
            map.style.top = mapTop + "px";
            map.style.left = mapLeft + "px";
            placeMap.style.display = "none";
            map.style.display = "block";
            message.innerHTML = "";
            removeEventListener('keydown', mapUpdateEvent);
        }
    })
}

function carCollison() {
    let cars = document.getElementsByClassName("car");
    let temp = null,flag = false;
    setInterval(() => {
        for (let i = 0; i < cars.length; i++) {
            if (check(cars[i])) {
                cars[i].style.animationPlayState = "paused";
                temp = i;
                flag = true;
            }
        }

        if(flag)
        {
            let t = setTimeout(() => {
                cars[temp].style.animationPlayState = "running";
            }, 2500);
            flag = false;
        }

    }, 50);
}

carCollison();