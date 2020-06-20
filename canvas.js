let canvas;
let context;
let gameObjects;

// retrieve DOM vars
canvas = document.querySelector('canvas');
context = canvas.getContext('2d');

// set canvas attr
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initialize on load
// window.onload = init;

oldTimeStamp = 0;

function init() {
    console.log("Starting simulation...");

    // init game objects
    pop_size = document.getElementById("pop").value;
    imm = document.getElementById("imm").value;
    speed = document.getElementById("speed").value;
    createWorld(pop_size, imm, speed);

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    // time delta
    delta = (timeStamp - oldTimeStamp) / 1000;
    delta = Math.min(delta, 0.1);
    oldTimeStamp = timeStamp;

    // update game state
    update(delta);

    // draw game state
    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function draw () {
    // Clear the entire canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gameObjects.length;i++) {
        gameObjects[i].draw();
    }
}

function update(delta) {
    checkCollisions();
    for (let i = 0; i < gameObjects.length;i++) {
        gameObjects[i].update(delta);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createWorld(pop_size, immunity_rate, sim_speed) {
    gameObjects = []
    for (let i = 0; i < pop_size; i++) {
        let sick = false;
        num = Math.random();
        if (num < 0.1 || i === 0)
            sick = true;
        let immune = false;
        if (num < immunity_rate)
            immune = true;
        circ = new Circle(context, getRandomInt(canvas.width), getRandomInt(canvas.height), getRandomInt(sim_speed), getRandomInt(sim_speed), 25, sick, immune);
        gameObjects.push(circ);
    }
}

function checkCollisions() {
    for (let i = 0; i < gameObjects.length;i++) {
        checkBounds(gameObjects[i]);
        for (let j = i; j < gameObjects.length;j++) {
            checkCollision(gameObjects[i], gameObjects[j]);
        }
    }
}

function checkCollision(circ1, circ2) {
    let dist = Math.sqrt(Math.pow((circ1.x - circ2.x), 2) + Math.pow((circ1.y - circ2.y), 2));
    if (circ1.sick || circ2.sick) {
        if (dist <= (circ1.radius+circ2.radius)) {
            if (!circ1.immune)
                circ1.sick = true;
            if (!circ2.immune)
                circ2.sick = true;
        }
    }
}

function checkBounds(circ) {
    if (circ.x-circ.radius < 0 || circ.x+circ.radius > canvas.width) {
        circ.vx *= -1;
    } else if (circ.y-circ.radius < 0 || circ.y+circ.radius > canvas.height) {
        circ.vy *= -1;
    }
}