/**
 * ⧈ KOBLLUX_Δ³ :: CORPO/engines/fusion_core.js
 * #python #typescript #jsonld
 * Núcleo de Processamento de IA e Orquestração MetaPulso
 */

export const FusionCore = {
    state: {
        isReady: false,
        metaData: null,
        config: {
            languages: ['python', 'typescript', 'rust', 'cpp', 'glsl', 'bash', 'jsonld']
        }
    },

    async init() {
        console.log("⧈ FusionCore :: Ativando Motores...");
        try {
            this.state.metaData = await this.loadMetaPulso();
            this.state.isReady = true;
            return true;
        } catch (e) {
            console.error("FusionCore Init Error:", e);
            return false;
        }
    },

    /* ------------------ helpers KOBLLUX (di_ prefix) ------------------ */

di_isValidUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  // Rejeita esquemas perigosos
  if (/^\s*(javascript:|data:|file:)/i.test(urlString)) return false;
  try {
    const u = new URL(urlString);
    // só aceita https por padrão (mais seguro)
    if (u.protocol !== 'https:') return false;
    // evita longas strings suspeitas (opcional)
    if (urlString.length > 10000) return false; // mais permissivo
    return true;
  } catch (e) {
    return false;
  }
},

/**
 * di_buildIframe(url, opts)
 * retorna string do <iframe> pronta para innerHTML
 */
di_buildIframe(url, opts = {}) {
  const {
    width = '100%',
    height = '420',
    sandbox = 'allow-scripts allow-same-origin',
    allow = 'fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture',
    style = 'border:0;border-radius:8px'
  } = opts;

  // sanitize: remove newlines, aspas e trim
  const safeUrl = String(url)
    .replace(/\r?\n|\r/g, '')
    .replace(/["']/g, '%22')
    .trim();

  return `<iframe src="${safeUrl}" width="${width}" height="${height}" sandbox="${sandbox}" allow="${allow}" loading="lazy" style="${style}"></iframe>`;
},

/**
 * di_extractFirstUrl(text)
 * tenta extrair a primeira URL absoluta do texto
 */
di_extractFirstUrl(text) {
  if (!text || typeof text !== 'string') return null;

  // remove escapes comuns e quebras
  const cleaned = text.replace(/&quot;|&amp;|\\n|\\r/g, ' ');

  // regex mais permissiva, aceita ?, =, &, #, . etc
  const re = /(https?:\/\/[^\s'"<>]{10,10000})/i;

  const m = cleaned.match(re);
  return m ? m[1].replace(/["'<>]/g, '') : null;
},

/* ------------------ fetchAI simplificado e integrado ------------------ */

async fetchAI(config = {}) {
  const {
    endpoint,
    apiKey,
    model,
    messages,
    temperature = 0.2,
    timeout = 30000,
    debug = false,
    allowUnvalidatedUrls = true // se true, ignora di_isValidUrl (perigo)
  } = config;

  if (!endpoint) throw new Error('fetchAI: endpoint obrigatório');

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  const body = Array.isArray(messages) ? { model, messages, temperature } : { model, prompt: messages || '', temperature };

  if (debug) console.log('di_fetchAI ->', endpoint, body);

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal
    });
    clearTimeout(id);

    if (!resp.ok) {
      const txt = await resp.text().catch(() => '<no-body>');
      throw new Error(`AI Fetch Failed: ${resp.status} ${resp.statusText} — ${txt.slice(0,800)}`);
    }

    // tenta JSON, se falhar pega texto
    let data;
    try { data = await resp.json(); } catch (e) { data = await resp.text(); }

    // Extrai texto da resposta (usa teu parser ou o simples abaixo)
    let text = '';
    if (typeof data === 'string') text = data;
    else if (data.choices && data.choices[0]) {
      text = data.choices[0].message?.content ?? data.choices[0].text ?? '';
    } else if (data.result) text = data.result;
    else text = JSON.stringify(data);

    if (debug) console.log('di_fetchAI -> raw text', text.slice(0,300));

    // tenta encontrar iframe primeiro
    const iframeRe = /<iframe\b[^>]*>(?:[\s\S]*?<\/iframe>)?/i;
    const iframeMatch = text.match(iframeRe);
    if (iframeMatch) {
      // normaliza e retorna o iframe encontrado
      return iframeMatch[0].replace(/\s+>/, '>');
    }

    // se não tiver iframe, extrai a primeira URL
    const url = this.di_extractFirstUrl(text);
    if (!url) throw new Error('Resposta sem iframe ou URL');

    // valida a url (salvo se allowUnvalidatedUrls=true)
    if (!allowUnvalidatedUrls && !this.di_isValidUrl(url)) {
      throw new Error('URL não considerada válida pelo filtro de segurança');
    }

    // constroi e devolve o iframe
    return this.di_buildIframe(url, { height: '720' });

  } catch (err) {
    if (err.name === 'AbortError') throw new Error('AI Fetch Timeout');
    throw err;
  }
},

    // Motor de Dados (MetaPulso)
    async loadMetaPulso(path = './KOBLLUX_MODULAR/SEMENTE/config/metapulso_70_combinacoes.json') {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error("MetaPulso JSON not found");
            return await response.json();
        } catch (e) {
            console.warn("FusionCore: Fallback para caminho raiz do MetaPulso");
            const response = await fetch('./metapulso_70_combinacoes.json');
            return await response.json();
        }
    },

    // Motor de Persistência (Cortex)
    saveData(key, data) {
        localStorage.setItem(`KOBLLUX_${key}`, JSON.stringify(data));
    },

    loadData(key) {
        const saved = localStorage.getItem(`KOBLLUX_${key}`);
        return saved ? JSON.parse(saved) : null;
    },

    detectIntent(text) {
        if (!text) return { intent: 'none' };
        const lower = text.toLowerCase();
        let intent = 'unknown';
        
        if (/(start|run|exec|execute|rodar|iniciar)/i.test(lower)) intent = 'action.start';
        if (/(stop|end|parar|sair)/i.test(lower)) intent = 'action.stop';
        if (/(status|estado|status\?)/i.test(lower)) intent = 'query.status';
        
        return { intent, timestamp: Date.now() };
    }
};
