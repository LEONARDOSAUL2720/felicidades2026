console.log('%c[SCRIPTS] pinguino.js cargado', 'color: #ffff00; font-size: 12px;');

const pinguinosImgs = [
    'clown_tux_penguin_20873.png',
    'devil_tux_penguin_20867.png',
    'flower_tux_penguin_20865.png',
    'happy_birthday_tux_penguin_20860.png',
    'pinguino_ninja.png',
    'pink_tux_penguin_20840.png',
    'viking_tux_penguin_20821.png'
];

class Pinguino {
    constructor() {
        this.img = new Image();
        this.img.src = pinguinosImgs[Math.floor(Math.random() * pinguinosImgs.length)];
        
        // Calcular tamaño base responsivo
        let sizeBase;
        if (window.innerWidth < 480) {
            sizeBase = 30;
        } else if (window.innerWidth < 768) {
            sizeBase = 45;
        } else if (window.innerWidth < 1024) {
            sizeBase = 65;
        } else {
            sizeBase = 100;
        }
        
        this.x = Math.random() * (window.innerWidth - sizeBase);
        this.y = -sizeBase;
        this.size = sizeBase + Math.random() * (sizeBase * 0.4);
        this.speed = 0.8 + Math.random() * 1.2; // Reducido de 2-3 a 0.8-2 (mucho más lento)
        this.angle = Math.random() * 0.2 - 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.04 - 0.02;
    }
    
    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
    
    outOfScreen() {
        return this.y > window.innerHeight;
    }
}
