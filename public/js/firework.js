console.log('%c[SCRIPTS] firework.js cargado', 'color: #ff00ff; font-size: 12px;');

function randomColor() {
    const colors = ['#ff0043', '#14fc56', '#1e90ff', '#fffc00', '#ff7f00', '#00fff7', '#ff00e6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

class Firework {
    constructor(W, H) {
        this.x = Math.random() * W * 0.8 + W * 0.1;
        this.y = Math.random() * H * 0.3 + H * 0.1;
        this.color = randomColor();
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    
    update() {
        this.particles.forEach(p => p.update());
    }
    
    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
    
    done() {
        return this.particles.every(p => p.alpha <= 0);
    }
}
