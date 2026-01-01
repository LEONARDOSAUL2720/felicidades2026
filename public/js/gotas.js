console.log('%c[SCRIPTS] gotas.js cargado', 'color: #00ffff; font-size: 12px;');

const fondoImgs = [
    'amor1.jpg', 'amor2.jpg', 'amor3.jpg', 'amor4.jpg', 'amor5.jpg', 'amor6.jpg', 'amor7.jpg', 'amor8.jpg', 'amor9.jpg', 'amor10.jpg',
    'amor12.jpg', 'amor13.jpg', 'amor14.jpg', 'amor15.jpg', 'amor16.jpg', 'amor17.jpg', 'amor18.jpg', 'amor19.jpg', 'amor20.jpg', 'amor21.jpg', 'amro11.jpg'
];

const grupoMensajes = [
    'Eres mi alegría, mi amor y mi mejor regalo. ❤️',
    'Gracias por estar conmigo este año. 🎉',
    '¡Que todos tus sueños se cumplan! ✨',
    'Te amo más de lo que imaginas. 🐧',
    '¡Vamos por más aventuras juntos! 💫',
    'Siempre contigo, pase lo que pase. 💖',
    '¡Feliz Año Nuevo, Amor!'
];

let explosiones = [];
let explosionesCreadas = 0;
let grupoActual = 0;

// Clase para explosión de imagen
class Explosion {
    constructor(x, y, imgSrc) {
        this.x = x;
        this.y = y;
        this.imgSrc = imgSrc;
        this.img = new Image();
        this.img.src = imgSrc;
        this.radio = 0;
        this.maxRadio = 200;
        this.createdTime = Date.now();
        this.duracion = 15000; // 15 segundos (aumentado de 10 para que dure mínimo 5s la imagen)
        this.particulas = [];
        
        // Crear MUCHAS partículas blancas pequeñas
        for (let i = 0; i < 150; i++) { // Aumentado de 30 a 150 partículas
            const angulo = Math.random() * Math.PI * 2; // Ángulo completamente aleatorio
            const velocidad = 0.5 + Math.random() * 1.5; // Velocidad variable
            this.particulas.push({
                x: x,
                y: y,
                vx: Math.cos(angulo) * velocidad,
                vy: Math.sin(angulo) * velocidad,
                alpha: 1,
                size: 1.5 + Math.random() * 2, // Muy pequeñas (era 8-12)
                color: '#ffffff', // Blancas
                delay: Math.random() * 500 // Algunas aparecen con delay
            });
        }
    }
    
    update() {
        const elapsed = Date.now() - this.createdTime;
        const progress = elapsed / this.duracion;
        
        // Expandir radio
        this.radio = this.maxRadio * Math.min(progress * 2, 1);
        
        // Actualizar partículas
        this.particulas.forEach(p => {
            const particleElapsed = Math.max(0, elapsed - p.delay);
            const particleProgress = particleElapsed / (this.duracion - p.delay);
            
            p.x += p.vx * 0.3; // Más lento
            p.y += p.vy * 0.3; // Más lento
            p.alpha = Math.max(0, 1 - particleProgress);
            p.vy += 0.02; // Gravedad muy suave
        });
        
        return elapsed < this.duracion;
    }
    
    draw(ctx) {
        const elapsed = Date.now() - this.createdTime;
        const progress = elapsed / this.duracion;
        
        // Dibujar partículas blancas
        this.particulas.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha * 0.7; // Un poco transparente
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 3;
            ctx.fill();
            ctx.restore();
        });
        
        // Dibujar imagen en el centro, escalada según progreso
        // La imagen dura mucho más tiempo (ahora hasta 90% para que dure mínimo 5 segundos visible)
        if (this.img.complete && progress < 0.90) {
            ctx.save();
            const scale = Math.min(progress * 2, 1); // Escala rápido al inicio
            const alpha = Math.max(0, 1 - (progress - 0.15) / 0.7); // Visible mucho más tiempo
            ctx.globalAlpha = alpha;
            ctx.translate(this.x, this.y);
            ctx.scale(scale, scale);
            
            // Adaptar tamaño de imagen según pantalla de forma más granular
            let size;
            if (window.innerWidth < 480) {
                size = 80; // Celular pequeño
            } else if (window.innerWidth < 768) {
                size = 120; // Celular mediano
            } else if (window.innerWidth < 1024) {
                size = 150; // Tablet
            } else {
                size = 180; // Desktop
            }
            
            // Dibujar imagen clara y brillante sin sombra oscura
            ctx.filter = 'brightness(1.1) contrast(1.05)'; // Más clara y con contraste
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // Sombra blanca muy suave
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.drawImage(this.img, -size / 2, -size / 2, size, size);
            ctx.filter = 'none'; // Resetear filtros
            ctx.restore();
        }
    }
    
    finished() {
        return Date.now() - this.createdTime > this.duracion;
    }
}

function mostrarGrupoMensaje(texto) {
    console.log('%c[GRUPO] Mostrando mensaje de grupo', 'color: #00ffff; font-size: 12px;', texto);
    
    // Crear explosión de texto en lugar de usar el elemento HTML
    const W = window.innerWidth;
    const H = window.innerHeight;
    const explosionTexto = new ExplosionTexto(W / 2, H * 0.3, texto);
    explosionesTexto.push(explosionTexto);
}

function crearExplosionImagen(W, H) {
    if (explosionesCreadas >= fondoImgs.length) {
        console.log('%c[EXPLOSIONES] Todas las imágenes han explotado', 'color: #14fc56; font-size: 12px;');
        return;
    }
    
    const x = Math.random() * (W * 0.7) + W * 0.15;
    const y = Math.random() * (H * 0.6) + H * 0.2;
    
    const explosion = new Explosion(x, y, fondoImgs[explosionesCreadas]);
    explosiones.push(explosion);
    
    console.log('%c[EXPLOSION] Imagen', 'color: #14fc56; font-size: 12px;', explosionesCreadas, 'explotando en', {x, y});
    explosionesCreadas++;
}

function animarGrupos(W, H, mensajePrincipal) {
    if (grupoActual < grupoMensajes.length && explosionesCreadas < fondoImgs.length) {
        console.log('%c[ANIMACION] Grupo #' + grupoActual, 'color: #ff00ff; font-size: 12px;', 'Timestamp:', new Date().toLocaleTimeString());
        mostrarGrupoMensaje(grupoMensajes[grupoActual]);
        
        // Crear 4 explosiones para este grupo
        for (let i = 0; i < 4 && explosionesCreadas < fondoImgs.length; i++) {
            setTimeout(() => {
                crearExplosionImagen(W, H);
            }, i * 800); // Aumentado de 300ms a 800ms (más espaciado)
        }
        
        grupoActual++;
        setTimeout(() => animarGrupos(W, H, mensajePrincipal), 18000); // Aumentado de 12s a 18s
    }
}

function dibujarExplosiones(ctx) {
    explosiones = explosiones.filter(exp => !exp.finished());
    explosiones.forEach(exp => {
        exp.update();
        exp.draw(ctx);
    });
    
    // Dibujar explosiones de texto
    explosionesTexto = explosionesTexto.filter(exp => !exp.finished());
    explosionesTexto.forEach(exp => {
        exp.update();
        exp.draw(ctx);
    });
}
