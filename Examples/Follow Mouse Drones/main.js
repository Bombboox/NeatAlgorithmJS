const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
var SPEED = 10;
var GENERATION_LIFESPAN = 1500;
var GENERATION_LOG_COUNT = 5;
var frames = 0;
var generation = 0;

var followMouse = false;
var loop = true;
var render = true;
var population = new Population(150, Drone);
var mouseX = random(0, canvas.width);
var mouseY = random(0, canvas.height);

//initialize everything
const main = () => {
    canvas.style = "border: solid; border-color: green; background: black;";
    canvas.width = "700";
    canvas.height = "700";
    document.body.appendChild(canvas);

    draw();
}

//update everything
const draw = () => {
    requestAnimationFrame(draw);

    if(loop) { //Main loop
        for(let i = 0; i < SPEED; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frames++;

            if(render) {
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 5, 0, 2 * PI, true);
                ctx.fill();
            }

            for(let individual of population.pop) {
                //Drones target the mouse, hopefully get better at moving towards it
                individual.targetX = mouseX; 
                individual.targetY = mouseY;
                individual.move();
                if(render) individual.render(ctx);
            }

            if(frames > GENERATION_LIFESPAN) {
                generation++;
                if(generation % GENERATION_LOG_COUNT == 0) console.log(population.averageFitness());
                
                if(!followMouse) {
                    mouseX = random(0, canvas.width);
                    mouseY = random(0, canvas.height);
                }
                population.breed(150);
                frames = 0;
            }
        }
    }
}

//get position of mouse on screen to use as target
onmousemove = function(e) {
    if(followMouse) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
}

window.onload = main;