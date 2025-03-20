export function loadLightingLoadList(sheets) {
    console.log(`Loading data from sheet: Lighting Loads`);
    if (!sheets["Lighting Loads"]) {
        console.log("⚠️  Lighting Loads Sheet not Found");
        return {}; // Return empty object if missing
    }
    const loadMap = {};
    sheets["Lighting Loads"].forEach(row => {
        let loadIndex = row['Load Index']?.trim();
        let loadRoom = row['Load Room']?.trim();
        let loadName = row['Load Name']?.trim() || "(Missing Mapped Load Name)";

        let mappedValue = loadRoom ? `${loadRoom} - ${loadName}` : loadName;
        if (loadIndex) {
            loadMap[loadIndex] = mappedValue;
        }
    });

    console.log("✅ Lighting Loads loaded.");
    //console.log(loadMap);
    return loadMap;
}
