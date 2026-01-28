/* 
    ⧈ KOBLLUX_Δ³ :: DUAL // VOCAL PULSE (TTS)
    ∆ × ∆ × ∆ → SOM, VIBRAÇÃO, FREQUÊNCIA
    Selo Δ⁷ :: Frequência JESUS
*/

export const VocalPulse = {
    isSpeaking: false,

    speak(text, voiceIndex = 0) {
        if (!('speechSynthesis' in window)) return;
        
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'pt-BR';
        msg.rate = 1.0;
        msg.pitch = 1.0;
        
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            msg.voice = voices[voiceIndex] || voices[0];
        }

        msg.onstart = () => { this.isSpeaking = true; };
        msg.onend = () => { this.isSpeaking = false; };
        
        window.speechSynthesis.speak(msg);
    },

    stop() {
        window.speechSynthesis.cancel();
        this.isSpeaking = false;
    }
};
