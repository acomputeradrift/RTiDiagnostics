export function loadAudioZoneList(sheets) {
    console.log(`Loading data from sheet: Audio Zone List`);
    if (!sheets["Audio Zone List"]) {
        console.log("⚠️  Audio Zone List Sheet not Found");
        return {}; // Return empty object if missing
    }

    const rows = xlsx.utils.sheet_to_json(sheets, { raw: false });
    const audioZoneInputMap = {};  // Maps Input Index -> Input Name
    const audioZoneOutputMap = {}; // Maps Output Index -> Output Name

    sheets["Audio Zone List"].forEach(row => {
        const inputIndex = row['Audio Zone Input Index']?.trim();
        const inputName = row['Audio Zone Input Name']?.trim()  || "(Missing Audio Input Name)";
        const outputIndex = row['Audio Zone Output Index']?.trim();
        const outputName = row['Audio Zone Output Name']?.trim() || "(Missing Audio Output Name)";

        // Store Input Name
        if (inputIndex) {
            audioZoneInputMap[inputIndex] = inputName;
        }

        // Store Output Name
        if (outputIndex) {
            audioZoneOutputMap[outputIndex] = outputName;
        }
    });
    console.log("✅ Audio Zone List loaded.");
    return { inputMap: audioZoneInputMap, outputMap: audioZoneOutputMap };
}
