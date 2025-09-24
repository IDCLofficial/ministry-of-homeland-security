const XLSX = require("xlsx"); // load the library
const fs = require("fs");

// 1. Load the Excel file (correct path)
const workbook = XLSX.readFile("data/Ez-mbaise.xlsx");

// 2. Pick the first sheet
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// 3. Convert sheet → JSON
const data = XLSX.utils.sheet_to_json(sheet);

// 4. Save JSON into /public/data
fs.writeFileSync("data/Ez.json", JSON.stringify(data, null, 2));

console.log("✅ Ez.json created at data/Ez.json");
