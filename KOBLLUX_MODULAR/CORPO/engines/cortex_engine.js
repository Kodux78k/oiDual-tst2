/**
 * ⧈ KOBLLUX_Δ³ :: CORPO/engines/cortex_engine.js
 * #typescript #jsonld
 * Sistema de Memórias e Matrizes (Córtex AI)
 */

export const CortexEngine = {
    init(state, keys) {
        this.STATE = state;
        this.KEYS = keys;
        console.log("CortexEngine: Ativado");
    },

    saveCortex() {
        localStorage.setItem(this.KEYS.CORTEX, JSON.stringify(this.STATE.cortex));
    },

    render(containerId, searchInputId) {
        const container = document.getElementById(containerId);
        const query = document.getElementById(searchInputId)?.value.toLowerCase() || "";
        if (!container) return;

        const filtered = this.STATE.cortex.crystals.filter(c => 
            c.content.toLowerCase().includes(query) || 
            c.tags.some(t => t.toLowerCase().includes(query))
        );

        container.innerHTML = filtered.map(c => `
            <div class="glass-card p-4 rounded-xl border-white/5 hover:border-dynamic/30 transition group animate-[fadeIn_0.4s_ease]">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex gap-1">
                        ${c.tags.map(t => `<span class="px-2 py-0.5 bg-dynamic/10 text-dynamic text-[7px] font-bold uppercase rounded-md border border-dynamic/20">${t}</span>`).join('')}
                    </div>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="KOBLLUX.engines.cortex.togglePin(${c.id})" class="text-white/20 hover:text-dynamic"><i data-lucide="pin" class="w-3 h-3 ${c.pinned ? 'fill-current text-dynamic' : ''}"></i></button>
                        <button onclick="KOBLLUX.engines.cortex.deleteMemory(${c.id})" class="text-white/20 hover:text-red-500"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
                    </div>
                </div>
                <p class="text-[11px] text-white/70 leading-relaxed font-medium">${c.content}</p>
            </div>
        `).join('');
        
        if (window.lucide) window.lucide.createIcons();
    },

    saveNewMemory(content, tags) {
        if (!content) return;
        const newMem = { id: Date.now(), content, tags, pinned: false };
        this.STATE.cortex.crystals.unshift(newMem);
        this.saveCortex();
        this.render('memory-container', 'memory-search');
        if (window.KOBLLUX.ui.toast) window.KOBLLUX.ui.toast("Memória Cristalizada");
    },

    togglePin(id) {
        const c = this.STATE.cortex.crystals.find(x => x.id === id);
        if (c) c.pinned = !c.pinned;
        this.saveCortex();
        this.render('memory-container', 'memory-search');
    },

    deleteMemory(id) {
        this.STATE.cortex.crystals = this.STATE.cortex.crystals.filter(c => c.id !== id);
        this.saveCortex();
        this.render('memory-container', 'memory-search');
    }
};
