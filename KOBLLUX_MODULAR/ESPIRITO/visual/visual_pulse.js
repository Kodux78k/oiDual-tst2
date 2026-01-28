/**
 * ⧈ KOBLLUX_Δ³ :: ESPIRITO/visual/visual_pulse.js
 * Motor de Pulso Visual e Partículas (MetaPulso)
 */

export const VisualPulse = {
    init() {
        console.log("VisualPulse: Ativado");
        this.initParticles();
    },

    initParticles() {
        if (!window.particlesJS) {
            console.warn("particlesJS não encontrado");
            return;
        }

        window.particlesJS('particles-js', {
            particles: {
                number: { value: 24 },
                color: { value: ['#0ff', '#f0f'] },
                shape: { type: 'circle' },
                opacity: { value: 0.4 },
                size: { value: 2.4 },
                move: { enable: true, speed: 1.5 },
                line_linked: { enable: true, color: '#FFF' }
            },
            retina_detect: true
        });
    },

    updateColor(hex) {
        // Atualiza blobs
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach(blob => {
            blob.style.background = hex;
        });

        // Atualiza partículas se existirem
        if (window.pJSDom && window.pJSDom[0]) {
            const pJS = window.pJSDom[0].pJS;

            pJS.particles.color.value = hex;
            if (pJS.particles.line_linked) {
                pJS.particles.line_linked.color = hex;
            }

            pJS.fn.particlesRefresh();
        }
    }
};