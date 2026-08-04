import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const SCRIPTS_SOURCE =
  process.env.SCRIPTS_SOURCE
  || "C:\\Users\\bankr\\OneDrive\\Desktop\\ESX\\txData\\ESXLegacy_643A43.base\\resources\\[scripts]";

function listBmtbResources(root) {
  if (!fs.existsSync(root)) {
    return null;
  }

  const entries = fs.readdirSync(root, { withFileTypes: true });
  const resources = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("bmtb_") || name.startsWith("[bmtb")) {
      resources.push(name);
      continue;
    }
    if (name.startsWith("[")) {
      const bundlePath = path.join(root, name);
      for (const sub of fs.readdirSync(bundlePath, { withFileTypes: true })) {
        if (sub.isDirectory() && sub.name.startsWith("bmtb")) {
          resources.push(`${name}/${sub.name}`);
        }
      }
    }
  }

  return resources.sort();
}

console.log("SCRIPTS_SOURCE:", SCRIPTS_SOURCE);

const resources = listBmtbResources(SCRIPTS_SOURCE);
if (!resources) {
  console.error("ERROR: FiveM scripts folder not found:");
  console.error(" ", SCRIPTS_SOURCE);
  process.exit(1);
}

console.log(`Found ${resources.length} BMTB resource folders.`);
resources.forEach((name) => console.log(" -", name));

console.log("\nApplying website docs from scripts/docs-data.mjs ...");
execSync("node scripts/patch-docs.mjs", { cwd: repoRoot, stdio: "inherit" });

console.log("\nDocs sync complete.");
