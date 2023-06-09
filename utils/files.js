import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const librairyPath = join(__dirname, "..", "data", "librairy.json");

function writeData(content) {
  try {
    writeFileSync(librairyPath, JSON.stringify(content));
  } catch (err) {
    console.error("Error writing file : ", err.message);
  }
}

function readData() {
  try {
    const books = readFileSync(librairyPath, "utf-8");

    return JSON.parse(books);
  } catch (err) {
    console.error("Error reading file : ", err.message);
  }
}

export { writeData };
export { readData };
