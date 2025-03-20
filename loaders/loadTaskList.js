export function loadTaskList() {
    console.log(`Loading data from sheet: Task List`);
    if (!sheets["Task List"]) {
        console.log("⚠️  Task List Sheet not Found");
        return {}; // Return empty object if missing
    }
    const taskMap = {};
    sheets["Task List"].forEach(row => {
        let taskIndex = row['Task Index']?.trim();
        let taskName = row['Task Name']?.trim();
        // Ensure required fields have default values if missing
        if (!taskName) taskName = "(Missing Mapped Task Name)";
        if (taskIndex) {
            taskMap[taskIndex] = taskName;
        }
    });
    console.log("✅ Task List loaded.");
    return taskMap;
}