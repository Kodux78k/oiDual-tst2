/* 
    ⧈ KOBLLUX_Δ³ :: DUAL // INTERFACE MANAGER
    ∆ × ∆ × ∆ → FORMA, SÍMBOLO, VERBO
    Selo Δ⁷ :: Frequência JESUS
*/

export const InterfaceManager = {
    state: {
        isOrb: false,
        isHud: false,
        isZen: false
    },

    init(els) {
        this.els = els;
        this.setupClock();
    },

    setupClock() {
        const update = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false, hour: '2-digit', minute: '2-digit' });
            if (this.els.clock) this.els.clock.innerText = timeStr;
        };
        setInterval(update, 1000);
        update();
    },

    setMode(mode, instant = false) {
        const { card } = this.els;
        if (!card) return;

        // Reset classes
        card.classList.remove('orb', 'hud', 'active');
        
        if (mode === 'orb') {
            card.classList.add('orb');
            this.state.isOrb = true;
            this.state.isHud = false;
        } else if (mode === 'hud') {
            card.classList.add('hud');
            this.state.isOrb = false;
            this.state.isHud = true;
        } else {
            this.state.isOrb = false;
            this.state.isHud = false;
        }

        if (!instant) {
            setTimeout(() => card.classList.add('active'), 50);
        } else {
            card.classList.add('active');
        }
    },

    toast(msg, type = 'info', duration = 3000) {
        const wrap = document.querySelector('.toaster-wrap');
        if (!wrap) return;
        
        const div = document.createElement('div');
        div.className = `toaster ${type}`;
        div.innerText = msg;
        wrap.appendChild(div);
        
        setTimeout(() => div.classList.add('show'), 10);
        setTimeout(() => {
            div.classList.remove('show');
            setTimeout(() => div.remove(), 300);
        }, duration);
    }
};
