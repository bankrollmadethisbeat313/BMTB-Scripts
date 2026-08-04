import fs from "fs";

const source = process.env.SCRIPTS_SOURCE;
if (!source) {
  console.error("ERROR: SCRIPTS_SOURCE is not set.");
  process.exit(1);
}

if (!fs.existsSync(source)) {
  console.error("ERROR: FiveM scripts folder not found:");
  console.error(" ", source);
  process.exit(1);
}

console.log("Scripts folder OK");
