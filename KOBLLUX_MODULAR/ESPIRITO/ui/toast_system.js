/**
 * ⧈ KOBLLUX_Δ³ :: ESPIRITO/ui/toast_system.js
 * #typescript
 * Sistema de Notificações Efêmeras (Toasts)
 */

export const ToastSystem = {
    show(message, duration = 3000) {
        let container = document.getElementById('kobllux-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'kobllux-toast-container';
            container.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] flex flex-col gap-3 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = "glass-pill bg-black/80 border-dynamic/30 px-6 py-3 shadow-2xl backdrop-blur-xl text-[10px] font-bold uppercase tracking-[0.15em] text-dynamic animate-[float_4s_ease-in-out_infinite] pointer-events-auto transition-opacity duration-500";
        toast.innerText = message;
        
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }
};
