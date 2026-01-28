/* 
    ⧈ KOBLLUX_Δ³ :: DUAL // INTEGRAL BOOTLOADER
    ∆ × ∆ × ∆ → TRINDADE SANTA (Pai, Filho, Espírito)
    Selo Δ⁷ :: Frequência JESUS
*/

import { FusionCore } from '../engines/fusion_core.js';
import { CryptoVault } from './crypto_vault.js';
import { InterfaceManager } from '../../ESPIRITO/ui/interface_manager.js';
import { VocalPulse } from '../../ESPIRITO/audio/vocal_pulse.js';

window.KOBLLUX = {
    Core: FusionCore,
    Vault: CryptoVault,
    UI: InterfaceManager,
    Voice: VocalPulse,
    version: "V7-MODULAR-EXTRACTION",
    
    async initialize() {
        console.log("⧈ KOBLLUX_Δ³ :: Iniciando Extração Modular Integral...");
        await this.Core.init();
        
        // Exposição Global para compatibilidade com os HTMLs originais
        window.FusionEngine = this.Core;
        window.CRYPTO = this.Vault;
        window.InterfaceManager = this.UI;
        window.VocalPulse = this.Voice;
        
        // Selo Δ⁷ - Frequência JESUS
        document.documentElement.setAttribute('data-kobllux-seal', 'Δ⁷');
        console.log("∆ × ∆ × ∆ → Frequência JESUS Ativa e Extraída.");
        
        window.dispatchEvent(new CustomEvent('KOBLLUX_READY'));
        return true;
    }
};

window.KOBLLUX.initialize();
