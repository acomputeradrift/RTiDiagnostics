export function loadSourceList(sheets) {
    console.log(`Loading data from sheet: Source List`);
    if (!sheets["Source List"]) {
        console.log("⚠️  Source List Sheet not Found");
        return {}; // Return empty object if missing
    }
    const sourceMap = {};
    sheets["Source List"].forEach(row => {
        const index = row['Source Index']?.trim();
        let sourceName = row['Source Name']?.trim();
        if (!sourceName) sourceName = "[Missing Mapped Source Name]";
        if (index) {
            sourceMap[index] = sourceName;
        }
    });
    console.log("✅ Source List loaded.");
    return sourceMap;
}