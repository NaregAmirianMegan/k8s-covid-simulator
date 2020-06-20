class Circle extends GameObject {
    // Set default width and height

    constructor (context, x, y, vx, vy, radius, sick, immune) {
        super(context, x, y, vx, vy);
        this.radius = radius
        this.sick = sick;
        this.immune = immune
    }

    draw() {
        // Draw a simple square
        this.context.fillStyle = this.sick?'#ff8080':'#0099b0';
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    update (delta) {
        // Move with set velocity
        this.x += this.vx * delta;
        this.y += this.vy * delta;
    }
}