// import fs from 'fs';
// import xlsx from 'xlsx';
// import { handleSystemManagerLogTypes } from "./driverTypes/handleSystemManagerLogs.js";
// import { handleDiagnosticLogTypes } from "./driverTypes/handleDiagnosticLogs.js";
// import { handlePortLogTypes } from "./driverTypes/handlePortLogs.js";
// import { handleVauxLogTypes } from "./driverTypes/handleVauxLogs.js";
// import { handleLutronCasetaLogTypes } from "./driverTypes/handleLutronCastetaLogs.js";
// import { handleVantageLogTypes} from "./driverTypes/handleVantageLogs.js"
// import { handleLayerSwitchLogs } from "./driverTypes/handleLayerSwitchLogs.js";
// import { handleCBUSLogTypes } from "./driverTypes/handleCBUSLogs.js";
// import { handleAD64LogTypes } from "./driverTypes/handleAD64Logs.js";
// import { handleCoolMasterNetLogTypes } from "./driverTypes/handleCoolMasterNetLogs.js";
// import { loadLightingLoadList } from "./loaders/loadLightingLoadList.js";
// import { loadSpreadsheet } from "./loaders/loadSpreadsheet.js";

// //const spreadsheetPath = './Projects/McGuigan/Mapping Data/RTI Diagnostics Feed Info - McGuigan.xlsx';
// const spreadsheetPath = './Projects/Sung/Mapping Data/RTI Diagnostics Feed Info - Sung.xlsx';
// //const logFilePath = "./Projects/McGuigan/Raw Logs/SystemLog - McGuigan 2.txt";
// const logFilePath = "./Projects/Sung/Raw Logs/SystemLog - Sung.txt";
// const htmlOutputPath = './Output/filtered_log_v4.html';
// // Mapping of expected CSV replacements to their corresponding spreadsheet sheets
// // const sheetMappings = {
// //     loadNames: "Lighting Loads",   
// //     sourceNames: "Source List",     
// //     pageNames: "Page List",         
// //     portNames: "Ports List",
// //     audioZoneNames: "Audio Zones"  
// // };

// //--------------------------------------Load group name mappings from the spreadsheet

// const sheets = loadSpreadsheet(); //temp
// // function loadLightingLoadList() {
// //     console.log(`Loading from sheet: Lighting Loads`);
// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Lighting Loads"];
// //     if (!sheet) {
// //         console.log("⚠️ Lighting Loads Sheet not Found");
// //         return; // Exit the function gracefully
// //     }

// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const loadMap = {};

// //     rows.forEach(row => {
// //         let loadIndex = row['Load Index']?.trim();
// //         let loadRoom = row['Load Room']?.trim();
// //         let loadName = row['Load Name']?.trim();

// //         // Ensure required fields have default values if missing
// //         if (!loadName) loadName = "(Missing Mapped Load Name)";

// //         // Format mapping based on presence of Load Room
// //         let mappedValue = loadRoom ? `${loadRoom} - ${loadName}` : loadName;

// //         if (loadIndex) {
// //             loadMap[loadIndex] = mappedValue;
// //         }
// //     });

// //     console.log("✅ Lighting Loads mapped.");
// //     return loadMap;
// // }

// // function loadButtonList() {
// //     console.log(`Loading from sheet: Button List`);
// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Button List"];
// //    //if (!sheet) throw new Error(`Sheet "Button List" not found`);
// //    if (!sheet) {
// //     console.log("⚠️  Button List Sheet not Found");
// //     return; // Exit the function gracefully
// //     }
// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const buttonMap = {};
// //     rows.forEach(row => {
// //         let buttonIndex = row['Button Index']?.trim();
// //         let buttonName = row['Button Name']?.trim();

// //         // Ensure required fields have default values if missing
// //         if (!buttonName) buttonName = "(Missing Mapped Button Name)";

// //         if (buttonIndex) {
// //             buttonMap[buttonIndex] = buttonName;
// //         }
// //     });
// //     console.log("✅ Button List mapped.");
// //     return buttonMap;
// // }

// // function loadTaskList() {
// //     console.log(`Loading from sheet: Task List`);
// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Task List"];
// //     // if (!sheet) throw new Error(`Sheet "Task List" not found`);
// //     if (!sheet) {
// //         console.log("⚠️  Task List Sheet not Found");
// //         return; // Exit the function gracefully
// //     }

// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const taskNames = {};
// //     rows.forEach(row => {
// //         let taskIndex = row['Task Index']?.trim();
// //         let taskName = row['Task Name']?.trim();
// //         // Ensure required fields have default values if missing
// //         if (!taskName) taskName = "(Missing Mapped Task Name)";
// //         if (taskIndex) {
// //             taskNames[taskIndex] = taskName;
// //         }
// //     });
// //     console.log("✅ Task List mapped.");
// //     return taskNames;
// // }

// // function loadSourceList() {
// //     console.log(`Loading from sheet: Source List`);
// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Source List"];
// //     if (!sheet) {
// //         console.log("⚠️  Source List Sheet not Found");
// //         return; // Exit the function gracefully
// //     }
// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const sourceMap = {};
// //     rows.forEach(row => {
// //         const index = row['Source Index']?.trim();
// //         let sourceName = row['Source Name']?.trim();
// //         if (!sourceName) sourceName = "[Missing Mapped Source Name]";
// //         if (index) {
// //             sourceMap[index] = sourceName;
// //         }
// //     });
// //     console.log("✅ Source List mapped.");
// //     return sourceMap;
// // }

// // function loadPageList() {
// //     console.log(`Loading from sheet: Page List`);

// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Page List"];
// //     //if (!sheet) throw new Error(`Sheet "Page List" not found`);
// //     if (!sheet) {
// //         console.log("⚠️  Page List Sheet not Found");
// //         return; // Exit the function gracefully
// //     }

// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const pageMap = {};

// //     rows.forEach(row => {
// //         const pageIndex = row['Page Index']?.trim(); 
// //         let pageName = row['Page Name']?.trim();
// //         if (!pageName) pageName = "(Missing Mapped Page Name)";
// //         if (pageIndex) {
// //             pageMap[pageIndex] = pageName;
// //         }
// //     });
// //     console.log("✅ Page List mapped.");
// //     return pageMap;
// // }

// // function loadPortList() {
// //     console.log(`Loading from sheet: Ports List`);

// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Ports List"];
// //     if (!sheet) {
// //         console.log("⚠️  Ports List Sheet not Found");
// //         return {}; // Return an empty object if the sheet is missing
// //     }

// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const portMap = {};

// //     rows.forEach(row => {
// //         const moduleName = row['Module Name']?.trim() || "(Missing Mapped Module Name)";
// //         const moduleType = row['Module Type']?.trim() || "(Missing Mapped Module Type)";
// //         const portIndex = row['Port Index']?.trim();
// //         const portName = row['Port Name']?.trim() || "(Missing Mapped Port Name)";

// //         if (portIndex) {
// //             const key = `${moduleName}_${moduleType}_${portIndex}`;
// //             portMap[key] = portName;
// //         }
// //     });
// //     console.log("✅ Port List mapped.");
// //     return portMap;
// // }

// // function loadAudioZoneList() {
// //     console.log(`Loading from sheet: Audio Zones`);

// //     const workbook = xlsx.readFile(spreadsheetPath);
// //     const sheet = workbook.Sheets["Audio Zones"];
// //     if (!sheet) {
// //         console.log("⚠️  Audio Zones Sheet not Found");
// //         return { inputMap: {}, outputMap: {} }; // Return empty objects if the sheet is missing
// //     }

// //     const rows = xlsx.utils.sheet_to_json(sheet, { raw: false });
// //     const audioZoneInputMap = {};  // Maps Input Index -> Input Name
// //     const audioZoneOutputMap = {}; // Maps Output Index -> Output Name

// //     rows.forEach(row => {
// //         const inputIndex = row['Audio Zone Input Index']?.trim();
// //         const inputName = row['Audio Zone Input Name']?.trim()  || "(Missing Audio Input Name)";
// //         const outputIndex = row['Audio Zone Output Index']?.trim();
// //         const outputName = row['Audio Zone Output Name']?.trim() || "(Missing Audio Output Name)";

// //         // Store Input Name
// //         if (inputIndex) {
// //             audioZoneInputMap[inputIndex] = inputName;
// //         }

// //         // Store Output Name
// //         if (outputIndex) {
// //             audioZoneOutputMap[outputIndex] = outputName;
// //         }
// //     });
// //     console.log("✅ Audio Zone List mapped.");
// //     return { inputMap: audioZoneInputMap, outputMap: audioZoneOutputMap };
// // }


// // const loadNames = loadLightingLoadList(sheets);
// // //const loadNames = loadLightingLoadList();
// // //console.log(loadNames);
// // const buttonNames = loadButtonList();
// // //console.log(buttonNames);
// // const taskNames = loadTaskList();
// // //console.log(taskNames);
// // const sourceNames = loadSourceList();
// // //console.log(sourceNames);
// // const pageNames = loadPageList();
// // //console.log(pageNames);
// // const portNames = loadPortList();
// // //console.log(portNames);
// // const { inputMap: audioInputNames, outputMap: audioOutputNames } = loadAudioZoneList();
// // // console.log(audioInputNames);
// // // console.log(audioOutputNames);

// //----------------------------------------------------------------------------------------------------------

// fs.readFile(logFilePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     try {
//         const logJson = JSON.parse(data);
//         if (!logJson.systemLog || !Array.isArray(logJson.systemLog)) {
//             console.error('Invalid log format: Expected "systemLog" to be an array');
//             return;
//         }
//         displayFilteredLog(logJson.systemLog);
//     } catch (error) {
//         console.error('Error parsing JSON:', error);
//     }
// });


// function processLogEntry(text) {
//     switch (true) {
//         case text.includes('System Manager') || text.startsWith('Change to page'):
//             //console.log('Filtered by System Manager ->');
//             return handleSystemManagerLogTypes(text, sourceNames, pageNames);
//         case text.includes('Diagnostics'):
//             return handleDiagnosticLogTypes(text);
//         case text.includes('Layer Switch'):
//             //console.log('Filtered by Layer Switch ->');
//             return handleLayerSwitchLogs(text);
//         case text.includes('Clipsal C-Bus'):
//             //console.log('Filtered by Clipsal C-Bus ->');
//             return handleCBUSLogTypes(text, loadNames);
//         case text.includes('Lutron Caseta'): 
//            //console.log('Filtered by Lutron Caseta ->');
//             return handleLutronCasetaLogTypes(text);
//         case text.includes('- Port'):
//             return handlePortLogTypes(text, portNames);
//         case text.includes('Vaux Lattis Matrix'):
//             //console.log('Filtered by Vaux Lattis Matrix ->');
//             return handleVauxLogTypes(text, audioInputNames, audioOutputNames);
//         case text.includes('Vantage InFusion'):
//             //console.log('Filtered by Vantage InFusion ->');
//             return handleVantageLogTypes(text, loadNames, buttonNames, taskNames);
//         case text.includes('AD-64'):
//             return handleAD64LogTypes(text);
//         case text.includes('CoolMasterNet'):
//             return handleCoolMasterNetLogTypes(text);
//         default:
//             //console.log(`Unfiltered log type... ${text}`);
//             return text; // Unhandled log type
//     }
// }

// // Default handler for unrecognized log entries
// function handleDefault(text) {
//     return text; // Return the text unchanged
// }

// // Processes and filters log entries
// function displayFilteredLog(logEntries) {
//     let htmlLogContent = `<html><head><style>
//         body { font-family: monospace; background: #121212; color: #fff; padding: 10px; }
//         .macro { color: orange; }
//         .systemMacro { color: yellow; }
//         .command { color: pink; }
//         .event { color: magenta; }
//         .connected { color: limegreen; }
//         .alert { color: red; }
//     </style></head><body><h2>Filtered Log Entries</h2><pre>`;


//     logEntries.forEach(entry => {
//         //if (!entry.text) return;
//         let processedText = processLogEntry(entry.text);
//         //console.log(`Processed Text: ${processedText}`);
//         if (!processedText) return; // Skip entries that are null or empty
//         // Ensure only Jandy status messages are included
//         if (entry.text.includes('Jandy iAquaLink') && !entry.text.includes('status:')) return;

//         let htmlClass = "";
 
//         // let line = `[ID: ${entry.id}] [${entry.time}] ${processLogEntry(entry.text)}`;
//         let line = `[ID: ${entry.id}] [${entry.time}] ${processedText}`; // Use processed text


//         switch (true) {
//             case processedText.includes('Macro - Start') || entry.text.includes('Macro - End'):
//                 htmlClass = "macro";
//                 break;
//             case processedText.includes('System macro'):
//                 htmlClass = "systemMacro";
//                 break;
//             case processedText.includes('Command:'):
//                 htmlClass = "command";
//                 break;
//             case processedText.includes('Driver Event'):
//                 htmlClass = "event";
//                 break;
//             case processedText.includes('disconnected') || processedText.includes('Failed') || processedText.includes('Offline'):
//                 htmlClass = "alert";
//                 break;
//             case processedText.includes('connected') || processedText.includes('Online'):
//                 htmlClass = "connected";
//                 break;
//         };
    

//         // Append to HTML file with color styling
//         //htmlLogContent += <span class="${htmlClass}">${line}</span><br>;
//         htmlLogContent += `<span class="${htmlClass}">${line}</span><br>`;

//     });

//     // Finish HTML file
//     htmlLogContent += "</pre></body></html>";

//     // Write logs to HTML file
//     fs.writeFileSync(htmlOutputPath, htmlLogContent, 'utf8');

//     console.log(`\n✅ Log saved to ${htmlOutputPath}`);

// }

//----------------------------------------------
import fs from 'fs';
import { loadSpreadsheet } from './loaders/loadSpreadsheet.js';
import { loadAllMappings } from './loaders/loadAllMappings.js';
import { displayFilteredLog } from './logProcessing/displayFilteredLog.js';
import { logFilePath } from './config/paths.js';

// Load spreadsheet once and map lists
const sheets = loadSpreadsheet();
const mappings = loadAllMappings(sheets);

// Read log file
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
        displayFilteredLog(logJson.systemLog, mappings);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
