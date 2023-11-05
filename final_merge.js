let load = document.getElementById("loading");
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

let mapUpdateEvent;
let objects;

const speed = 5;

setTimeout(() => {
    load.style.display = "none";
    player.style.display = "block";

    mapUpdate(map, objects);
    playerupdate();
}, 3500);


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
                        player.style.top = pos + speed+ "px";
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

        if (e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowDown" || e.key == "ArrowRight") {
            chara.src = "image/sprite_walk.png";
            chara.classList.add("walk");
        }


        if (!objectOverlap(objects) || objects == undefined) {

            switch (e.key) {
                case 'w':
                case 'ArrowUp':

                    pos = parseInt(getComputedStyle(player).top);

                    if (pos > 0) {
                        player.style.top = pos - speed + "px";
                        overlap();

                    }
                    break;


                case 's':
                case 'ArrowDown':

                    pos = parseInt(getComputedStyle(player).top);

                    if (pos < Math.abs(player_height - camera_height)) {
                        player.style.top = pos + speed + "px";

                        overlap();
                    }
                    break;


                case 'a':
                case 'ArrowLeft':

                    pos = parseInt(getComputedStyle(player).left);

                    if (pos > 0) {
                        player.style.left = pos - speed + "px";
                        overlap();

                    }
                    break;


                case 'd':
                case 'ArrowRight':

                    pos = parseInt(getComputedStyle(player).left);

                    if (pos < Math.abs(player_width - camera_width)) {
                        player.style.left = pos + speed + "px";
                        overlap();

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
        goinside(tempMap);
    }
    else if (check(policestation)) {
        let tempMap = document.getElementById("policestationMap");
        goinside(tempMap);
    }
    else if (check(firestation)) {
        let tempMap = document.getElementById("firestationMap");
        goinside(tempMap);
    }
    else if (check(govtoffice)) {
        let tempMap = document.getElementById("govtofficeMap");
        goinside(tempMap);
    }
    else if (check(mall)) {
        let tempMap = document.getElementById("mallMap");
        goinside(tempMap);
    }
    else if (check(hospital)) {
        let tempMap = document.getElementById("hospitalMap");
        goinside(tempMap);
    }
    else if (check(gamezone)) {
        let tempMap = document.getElementById("gamezoneMap");
        goinside(tempMap);
    }
    else if (check(school)) {
        let tempMap = document.getElementById("schoolMap");
        goinside(tempMap);
    }
    else if (check(postoffice)) {
        let tempMap = document.getElementById("postofficeMap");
        goinside(tempMap);
    }
    else if (check(home)) {
        let tempMap = document.getElementById("homeMap");
        objects = document.getElementsByClassName("homeObject");
        goinside(tempMap, objects);
    }
    else if (check(bank)) {
        let tempMap = document.getElementById("bankMap");
        goinside(tempMap);
    }
    else if (check(hotel)) {
        let tempMap = document.getElementById("hotelMap");
        goinside(tempMap);
    }
    else if (check(garden)) {
        let tempMap = document.getElementById("gardenMap");
        goinside(tempMap);
    }
    else if (check(johnhome)) {
        let tempMap = document.getElementById("johnhomeMap");
        objects = document.getElementsByClassName("johnHomeObject");
        goinside(tempMap,objects);
    }
    else if (check(theater)) {
        let tempMap = document.getElementById("theaterMap");
        goinside(tempMap);
    }
}

function goinside(placeMap, objects) {
    map.style.display = "none";
    placeMap.style.display = "block";
    placeMap.style.top = "0%";
    placeMap.style.left = "0%";
    placeMap.style.transform = "scale(1)";

    mapUpdate(placeMap, objects);

    message.innerHTML = "Press ENTER to exit..";

    addEventListener("keypress", e => {
        if (e.code == "Enter") {
            placeMap.style.display = "none";
            map.style.display = "block";
            message.innerHTML = "";
            map.style.top = "0%";
            map.style.left = "0%";
            player.style.top = "0%";
            player.style.left = "35%";
            removeEventListener('keydown', mapUpdateEvent);
        }
    })
}