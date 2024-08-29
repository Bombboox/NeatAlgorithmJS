class Drone extends Individual {
    constructor(x = random(0, 700), y = random(0, 700)) {
        super(2, 1);
        this.x = x; //X coordinate of drone
        this.y = y; //Y coordinate of drone
        this.w = 5; //Width of drone (rendering)
        this.h = 5; //Height of drone (rendering)

        this.targetX = 0; //X-coordinate of target
        this.targetY = 0; //Y-coordinate of target
        this.color = [random(0, 255), random(0, 255), random(0, 255)];
    }

    //If diststance decreases icrease fitness! if it increases BAD!
    move() {
        let d1 = dist(this.x, this.y, this.targetX, this.targetY); //Initial distance form target
        let output = this.run();
        
        let angle = output[0];

        this.x += Math.cos(angle);
        this.y += Math.sin(angle);

        let d2 = dist(this.x, this.y, this.targetX, this.targetY); //Distance form target after moving
        this.fitness = clamp(this.fitness + (d1 - d2), 0, 9999999); //Fitness inreases if distance decreased, decreases if distance increased, capped at 0 btw cuz negative numbers break something idk
    }

    run() {
        return this.genome.run([this.x - this.targetX, this.y - this.targetY]);
    }

    render(c) {
        c.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        c.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h); //Render the drone as a rectangle
    }
}