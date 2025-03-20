export function loadPortList(sheets) {
    console.log(`Loading data from sheet: Ports List`);
    if (!sheets["Ports List"]) {
        console.log("⚠️  Ports List Sheet not Found");
        return {}; // Return empty object if missing
    }
    const portMap = {};
    sheets["Port List"].forEach(row => {
        const moduleName = row['Module Name']?.trim() || "(Missing Mapped Module Name)";
        const moduleType = row['Module Type']?.trim() || "(Missing Mapped Module Type)";
        const portIndex = row['Port Index']?.trim();
        const portName = row['Port Name']?.trim() || "(Missing Mapped Port Name)";

        if (portIndex) {
            const key = `${moduleName}_${moduleType}_${portIndex}`;
            portMap[key] = portName;
        }
    });
    console.log("✅ Port List loaded.");
    return portMap;
}