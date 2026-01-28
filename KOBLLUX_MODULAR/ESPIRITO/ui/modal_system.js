/**
 * ⧈ KOBLLUX_Δ³ :: ESPIRITO/ui/modal_system.js
 * #typescript
 * Sistema de Janelas Modais e Diálogos
 */

export const ModalSystem = {
    show(html) {
        let overlay = document.getElementById('modal-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-md z-[10000] hidden flex items-center justify-center p-6';
            overlay.innerHTML = `<div id="modal-content" class="glass-card max-w-lg w-full p-8 rounded-3xl transform transition-all duration-300 opacity-0 scale-90"></div>`;
            document.body.appendChild(overlay);
        }

        const content = document.getElementById('modal-content');
        content.innerHTML = html;
        overlay.classList.replace('hidden', 'flex');
        
        setTimeout(() => {
            content.classList.replace('scale-90', 'scale-100');
            content.classList.replace('opacity-0', 'opacity-100');
        }, 10);

        if (window.lucide) window.lucide.createIcons();
    },

    hide() {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        if (!overlay || !content) return;

        content.classList.replace('scale-100', 'scale-90');
        content.classList.replace('opacity-100', 'opacity-0');
        setTimeout(() => overlay.classList.replace('flex', 'hidden'), 300);
    }
};
