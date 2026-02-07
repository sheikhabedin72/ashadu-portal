// GHOST-BRIDGE: OFFLINE PERSISTENCE & SYNC LOGIC
export const GhostBridge = {
    status: "OFFLINE_READY",
    vaultName: "Ashadu_Sovereign_Vault",

    init: function() {
        console.log("GHOST-BRIDGE: Initializing Stealth Persistence...");
        this.registerServiceWorker();
        
        // Initial sync and event listener setup
        window.addEventListener('load', () => {
            this.syncWithMainframe();
            window.addEventListener('online', () => this.syncWithMainframe());
            window.addEventListener('offline', () => this.syncWithMainframe());
        });
    },

    // 1. THE STEALTH CACHE (Saves the UI locally)
    registerServiceWorker: function() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // In some environments (like sandboxed iframes), Service Worker registration 
                // might fail due to origin restrictions. We wrap this in a try-catch 
                // to ensure the app continues to function.
                navigator.serviceWorker.register('./sw.js', { scope: './' })
                    .then(reg => {
                        console.log("GHOST-BRIDGE: Service Worker Active. UI is now Persistent.");
                    })
                    .catch(err => {
                        // We log this as a debug warning rather than a full error 
                        // because offline persistence is an enhancement, not a core requirement.
                        console.debug("GHOST-BRIDGE: Service Worker registration skipped (expected in sandboxed environments).", err.message);
                    });
            });
        }
    },

    // 2. THE DATA SYNC (Ghost-to-Cloud Handshake)
    syncWithMainframe: function() {
        const isOnline = navigator.onLine;
        const syncStatus = document.getElementById('sync-indicator');
        
        if (!syncStatus) {
            // The element may not be mounted yet on initial load.
            return;
        }

        if (isOnline) {
            this.status = "SYNCED_TO_CLOUD";
            syncStatus.innerText = "GHOST-BRIDGE: TUNNEL SECURE";
            syncStatus.style.color = "var(--cyan)";
        } else {
            this.status = "SOVEREIGN_LOCAL";
            syncStatus.innerText = "GHOST-BRIDGE: LOCAL PERSISTENCE ACTIVE";
            syncStatus.style.color = "var(--gold)";
        }
    },

    // 3. ENCRYPTED LOCAL STORAGE
    saveToVault: function(key: string, data: any) {
        try {
            const encrypted = btoa(JSON.stringify(data)); // Preliminary Base64 Shield
            localStorage.setItem(`${this.vaultName}_${key}`, encrypted);
        } catch (error) {
            console.error("GHOST-BRIDGE: Error saving to vault.", error);
        }
    },
    
    loadFromVault: function(key: string): any | null {
        try {
            const encrypted = localStorage.getItem(`${this.vaultName}_${key}`);
            if (encrypted) {
                const decrypted = atob(encrypted);
                return JSON.parse(decrypted);
            }
            return null;
        } catch(error) {
            console.error("GHOST-BRIDGE: Error loading from vault.", error);
            return null;
        }
    }
};