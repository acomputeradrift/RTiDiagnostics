const debug1On = false;
const debug2On = false;


export function handlePortLogTypes(text, portNames){
    //console.log('Handle Port Logs Called');
    switch (true) {
        case text.includes("RTI RCM-12 Relay Module"): // Relay IR Command
            return handleRCMCommandLogs(text, portNames);
        case text.includes("IR - Port"): // Standard IR Command
            return handleStandardIRCommandLogs(text);
        case text.includes('Relay/Trigger - Port'):
             return handleRelayTriggerCommandLogs(text);
        case text.includes("Serial - Port"): // RS232 Command
            return handleRS232CommandLogs(text);
        default:
            return text; // Unhandled IR log type, return unchanged
    }
}

//--------------------------------------------RELAY/TRIGGER LOGS

// Handles Relay/Trigger log entries
function handleRelayTriggerCommandLogs(text) {
    if (debug1On) {console.log(`Handle Relay Trigger Logs Called: ${text}`);}
    return text.replace(/Relay\/Trigger - Port:'(.*?)','(.*?)' Action:(ON|OFF)/, (match, port, deviceName, action) => {
        let triggerState = action === "ON" ? "Trigger On" : "Trigger Off";
        if (debug2On) {console.log(`✅ Relay/Trigger Command: '${deviceName} ${triggerState} (${port}->Internal Ports)'`);}
        return `Relay/Trigger Command: '${deviceName} ${triggerState} (${port}->Internal Ports)'`;
    });

}
// Handles standard IR commands (Direct Mapping)
function handleStandardIRCommandLogs(text) {
    if (debug1On) {console.log(`Handle Standard IR Logs Called: ${text}`);}
    return text.replace(/IR - Port:'(.*?)','(.*?)' Command:'(.*?)' .*$/, (match, port, deviceName, command) => {
        let cleanedCommand = command.replace(/\s*\[\s*\/\s*\/\s*\]\s*/, ''); // Targeted removal of [ /  / ]
        if (debug2On) {console.log(`✅ IR Command: '${cleanedCommand} (${port}->${deviceName})'`);}
        return `IR Command: '${cleanedCommand} (${port}->${deviceName})'`;
    });
}

function handleRCMCommandLogs(text, portMap) {
    if (debug1On) { console.log(`Handle RCM Logs Called: ${text}`); }

    return text.replace(/IR - Port:'(.*?)','RTI (RCM-\d+) Relay Module' Command:'RELAY (\d+) (OPEN|CLOSE).*?'\s*(Sustain:\w+)?/, 
    (match, moduleName, moduleType, portIndex, action) => {
        // Construct the lookup key for portMap
        let key = `${moduleName}_${moduleType}_${portIndex}`;

        // Look up the port name in portMap (no fallback needed)
        let portName = portMap[key];

        // Determine the relay state
        let triggerState = action === "OPEN" ? "Off" : "On"; // OPEN -> Off, CLOSE -> On

        // Format output based on whether we found a port name
        let formattedPortName = (portName === "(No Port Name Found)") 
            ? `RELAY ${portIndex} (⚠️No Port Name Found)` 
            : portName;

        if (debug2On) {
            console.log(`✅ IR Command: '${formattedPortName} ${triggerState} (${moduleName}->${moduleType})'`);
        }

        return `IR Command: '${formattedPortName} ${triggerState} (${moduleName}->${moduleType})'`;
    });
}

// Handles RS232 Commands

export function handleRS232CommandLogs(text){
    if (debug1On) { console.log(`Handle RS232 Logs Called: ${text}`); }
    switch (true) {
        case text.includes("Baud:") || text.includes("Data:"): // Don't Need
            return null;
        case text.includes('Command:'):
             return handleRS232CommandLogs(text);
        default:
            return text; // Unhandled log type, return unchanged
    }
}

function handleRS232CommandLogs(text) {
    if (debug1On) {console.log(`Handle RS232 Command Logs Called: ${text}`);}

    return text.replace(/Serial - Port:'(.*?)','(?:\d+ - )?(.*?)' Command:'(.*?)'.*$/, 
    (match, moduleName, portName, command) => {
        // Format the final output
        let result = `Serial Command: '${portName} ${command} (${moduleName}->Internal Ports)'`;

        if (debug2On) { console.log(`✅ ${result}`); }

        return result;
    });
}



