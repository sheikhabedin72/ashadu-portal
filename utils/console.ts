
/**
 * ASHADU TEXT-FALLBACK CONSOLE
 * Invisible manual override for the Director.
 * 100% IP Ownership: SHEIKH-MOHAMMED ABEDIN
 */

export const AshaduConsole = {
    isActive: false,

    // 1. The "Ghost Trigger": Pressing a specific key combo (e.g., 'Shift + A')
    init: () => {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.shiftKey && e.key === 'A') { // A for Ashadu/Abedin
                AshaduConsole.toggle();
            }
        });
    },

    toggle: () => {
        let terminal = document.getElementById('ashadu-terminal');
        if (!terminal) {
            AshaduConsole.create();
            terminal = document.getElementById('ashadu-terminal');
        }
        
        if (terminal) {
            const isHidden = terminal.style.display === 'none' || terminal.style.display === '';
            terminal.style.display = isHidden ? 'block' : 'none';
            if (isHidden) {
                const commandInput = document.getElementById('command-input') as HTMLInputElement;
                commandInput?.focus();
            }
        }
    },

    create: () => {
        const div = document.createElement('div');
        div.id = 'ashadu-terminal';
        div.innerHTML = `
            <div style="position:fixed; bottom:0; left:0; width:100%; background:rgba(5,5,5,0.95); border-top:1px solid #c5a059; padding:15px; z-index:9999; font-family:monospace; color:#00f2ff; display:none;">
                <span>[DIRECTOR_INPUT]:_ </span>
                <input type="text" id="command-input" style="background:transparent; border:none; color:#c5a059; width:80%; outline:none; font-family:monospace; font-size:1.2rem;" placeholder="...">
            </div>
        `;
        document.body.appendChild(div);

        const commandInput = document.getElementById('command-input') as HTMLInputElement;
        commandInput?.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                const cmd = commandInput.value.toLowerCase();
                AshaduConsole.execute(cmd);
                commandInput.value = ''; // Clear after use
            }
        });
    },

    execute: (cmd: string) => {
        console.log("ASHADU_LOGIC: Executing - " + cmd);
        
        // Command Routing Logic
        if (cmd.includes("ledger")) {
            alert("SISTER ARCHITECT: Opening Treasury on ashadu.space...");
            // Link to the space domain
        } else if (cmd.includes("flare")) {
            alert("ASHADU: Launch sequence initiated for March 1st.");
        } else if (cmd.includes("lockdown")) {
            alert("ZAYANA: Protocol Zero engaged. All domains black-holed.");
        } else {
            alert("ASHADU: Command acknowledged. Syncing with .cloud...");
        }
    }
};