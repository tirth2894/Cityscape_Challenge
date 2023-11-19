let map = document.getElementById("map");
let camera = document.getElementById("camera");
let player = document.getElementById("player");

let message = document.getElementById("msg");
let messageContainer = document.getElementById("massegeContainer");

let energyScore = document.getElementById("energyScore");
let lifeScore = document.getElementById("lifeScore");
let coinScore = document.getElementById("coinScore");


let mapUpdateEvent;
let objects;
let gameStatus = {
    energy: 100,
    life: 3,
    coin: 0,
    level: 1
}
const speed = 10;

let mission = {
    one: "In the heart of learning, where minds convene, a quiet abode for those unseen. Find the tale that whispers in the domain, where breaks are taken, and knowledge may reign.",
    two: "In a dwelling of comfort, where meals find repose, investigate the cool sanctuary where freshness bestows. Open the door where chilling airs sway, discover the clue where goodies hold sway.",
    three: "Amidst the shelves of crunchy delights, where sweet memories take their flights, explore the aisle where tea-time dreams align, and discover a hidden gem, a delight to find.",
    four: "In the quiet halls where healing is sought, a guardian stands, wise and thought. Seek the presence where serenity blends, in a corner where grace quietly extends.",
    five: "A dedicated space for knowledge to unfold, with a flat surface for ideas to take hold. Pens, paper, and focus align, where the quest for wisdom is truly divine.",
    six: "Embraced by duty's holster, a symbol of commanding presence. Secured within the armory's confines, it awaits the summons. Transitioning from vigilant sidearm to silent observer, it resonates with the weighty responsibility entrusted to those who hold it.",
    seven: "Where financial transactions find their rest, in the realm of currencies, at their best. Seek the discarded secrets where old papers go to rest.",
    eight: "In the intricate bureaucratic maze where paperwork flourishes, reveal an apparatus that animates the official scrolls. It stands watchful, a mechanical wordsmith in the revered chambers of governance, inscribing the narratives of bureaucracy onto pristine sheets.",
    nine: "Amidst nature's canvas, a resting place emerges. Carved from earth's embrace, this silent companion invites repose. A tableau of tranquility, where flora and foliage frame moments of respite.",
    ten: "In the realm of letters and parcels arrayed, where stamps tell stories and journeys are weighed, seek the electronic companion, silent and grand, where the post meets the digital, in a quiet land.",
    eleven: "In the clandestine realm of culinary enchantment, unearth the obscured fire maestro. An inconspicuous choreographer, directing the gastronomic symphony, transmuting raw constituents into savory opuses. Unseen yet irreplaceable, it kindles the culinary craftsmanship that adorns the epicurean sanctuary.",
    twelve: "Within the quiet expectancy of visual marvels, find the creator of crunchy delights. A masterful alchemist nestled in red-and-white treasures, anticipating its moment to burst into a symphony of flavors. A modest bringer of joy, transforming the space into an aromatic carnival of cinematic indulgence.",
    thirteen: "Within the realm of emergency readiness, seek the guardians of the flame adorned in protective gauntlets. These tactile wardens stand poised, ready to confront the inferno's fury. Clad in armor against the elemental dance, they epitomize the brave boundary between chaos and order.",
    fourteen: "Amidst the blossoms and beneath the open sky, find the furry guardian. A loyal companion in the outdoor haven, it frolics in the green expanse, a living emblem of joy and playfulness.",
    fifteen: "Within the walls of your abode, uncover the silent sentinel of storage. A keeper of treasures and necessities, it stands poised, offering both concealment and revelation. A symphony of shelves and doors, where organization meets the art of domesticity."
}


window.onload = function () {
    let load = document.getElementById("loading");
    load.style.display = "none";
    player.style.display = "block";
    map.style.display = "block";

    mapUpdate(map, objects);
    playerupdate();
    let status = JSON.parse(localStorage.getItem('cityscapeChallenges'));
    if (status == null) {
        localStorage.setItem('cityscapeChallenges', JSON.stringify(gameStatus));
    }
    else {
        gameStatus.energy = status.energy;
        gameStatus.life = status.life;
        gameStatus.coin = status.coin;
        gameStatus.level = status.level;
    }

    displayGameStatus();
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
                    chara.src = "image/sprite_up.png";
                    chara.classList.add("walk");

                    if (pos > 0) {
                        player.style.top = pos - speed + "px";
                        overlap();
                        displayMission();

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
                        displayMission();
                    }
                    break;


                case 'a':
                case 'ArrowLeft':

                    pos = parseInt(getComputedStyle(player).left);
                    chara.src = "image/sprite_left.png";
                    chara.classList.add("walk");

                    if (pos > 0) {
                        player.style.left = pos - speed + "px";
                        overlap();
                        displayMission();
                    }
                    break;


                case 'd':
                case 'ArrowRight':

                    pos = parseInt(getComputedStyle(player).left);
                    chara.src = "image/sprite_right.png";
                    chara.classList.add("walk");

                    if (pos < Math.abs(player_width - camera_width)) {
                        player.style.left = pos + speed + "px";
                        overlap();
                        displayMission();
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

function carCollision() {
    let cars = document.getElementsByClassName("car");
    let carStates = Array.from(cars).fill(false);
    let carCollisionInterval = setInterval(() => {
        for (let i = 0; i < cars.length; i++) {
            if (check(cars[i])) {
                if (!carStates[i]) {
                    cars[i].style.animationPlayState = "paused";

                    gameStatus.energy -= 5;
                    displayGameStatus();

                    setTimeout(() => {
                        cars[i].style.animationPlayState = "running";
                        carStates[i] = false;
                    }, 5000);

                    carStates[i] = true;
                }
            }
        }
    }, 50);
}
carCollision();

function displayGameStatus() {

    if (gameStatus.energy <= 0 || gameStatus.life <= 0) {
        window.alert("game Over");
    }
    else {
        localStorage.setItem('cityscapeChallenges', JSON.stringify(gameStatus));
        energyScore.innerText = gameStatus.energy;
        lifeScore.innerText = gameStatus.life;
        coinScore.innerText = gameStatus.coin;
    }


}

function displayMission() {
    let missionPlace, codeNumber = 0, flag = 0, placeMap;

    switch (gameStatus.level) {
        case 1:
            message.innerText = mission.one;
            missionPlace = document.getElementById("schoolStaffRoomTable");
            placeMap = document.getElementById("schoolMap");
            break;
        case 2:
            message.innerText = mission.two;
            missionPlace = document.getElementById("elisaHomeFridge");
            placeMap = document.getElementById("elisahomeMap");
            break;
        case 3:
            message.innerText = mission.three;
            missionPlace = document.getElementById("mallBiscuit01");
            placeMap = document.getElementById("mallMap");
            codeNumber = 1;
            break;
        case 4:
            message.innerText = mission.four;
            missionPlace = document.getElementById("hospitalGanpatiMurti");
            placeMap = document.getElementById("hospitalMap");
            break;
        case 5:
            message.innerText = mission.five;
            missionPlace = document.getElementById("johnHomeStudyTable");
            placeMap = document.getElementById("johnhomeMap");
            break;
        case 6:
            message.innerText = mission.six;
            missionPlace = document.getElementById("policestationtable2");
            placeMap = document.getElementById("policestationMap");
            codeNumber = 23;
            break;
        case 7:
            message.innerText = mission.seven;
            missionPlace = document.getElementById("bankDustbin4");
            placeMap = document.getElementById("bankMap");
            break;
        case 8:
            message.innerText = mission.eight;
            missionPlace = document.getElementById("govofficezerox1");
            placeMap = document.getElementById("govtofficeMap");
            break;
        case 9:
            missionPlace = document.getElementById("gardenBench1");
            message.innerText = mission.nine;
            placeMap = document.getElementById("gardenMap");
            codeNumber = 28;
            break;
        case 10:
            message.innerText = mission.ten;
            missionPlace = document.getElementById("postOfficeOfficeTable");
            placeMap = document.getElementById("postofficeMap");
            break;
        case 11:
            message.innerText = mission.eleven;
            missionPlace = document.getElementById("hotelKitchenHorizontal");
            placeMap = document.getElementById("hotelMap");
            break;
        case 12:
            message.innerText = mission.twelve;
            missionPlace = document.getElementById("theaterFoodCounter");
            placeMap = document.getElementById("theaterMap");
            codeNumber = 26;
            break;
        case 13:
            message.innerText = mission.thirteen;
            missionPlace = document.getElementById("firestationhandgloves1");
            placeMap = document.getElementById("firestationMap");
            break;
        case 14:
            message.innerText = mission.fourteen;
            missionPlace = document.getElementById("gardenDog");
            placeMap = document.getElementById("gardenMap");
            break;
        case 15:
            message.innerText = mission.fifteen;
            missionPlace = document.getElementById("homeLivingRoomCabinet");
            placeMap = document.getElementById("homeMap");
            codeNumber = 9;
            flag = 1;
            break;
    }

    missionPlace.style.boxShadow = "0px 0px 10px blue";

    if (check(missionPlace)) {
        placeMap.style.display = "none";
        player.style.display = "none";
        messageContainer.style.display = "flex";

        setTimeout(() => {
            messageContainer.style.display = "none";
            player.style.display = "block";
            placeMap.style.display = "block";
        }, 1500);


        gameStatus.coin = gameStatus.coin + 1000;

        if (codeNumber != 0) {
            window.alert("Remember this number : " + codeNumber);
            codeNumber = 0;
        }

        if (flag != 0) {
            let treasureCode = window.prompt("Enter Multiply of all previous number : ");
            if (treasureCode == 150696) {
                window.alert("You won the game");
            }
            else {
                window.alert("You enter wrong code");
            }
        }
        else {
            gameStatus.level = gameStatus.level + 1;
        }

        displayGameStatus();
    }
}