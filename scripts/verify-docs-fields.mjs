import fs from "fs";

const src = fs.readFileSync("src/App.jsx", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const fields = [
  "acePermissions",
  "requirements",
  "installSteps",
  "adminGuide",
  "playerCommands",
  "adminCommands",
  "notes",
  "updateNotes",
];

console.log("count", slugs.length);
console.log("fields:", fields.join(", "));
console.log("legend: Y=present .=missing\n");

for (const slug of slugs) {
  const i = src.indexOf(`slug: "${slug}"`);
  let start = src.lastIndexOf("{", i);
  let depth = 0;
  let end = -1;
  for (let j = start; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") {
      depth--;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  const block = src.slice(start, end + 1);
  const has = fields.map((f) => (block.includes(`${f}:`) ? "Y" : ".")).join("");
  console.log(slug.padEnd(28), has);
}

const missing = slugs.filter((slug) => {
  const i = src.indexOf(`slug: "${slug}"`);
  let start = src.lastIndexOf("{", i);
  let depth = 0;
  let end = -1;
  for (let j = start; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") {
      depth--;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  const block = src.slice(start, end + 1);
  return fields.some((f) => !block.includes(`${f}:`));
});

if (missing.length) {
  console.log("\nmissing fields:", missing.join(", "));
  process.exitCode = 1;
} else {
  console.log("\nall products have full doc fields");
}
