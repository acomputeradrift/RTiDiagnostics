//const fs = require('fs');

import fs from 'fs';
import xlsx from 'xlsx';
import { handlePortLogs } from "./Types/handlePortLogs.js";
import { handleVauxLogs } from "./Types/handleVauxLogs.js";

//const spreadsheetPath = './Projects/McGuigan/Mapping Data/RTI Diagnostics Feed Info - McGuigan.xlsx';
const spreadsheetPath = './Projects/Sung/Mapping Data/RTI Diagnostics Feed Info - Sung.xlsx';
//const logFilePath = "./Projects/McGuigan/Raw Logs/SystemLog - McGuigan.txt";
const logFilePath = "./Projects/Sung/Raw Logs/SystemLog - Sung.txt";
const htmlOutputPath = './Output/filtered_log_v3.html';
// Mapping of expected CSV replacements to their corresponding spreadsheet sheets
const sheetMappings = {
    loadNames: "Lighting Loads",   // Replaces groupNames.csv
    sourceNames: "Source List",     // Replaces sourceList.csv
    pageNames: "Page List",         // Replaces pageList.csv
    relayNames: "RCM12 List",    // Replaces rcm12List.csv
    portNames: "Ports List",
    audioZoneNames: "Audio Zones"    // Replaces audioZoneList.csv
};

//--------------------------------------Load group name mappings from the spreadsheet

function loadLightingLoadList() {
    console.log(`Loading sheet: Lighting Loads`);
    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Lighting Loads"];
    if (!sheet) {
        console.log("Lighting Load List Sheet not Found");
        return; // Exit the function gracefully
    }
    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const loadMap = {};
    rows.forEach(row => {
        let loadIndex = row['Load Index']?.trim();
        let loadRoom = row['Load Room']?.trim();
        let loadName = row['Load Name']?.trim();

        // Ensure required fields have default values if missing
        if (!loadRoom) loadRoom = "(Missing Mapped Room)";
        if (!loadName) loadName = "(Missing Mapped Name)";

        if (loadIndex) {
            loadMap[loadIndex] = `${loadRoom} - ${loadName}`;
        }
    });
    return loadMap;
}

function loadButtonList() {
    console.log(`Loading sheet: Button List`);
    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Button List"];
   //if (!sheet) throw new Error(`Sheet "Button List" not found`);
   if (!sheet) {
    console.log("Button List Sheet not Found");
    return; // Exit the function gracefully
}
    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const buttonMap = {};
    rows.forEach(row => {
        let buttonIndex = row['Button Index']?.trim();
        let buttonName = row['Button Name']?.trim();

        // Ensure required fields have default values if missing
        if (!buttonName) buttonName = "(Missing Mapped Button Name)";

        if (buttonIndex) {
            buttonMap[buttonIndex] = buttonName;
        }
    });
    return buttonMap;
}

// Load task names from the "Task List" sheet (2 columns)
function loadTaskList() {
    console.log(`Loading sheet: Task List`);
    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Task List"];
    // if (!sheet) throw new Error(`Sheet "Task List" not found`);
    if (!sheet) {
        console.log("Task List Sheet not Found");
        return; // Exit the function gracefully
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const taskNames = {};
    rows.forEach(row => {
        let taskIndex = row['Task Index']?.trim();
        let taskName = row['Task Name']?.trim();
        // Ensure required fields have default values if missing
        if (!taskName) taskName = "(Missing Mapped Task Name)";
        if (taskIndex) {
            taskNames[taskIndex] = taskName;
        }
    });
    return taskNames;
}


// Load source names from the "Source List" sheet (2 columns)
function loadSourceList() {
    console.log(`Loading sheet: Source List`);
    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Source List"];
    if (!sheet) {
        console.log("Source List Sheet not Found");
        return; // Exit the function gracefully
    }
    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const sourceMap = {};
    rows.forEach(row => {
        const index = row['Source Index']?.trim();
        const sourceName = row['Source Name']?.trim();
        if (!sourceName) sourceName = "(Missing Mapped Source Name)";
        if (index) {
            sourceMap[index] = sourceName;
        }
    });

    return sourceMap;
}

// Load page names from the "Page List" sheet (2 columns)
function loadPageList() {
    console.log(`Loading sheet: Page List`);

    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Page List"];
    //if (!sheet) throw new Error(`Sheet "Page List" not found`);
    if (!sheet) {
        console.log("Page List Sheet not Found");
        return; // Exit the function gracefully
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const pageMap = {};

    rows.forEach(row => {
        const pageIndex = row['Page Index']?.trim();
        const pageName = row['Page Name']?.trim();

        if (pageIndex) {
            pageMap[pageIndex] = pageName;
        }
    });

    return pageMap;
}

function loadPortList() {
    console.log(`Loading sheet: Ports List`);

    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Ports List"];
    if (!sheet) {
        console.log("Ports List Sheet not Found");
        return {}; // Return an empty object if the sheet is missing
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const portMap = {};

    rows.forEach(row => {
        const moduleName = row['Module Name']?.trim() || "(No Module Name Found)";
        const moduleType = row['Module Type']?.trim() || "(No Module Type Found)";
        const portIndex = row['Port Index']?.trim();
        const portName = row['Port Name']?.trim() || "(No Port Name Found)";

        if (portIndex) {
            const key = `${moduleName}_${moduleType}_${portIndex}`;
            portMap[key] = portName;
        }
    });

    return portMap;
}
function loadAudioZoneList() {
    console.log(`Loading sheet: Audio Zones`);

    const workbook = xlsx.readFile(spreadsheetPath);
    const sheet = workbook.Sheets["Audio Zones"];
    if (!sheet) {
        console.log("Audio Zones Sheet not Found");
        return { inputMap: {}, outputMap: {} }; // Return empty objects if the sheet is missing
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
    const audioZoneInputMap = {};  // Maps Input Index -> Input Name
    const audioZoneOutputMap = {}; // Maps Output Index -> Output Name

    rows.forEach(row => {
        const inputIndex = row['Audio Zone Input Index']?.trim();
        const inputName = row['Audio Zone Input Name']?.trim()  || "(No Audio Input Name Found)";
        const outputIndex = row['Audio Zone Output Index']?.trim();
        const outputName = row['Audio Zone Output Name']?.trim() || "(No Audio Output Name Found)";

        // Store Input Name
        if (inputIndex) {
            audioZoneInputMap[inputIndex] = inputName;
        }

        // Store Output Name
        if (outputIndex) {
            audioZoneOutputMap[outputIndex] = outputName;
        }
    });

    return { inputMap: audioZoneInputMap, outputMap: audioZoneOutputMap };
}

// Example usage:
const loadNames = loadLightingLoadList();
//console.log(loadNames);
const buttonNames = loadButtonList();
//console.log(buttonNames);
const taskNames = loadTaskList();
//console.log(taskNames);
const sourceNames = loadSourceList();
//console.log(sourceNames);
const pageNames = loadPageList();
//console.log(pageNames);
const portNames = loadPortList();
//console.log(portNames);
const { inputMap: audioInputNames, outputMap: audioOutputNames } = loadAudioZoneList();
// console.log(audioInputNames);
// console.log(audioOutputNames);

//---------------------------------------------------------
//const logFilePath = "./Projects/McGuigan/Raw Logs/SystemLog - McGuigan.txt";
// const logFilePath = "./Projects/Sung/Raw Logs/SystemLog - Sung.txt";
// const htmlOutputPath = './filtered_log_v2.html';

fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    try {
        const logJson = JSON.parse(data);
        if (!logJson.systemLog || !Array.isArray(logJson.systemLog)) {
            console.error('Invalid log format: Expected "systemLog" to be an array');
            return;
        }
        displayFilteredLog(logJson.systemLog);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});


function processLogEntry(text) {
    switch (true) {
        case text.includes('System Manager'):
            //console.log('Filtered by System Manager ->');
            return handleSystemManagerLogTypes(text);
        case text.includes('Layer Switch'):
            //console.log('Filtered by Layer Switch ->');
            return handleLayerSwitchLogs(text);
        case text.includes('Clipsal C-Bus'):
            //console.log('Filtered by Clipsal C-Bus ->');
            return handleCBUSLogTypes(text);
        case text.includes('Lutron Caseta'): 
           //console.log('Filtered by Lutron Caseta ->');
            return handleLutronCasetaLogTypes(text, loadNames);
        case text.includes('- Port'):
            return handlePortLogTypes(text, portNames);
        case text.includes('Vaux Lattis Matrix'):
            //console.log('Filtered by Vaux Lattis Matrix ->');
            return handleVauxLogTypes(text, audioInputNames, audioOutputNames);
        case text.startsWith('Change to page') && text.includes("on device 'iPhone"):
            //console.log('Filtered by Change to page and on device iPhone ->');
            return handlePageChangeLogs(text);
        case text.includes('Vantage InFusion'):
            //console.log('Filtered by Vantage InFusion ->');
            return handleVantageLogTypes(text);
        default:
            //console.log(`Unfiltered log type... ${text}`);
            return text; // Unhandled log type
    }
}

//--------------------------------------------SYSTEM MANAGER LOG TYPES

function handleSystemManagerLogTypes(text) {
    switch (true) {
        case text.includes("Clock") ||
            text.includes("Popup SysVarChange") ||
            text.includes("Variable Stats") ||
            text.includes("Route Command") ||
            text.includes("strView"):
            //console.log('Removed by filter');
            return null;
        case text.includes('Set Source By Room'):
            //console.log('Filtered by Set Source By Room');
            return handleSetSourceByRoomLogs(text);
        case text.includes('Set Source'):
            //console.log('Filtered by Set Source');
            return handleSetSourceLogs(text);
        case text.includes('Room Off'):
            //console.log('Filtered by Room Off');
            return handleRoomOffLogs(text);
        default:
            //console.log(`Unfiltered System Manager log type... ${text}`);
            return text; // Unhandled log type
    }
}


function handleSetSourceLogs(text) {
    let match = text.match(/Set Source\((\d+)\)/); // Fix regex: match only the index
    if (!match) return text; // If no match, return unchanged

    let [, sourceIndex] = match; // Only extract the index
    let sourceName = sourceNames[sourceIndex] || "[Unknown Source]"; // Lookup source name

    return `Driver Command: 'Set Source to ${sourceName} (System Manager)'`; // Removed [Hide]
}

function handleSetSourceByRoomLogs(text) {
    //console.log("🔍 Received Log:", text);
    let match = text.match(/Set Source By Room\((.+?), (\d+)\)/);
    if (!match) {
        //console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let room = match[1].trim(); // Ensure room name is properly extracted
    let sourceIndex = match[2].trim(); // Extract and trim source index
    let sourceName = sourceNames[sourceIndex] || "[Unknown Source]"; // Lookup source name

    //console.log("🔎 Source Name Lookup:", sourceName);

    let result = `Driver Command: 'Set Source to ${room} ${sourceName} (System Manager)'`; // Removed [Hide]
    //console.log("🚀 Final Output:", result);

    return result;
}

function handleRoomOffLogs(text) {
    return "Driver Command: 'Room Off (System Manager)'";
}

//--------------------------------------------LAYER SWITCH LOG TYPES
//WORKS - 2025 03 11

function handleLayerSwitchLogs(text) {
    //console.log("🔍 Received Log:", text);

    // Match everything before the last `(` as Group Name, and the last `()` content as Layer Name
    let match = text.match(/Ex\. Group: (.+)\(([^()]+)\)\s*'?/);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let groupName = match[1].trim(); // Extract Group Name (keeps everything before last `(`)
    let layerName = match[2].trim(); // Extract Layer Name (last parentheses content)

    // console.log("✅ Extracted Group Name:", groupName);
    // console.log("✅ Extracted Layer Name:", layerName);

    let result = `Driver Command: 'Set selected Layer to ${groupName} -> ${layerName} (Layer Switch)'`;
    //console.log("🚀 Final Output:", result);

    return result;
}

//--------------------------------------------CBUS LOG TYPES
function handleCBUSLogTypes(text) {
    switch (true) {
        case text.includes("Driver event"):
            //console.log('Filtered by Driver Event');
            return handleCBUSDriverEvent(text);
        case text.includes("Driver - Command"):
            //console.log('Filtered by Driver Command');
            return handleCBUSDriverCommand(text);
        default:
            return text; // Unhandled log type
    }
}

function handleCBUSDriverEvent(text) {
    let match = text.match(/App (\d+), Group (\d+) (\w+)/);
    if (!match) return text; // If no match, return unchanged

    let [, appNum, loadIndex, state] = match;

    switch (appNum) {
        case "56": // Lighting
            let loadName = loadNames[loadIndex] || `Group ${loadIndex}`;
            return `Driver Event: 'When ${loadName} ${state} happens (Clipsal C-Bus)'`;
        default:
            return text; // Unhandled App category
    }
}

function handleCBUSDriverCommand(text) {
    let match = text.match(/Immediate Switch\((\d+), (\d+), (\d+)\)/);
    if (!match) return text; // If no match, return unchanged

    let [, stateNum, groupId, category] = match;

    switch (category) {
        case "56": // Lighting
            let state = stateNum === "1" ? "Off" : "On";
            let groupName = loadNames[groupId] || `Group ${groupId}`;
            return `Driver Command: '${groupName} ${state} (Clipsal C-Bus)'`;
        default:
            return text; // Unhandled category
    }
}

//--------------------------------------------VANTAGE LOG TYPES

function handleVantageLogTypes(text) {
    switch (true) {
        case text.includes("RX: R:GETCOUNT"):
            return null;
        case text.includes("LOAD"):
            return handleVantageLoadLog(text);
        case text.includes("BTN"):
            return handleVantageButtonLog(text);
        case text.includes("TASK"):
            return handleVantageTaskLog(text);
        default:
            return text; // Unhandled log type
    }
}

function handleVantageLoadLog(text) {
    console.log("🔍 Received Log:", text);

    // Extract Load Index and State Value
    let match = text.match(/S:LOAD\s+(\d+)\s+([\d.]+)/);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let loadIndex = match[1].trim(); // Extract Load Index (e.g., "464")
    let stateValue = parseFloat(match[2]); // Convert state to a number (e.g., "100.000" → 100)

    //console.log("✅ Extracted Load Index:", loadIndex);
    //console.log("✅ Extracted State Value:", stateValue);

    // Lookup Load Data using loadMap (now an object with room & name)
    let loadData = loadNames[loadIndex] || { room: "(Unknown Room)", name: "(Unknown Load)" };
    let loadName = loadData.name; // Extract only the name

    console.log("🔎 Load Name Lookup:", loadName);

    // Convert state value to whole number percentage
    let statePercentage = Math.round(stateValue) + "%";

    // Format final output
    let result = `Driver Event: '${loadName} set to ${statePercentage} (Vantage InFusion)'`;
    console.log("🚀 Final Output:", result);

    return result;
}

function handleVantageButtonLog(text) {
    console.log("🔍 Received Log:", text);

    // Extract Button Index and Action (no need to match "S:BTN")
    let match = text.match(/(\d+)\s+(PRESS|RELEASE)/i);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let buttonIndex = match[1].trim(); // Extract Button Index
    let action = match[2].trim().toLowerCase(); // Extract Action, ensure lowercase

    console.log("✅ Extracted Button Index:", buttonIndex);
    console.log("✅ Extracted Action:", action);

    // Convert action for proper grammar
    let formattedAction = action === "press" ? "Pressed" : "Released";

    // Lookup Button Name using buttonNames
    let buttonName = buttonNames[buttonIndex] || "(Unknown Button)";

    console.log("🔎 Button Name Lookup:", buttonName);

    // Format final output
    let result = `Driver Event - 'Button ${buttonName} ${formattedAction} (Vantage InFusion)'`;
    console.log("🚀 Final Output:", result);

    return result;
}

function handleVantageTaskLog(text) {
    console.log("🔍 Received Log:", text);

    // Extract Task Index and State
    let match = text.match(/TASK\s+(\d+)\s+(\d+)/);
    if (!match) {
        console.log(`❌ No match found for regex: ${text}`);
        return text; // If no match, return unchanged
    }

    let taskIndex = match[1].trim(); // Extract Task Index
    let state = match[2].trim(); // Extract State (0 or 1)

    console.log("✅ Extracted Task Index:", taskIndex);
    console.log("✅ Extracted State:", state);

    // Lookup Task Name using taskNames
    let taskName = taskNames[taskIndex] || "(Unknown Task)";

    console.log("🔎 Task Name Lookup:", taskName);

    // Format final output
    let result = `Driver Event - 'Task ${taskName} set to State ${state} (Vantage InFusion)'`;
    console.log("🚀 Final Output:", result);

    return result;
}


//--------------------------------------------CASETA LOG TYPES
// function handleCasetaLogTypes(text) {
//     switch (true) {
//         case text.includes("Dimmers\\Set Dimmer Level"):
//             return handleCasetaDimmer(text);
//         case text.includes("Switches\\Switch Commands"):
//             return handleCasetaSwitch(text);
//         default:
//             return text; // Unhandled log type
//     }
// }

// // Handles Lutron Caseta Dimmer commands
// function handleCasetaDimmer(text) {
//     return text.replace(/Driver - Command:'.*Dimmers\\Set Dimmer Level\((.*?) \(ID \d+\), (\d+),.*?\)'.*$/, (match, lightName, dimmerLevel) => {
//         return `Driver Command: '${lightName} set to ${dimmerLevel}% (Lutron Caseta)'`;
        
//     });
// }

// function handleCasetaSwitch(text) {
//     return text.replace(/Driver - Command:'.*Switches\\Switch Commands\((.*?) \(ID \d+\), (On|Off|Toggle)\)'.*$/, (match, lightName, state) => {
//         if (state === "Toggle") {
//             return `Driver Command: '${lightName} was toggled (Lutron Caseta)'`;
//         }
//         return `Driver Command: '${lightName} switched ${state} (Lutron Caseta)'`;
//     });
// }

//--------------------------------------------PAGE CHANGE LOGS

function handlePageChangeLogs(text) {
    return text.replace(/Change to page (\d+) on device 'iPhone \((.*?)\)'/g, (match, pageIndex, deviceName) => {
        if (pageNames[pageIndex]) {
            // Extract the page name
            let pageName = pageNames[pageIndex];

            // Ensure we only modify the last parentheses block
            pageName = pageName.replace(/\(([^()>]+) > .*?\)$/, '($1)');

            return `Change to page ${pageName} on device 'iPhone (${deviceName})'`;
        }
        return match; // If no match is found, return the original text unchanged
    });
}

// //-----------------------------------------------------VAUX
// //WORKS - 2025 03 11
// function handleVauxLogs(text) {
//     //console.log("🔍 Received Log:", text);

//     // Match command, optional extra text, and output index
//     let match = text.match(/Output Settings\\(.+?)\(([^,\d]+)?,?\s*(\d+)\)/);
//     if (!match) {
//         console.log(`❌ No match found for regex: ${text}`);
//         return text; // If no match, return unchanged
//     }

//     let command = match[1].trim(); // Extract command (e.g., "Volume Up")
//     let extraText = match[2]?.trim(); // Extract extra text (e.g., "Toggle") or undefined
//     let outputIndex = match[3].trim(); // Extract output index (e.g., "13")

//     //console.log("✅ Extracted Command:", command);
//     //console.log("✅ Extracted Extra Text:", extraText || "None");
//     //console.log("✅ Extracted Output Index:", outputIndex);

//     // Lookup output name using audioZoneNames
//     let outputName = audioZoneNames[outputIndex] || "[Unknown Output]";

//     //console.log("🔎 Output Name Lookup:", outputName);

//     // Only include extra text if it exists
//     let result = `Driver Command: '${outputName} ${command}${extraText ? " " + extraText : ""} (Vaux Lattis Matrix)'`;
//     //console.log("🚀 Final Output:", result);

//     return result;
// }

// Default handler for unrecognized log entries
function handleDefault(text) {
    return text; // Return the text unchanged
}

// Processes and filters log entries
function displayFilteredLog(logEntries) {
    let htmlLogContent = `<html><head><style>
        body { font-family: monospace; background: #121212; color: #fff; padding: 10px; }
        .macro { color: orange; }
        .systemMacro { color: yellow; }
        .command { color: pink; }
        .event { color: magenta; }
        .connected { color: limegreen; }
        .alert { color: red; }
    </style></head><body><h2>Filtered Log Entries</h2><pre>`;


    logEntries.forEach(entry => {
        //if (!entry.text) return;
        let processedText = processLogEntry(entry.text);
        if (!processedText) return; // Skip entries that are null or empty
        // Ensure only Jandy status messages are included
        if (entry.text.includes('Jandy iAquaLink') && !entry.text.includes('status:')) return;

        let htmlClass = "";
 
        // let line = `[ID: ${entry.id}] [${entry.time}] ${processLogEntry(entry.text)}`;
        let line = `[ID: ${entry.id}] [${entry.time}] ${processedText}`; // Use processed text


        switch (true) {
            case processedText.includes('Macro - Start') || entry.text.includes('Macro - End'):
                htmlClass = "macro";
                break;
            case processedText.includes('System macro'):
                htmlClass = "systemMacro";
                break;
            case processedText.includes('Command:'):
                htmlClass = "command";
                break;
            case processedText.includes('Driver Event'):
                htmlClass = "event";
                break;
            case processedText.includes('disconnected') || processedText.includes('Failed') || processedText.includes('Offline'):
                htmlClass = "alert";
                break;
            case processedText.includes('connected') || processedText.includes('Online'):
                htmlClass = "connected";
                break;
        };
    

        // Append to HTML file with color styling
        //htmlLogContent += <span class="${htmlClass}">${line}</span><br>;
        htmlLogContent += `<span class="${htmlClass}">${line}</span><br>`;

    });

    // Finish HTML file
    htmlLogContent += "</pre></body></html>";

    // Write logs to HTML file
    fs.writeFileSync(htmlOutputPath, htmlLogContent, 'utf8');

    console.log(`\n✅ Log saved to ${htmlOutputPath}`);

}
