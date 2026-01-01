console.log('%c[SCRIPTS] particle.js cargado', 'color: #00ff00; font-size: 12px;');

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = color;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 6 + 2;
        this.friction = 0.96;
        this.gravity = 0.06;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.007;
    }
    
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.speed *= this.friction;
        this.alpha -= this.decay;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
    }
}
