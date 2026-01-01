// Canvas y variables globales
console.log('%c[SCRIPTS] app.js cargado', 'color: #ff6600; font-size: 12px;');

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});

let fireworks = [];
let pinguinos = [];
let explosionesInteractivas = [];
let explosionesTexto = [];
// Obtener elementos del DOM
const mensajePrincipal = document.getElementById('mensajePrincipal');
const canvasElem = document.getElementById('fireworks');
const modalElem = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');

// Interacción con explosiones
canvasElem.addEventListener('click', function(e) {
    const rect = canvasElem.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvasElem.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvasElem.height / rect.height);
    
    for (let explosion of explosiones) {
        if (Math.hypot(mouseX - explosion.x, mouseY - explosion.y) < 150) {
            // Crear más fuegos artificiales al hacer click
            for (let i = 0; i < 3; i++) {
                fireworks.push(new Firework(W, H));
            }
            break;
        }
    }
});

modalElem.addEventListener('click', function() {
    this.style.display = 'none';
});

// Función de animación principal
let frameCount = 0;
let lastLogTime = Date.now();

function animate() {
    frameCount++;
    
    // Log cada 60 frames (aproximadamente cada segundo a 60fps)
    if (frameCount % 60 === 0) {
        console.log('%c[ANIMATE] Frame:', 'color: #1e90ff; font-size: 10px;', frameCount, '| Explosiones:', explosiones.length, '| Fireworks:', fireworks.length, '| Penguins:', pinguinos.length);
    }
    
    ctx.clearRect(0, 0, W, H);

    // Dibujar explosiones de imágenes
    dibujarExplosiones(ctx);

    // Crear y dibujar fuegos artificiales
    if (Math.random() < 0.06) {
        fireworks.push(new Firework(W, H));
    }
    fireworks.forEach(fw => {
        fw.update();
        fw.draw(ctx);
    });
    fireworks = fireworks.filter(fw => !fw.done());

    // Crear y dibujar pingüinos
    if (Math.random() < 0.01) { // Reducido de 0.03 a 0.01 (menos pingüinos al azar)
        pinguinos.push(new Pinguino());
    }
    pinguinos.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    pinguinos = pinguinos.filter(p => !p.outOfScreen());

    requestAnimationFrame(animate);
}

// Iniciar la animación
console.log('%c========== INICIANDO APP ==========', 'color: #FFD700; font-size: 16px; font-weight: bold;');
console.log('Resolución:', W, 'x', H);
console.log('Tiempo de inicio:', new Date().toLocaleTimeString());

setTimeout(() => {
    console.log('%c[TIMER] 1.5s - Mostrando mensaje principal', 'color: #ffff00; font-size: 13px; font-weight: bold;');
    // Crear explosión de texto para el mensaje principal
    const explosionTexto = new ExplosionTexto(W / 2, H * 0.4, '¡Feliz Año Nuevo Amor!');
    explosionesTexto.push(explosionTexto);
    crearMensajeConFuegos(W, H, mensajePrincipal, fireworks);
}, 1500);

setTimeout(() => {
    console.log('%c[TIMER] 3.0s - Iniciando animación de grupos', 'color: #00ff00; font-size: 13px; font-weight: bold;');
    animarGrupos(W, H, mensajePrincipal);
}, 3000);

setTimeout(() => {
    console.log('%c[TIMER] 4.5s - Animación de canvas en ejecución', 'color: #1e90ff; font-size: 13px; font-weight: bold;');
}, 4500);

console.log('%c[APP] Iniciando loop de animación', 'color: #00ffff; font-size: 12px;');
animate();
