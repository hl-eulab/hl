/**
 * TEC - The Earth Calendar
 * Cloud Manager: Sincronizzazione dati con Cloudflare KV
 */

const TEC_CloudManager = {
    config: {
        workerUrl: "https://tec-agenda-worker.hyperlinker.workers.dev",
        userId: "danilo" 
    },

    // Salva l'intera struttura di una settimana o di un'area
    async save(area, data) {
        const url = `${this.config.workerUrl}?user=${this.config.userId}&area=${area}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                console.log(`[TEC Cloud] Sincronizzazione "${area}" riuscita.`);
                return true;
            }
        } catch (error) {
            console.warn(`[TEC Cloud] Sincronizzazione "${area}" fallita:`, error);
            return false;
        }
    },

    // Recupera i dati dal cloud
    async load(area) {
        const url = `${this.config.workerUrl}?user=${this.config.userId}&area=${area}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.warn(`[TEC Cloud] Caricamento "${area}" fallito:`, error);
            return null;
        }
    }
};
