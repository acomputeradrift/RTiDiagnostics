export function loadPageList(sheets) {
console.log(`Loading data from sheet: Page List`);
    if (!sheets["Page List"]) {
        console.log("⚠️  Page List Sheet not Found");
        return {}; // Return empty object if missing
    }
    const pageMap = {};
    sheets["Page List"].forEach(row => {
        const pageIndex = row['Page Index']?.trim(); 
        let pageName = row['Page Name']?.trim();
        if (!pageName) pageName = "(Missing Mapped Page Name)";
        if (pageIndex) {
            pageMap[pageIndex] = pageName;
        }
    });
    console.log("✅ Page List loaded.");
    return pageMap;
}