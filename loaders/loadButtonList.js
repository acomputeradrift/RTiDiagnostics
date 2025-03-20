export function loadButtonList(sheets) {
    console.log(`Loading data from sheet: Button List`);
    if (!sheets["Button List"]) {
        console.log("⚠️  Button List Sheet not Found");
        return {}; // Return empty object if missing
    }
    const buttonMap = {};
    sheets["Button List"].forEach(row => {
        let buttonIndex = row['Button Index']?.trim();
        let buttonName = row['Button Name']?.trim();

        // Ensure required fields have default values if missing
        if (!buttonName) buttonName = "(Missing Mapped Button Name)";

        if (buttonIndex) {
            buttonMap[buttonIndex] = buttonName;
        }
    });
    console.log("✅ Button List loaded.");
    return buttonMap;
}
