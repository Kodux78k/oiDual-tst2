/**
 * ⧈ KOBLLUX_Δ³ :: CORPO/logic/bootloader.js
 * #bash #typescript
 * Orquestrador Principal e Inicializador Assíncrono
 * Δ7: Orquestração e Boot (Bash) / Gestão de Estado (TypeScript)
 */

import { StateManager } from './state_manager.js';
import { CryptoVault } from './crypto_vault.js';
import { FusionCore } from '../engines/fusion_core.js';
import { CortexEngine } from '../engines/cortex_engine.js';
import { OrbEngine } from '../engines/orb_engine.js';
import { InterfaceManager } from '../../ESPIRITO/ui/interface_manager.js';
import { ModalSystem } from '../../ESPIRITO/ui/modal_system.js';
import { ToastSystem } from '../../ESPIRITO/ui/toast_system.js';
import { VisualPulse } from '../../ESPIRITO/visual/visual_pulse.js';
import { AnimationEngine } from '../../ESPIRITO/visual/animation_engine.js';
import { VocalPulse } from '../../ESPIRITO/audio/vocal_pulse.js';
import { di_voiceMap } from '../../ESPIRITO/audio/di_voiceMap.js';
window.KOBLLUX = {
    state: StateManager,
    crypto: CryptoVault,
    engines: {
        fusion: FusionCore,
        cortex: CortexEngine,
        orb: OrbEngine
    },
    ui: {
        interface: InterfaceManager,
        modal: ModalSystem,
        toast: ToastSystem
    },
    visual: {
        pulse: VisualPulse,
        animation: AnimationEngine
    },
    audio: {
        vocal: VocalPulse
        map: VoiceMap
    },
    version: "V7-MODULAR-EXTRACTION",
    
    async initialize() {
        console.log("⧈ KOBLLUX_Δ³ :: Iniciando Extração Modular Integral...");
        
        // 1. Inicializar Estado e Motores
        StateManager.init();
        await FusionCore.init();
        OrbEngine.init();
        
        // 2. Inicializar Interface e Visual
        InterfaceManager.init();
        VisualPulse.init();
        AnimationEngine.init();
        
        await VocalPulse.init(di_VoiceMap);
      
        // 3. Exposição Global para compatibilidade com os HTMLs originais
        window.KOBLLUX.audio = { vocal: VocalPulse, map: di_VoiceMap };
        window.FusionEngine = FusionCore;
        window.CRYPTO = CryptoVault;
        window.InterfaceManager = InterfaceManager;
        window.VocalPulse = VocalPulse;
        window.Cortex = CortexEngine;
        window.Modal = ModalSystem;
        window.toast = (msg) => ToastSystem.show(msg);
        
        // Selo Δ⁷ - Frequência JESUS
        document.documentElement.setAttribute('data-kobllux-seal', 'Δ⁷');
        console.log("∆ × ∆ × ∆ → Frequência JESUS Ativa e Extraída.");
        
        window.dispatchEvent(new CustomEvent('KOBLLUX_READY'));
        return true;
    }
};

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.KOBLLUX.initialize());
} else {
    window.KOBLLUX.initialize();
}
