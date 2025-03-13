const debug1On = false;
const debug2On = false;

export function handleVantageLogTypes(text, loadNames, buttonName, taskNames) {
    switch (true) {
        case text.includes("RX: R:GETCOUNT"):
            return null;
        case text.includes("LOAD"):
            return handleVantageLoadCommands(text, loadNames);
        case text.includes("BTN"):
            return handleVantageButtonCommands(text, buttonNames);
        case text.includes("TASK"):
            return handleVantageTaskCommands(text, taskNames);
        default:
            return text; // Unhandled log type
    }
}

function handleVantageLoadCommands(text, loadNames) {
    if (debug1On) { console.log(`📢 handleVantageLoadCommands called: ${text}`); }
    // Extract Load Index and State Value
    let match = text.match(/S:LOAD\s+(\d+)\s+([\d.]+)/);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }
    let loadIndex = match[1].trim(); // Extract Load Index (e.g., "464")
    let stateValue = parseFloat(match[2]); // Convert state to a number (e.g., "100.000" → 100)

    // Lookup Load Data using loadMap (now an object with room & name)
    let loadData = loadNames[loadIndex] || { room: "(Unknown Room)", name: "(Unknown Load)" };
    let loadName = loadData.name; // Extract only the name
    // Convert state value to whole number percentage
    let statePercentage = Math.round(stateValue) + "%";

    // Format final output
    let result = `Driver Event: '${loadName} set to ${statePercentage} (Vantage InFusion)'`;
    if (debug2On) { console.log(`✅ ${result}`); }
    return result;
}

function handleVantageButtonCommands(text) {
    if (debug1On) { console.log(`📢 handleVantageButtonCommands called: ${text}`); }
    // Extract Button Index and Action (no need to match "S:BTN")
    let match = text.match(/(\d+)\s+(PRESS|RELEASE)/i);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let buttonIndex = match[1].trim(); // Extract Button Index
    let action = match[2].trim().toLowerCase(); // Extract Action, ensure lowercase

    // Convert action for proper grammar
    let formattedAction = action === "press" ? "Pressed" : "Released";

    // Lookup Button Name using buttonNames
    let buttonName = buttonNames[buttonIndex] || "(Unknown Button)";

    // Format final output
    let result = `Driver Event - 'Button ${buttonName} ${formattedAction} (Vantage InFusion)'`;
    if (debug2On) { console.log(`✅ ${result}`); }
    return result;
}

function handleVantageTaskCommands(text, taskNames) {
    if (debug1On) { console.log(`📢 handleVantageTaskCommands called: ${text}`); }

    // Extract Task Index and State
    let match = text.match(/TASK\s+(\d+)\s+(\d+)/);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let taskIndex = match[1].trim(); // Extract Task Index
    let state = match[2].trim(); // Extract State (0 or 1)

    // Lookup Task Name using taskNames
    let taskName = taskNames[taskIndex] || "(Unknown Task)";

    // Format final output
    let result = `Driver Event - 'Task ${taskName} set to State ${state} (Vantage InFusion)'`;
    if (debug2On) { console.log(`✅ ${result}`); }
    return result;
}