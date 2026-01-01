console.log('%c[SCRIPTS] mensaje.js cargado', 'color: #ff0080; font-size: 12px;');

let mensajeCreado = false;

// Clase para explosión de texto con fuegos artificiales
class ExplosionTexto {
    constructor(x, y, texto) {
        this.x = x;
        this.y = y;
        this.texto = texto;
        this.createdTime = Date.now();
        this.duracion = 4000; // 4 segundos
        this.particulas = [];
        
        // Fase de subida: desde abajo hacia arriba
        this.faseSubida = 800; // 800ms de subida
        this.alturaMaxima = 150;
        
        // Crear muchas bolitas blancas pequeñas
        for (let i = 0; i < 200; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const velocidad = 0.3 + Math.random() * 0.8;
            this.particulas.push({
                x: x,
                y: y,
                vx: Math.cos(angulo) * velocidad,
                vy: Math.sin(angulo) * velocidad,
                alpha: 1,
                size: 1 + Math.random() * 1.5,
                color: '#ffffff'
            });
        }
    }
    
    update() {
        const elapsed = Date.now() - this.createdTime;
        const progress = elapsed / this.duracion;
        
        // Fase de subida (primeros 800ms)
        if (elapsed < this.faseSubida) {
            const subidaProgress = elapsed / this.faseSubida;
            // Las partículas suben hacia arriba
            this.particulas.forEach(p => {
                p.y -= 1.5; // Subir constantemente
            });
        } else {
            // Fase de explosión (después de subir)
            const explosionProgress = (elapsed - this.faseSubida) / (this.duracion - this.faseSubida);
            this.particulas.forEach(p => {
                p.x += p.vx * 0.2;
                p.y += p.vy * 0.2;
                p.alpha = Math.max(0, 1 - explosionProgress * 2);
                p.vy += 0.01;
            });
        }
        
        return elapsed < this.duracion;
    }
    
    draw(ctx) {
        const elapsed = Date.now() - this.createdTime;
        const progress = elapsed / this.duracion;
        
        // Dibujar partículas
        this.particulas.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha * 0.8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 2;
            ctx.fill();
            ctx.restore();
        });
        
        // Mostrar texto cuando explota (después de la fase de subida)
        if (elapsed >= this.faseSubida) {
            const explosionProgress = (elapsed - this.faseSubida) / (this.duracion - this.faseSubida);
            const alpha = Math.max(0, 1 - explosionProgress);
            
            ctx.save();
            ctx.globalAlpha = alpha;
            
            // Adaptar tamaño de fuente según pantalla de forma más agresiva
            let fontSize;
            if (window.innerWidth < 480) {
                fontSize = 20; // Celular pequeño
            } else if (window.innerWidth < 768) {
                fontSize = 28; // Celular mediano
            } else {
                fontSize = 48; // Desktop
            }
            
            ctx.font = `bold ${fontSize}px Arial Black`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 20;
            
            // Dividir texto en líneas si es muy largo
            const maxWidth = window.innerWidth * 0.9;
            const words = this.texto.split(' ');
            let lines = [];
            let currentLine = '';
            
            words.forEach(word => {
                const testLine = currentLine + (currentLine ? ' ' : '') + word;
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            });
            if (currentLine) lines.push(currentLine);
            
            // Dibujar líneas de texto
            const lineHeight = fontSize * 1.3;
            const totalHeight = (lines.length - 1) * lineHeight;
            lines.forEach((line, index) => {
                const y = this.y - this.alturaMaxima + (index * lineHeight) - (totalHeight / 2);
                ctx.fillText(line, this.x, y);
            });
            
            ctx.restore();
        }
    }
    
    finished() {
        return Date.now() - this.createdTime > this.duracion;
    }
}

function crearMensajeConFuegos(W, H, mensajePrincipal, fireworks) {
    if (mensajeCreado) return;
    mensajeCreado = true;
    
    console.log('%c[MENSAJE] Creando mensaje principal', 'color: #ffff00; font-size: 14px; font-weight: bold;');
    console.log('Timestamp:', new Date().toLocaleTimeString());
    
    const texto = '¡Feliz Año Nuevo Vanessa!';
    mensajePrincipal.textContent = texto;
    mensajePrincipal.style.opacity = 1;
    
    // No crear fuegos aquí, solo mostrar el texto
    console.log('%c[MENSAJE] Texto mostrado en pantalla', 'color: #ffff00; font-size: 12px;');
    
    // Mantener visible y luego desaparecer
    setTimeout(() => {
        console.log('%c[MENSAJE] Desapareciendo mensaje', 'color: #ff0043; font-size: 12px;');
        mensajePrincipal.style.transition = 'opacity 1.5s';
        mensajePrincipal.style.opacity = 0;
    }, 3500);
}
