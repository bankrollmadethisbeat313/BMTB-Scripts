import fs from "fs";
import { execSync } from "child_process";
import { docs } from "./docs-data.mjs";

const path = "src/App.jsx";
let src = fs.readFileSync(path, "utf8");

function formatStringArray(arr) {
  if (!arr.length) return "[]";
  return (
    "[\n" +
    arr.map((item) => `      ${JSON.stringify(item)},`).join("\n") +
    "\n    ]"
  );
}

function formatObjectArray(arr) {
  if (!arr.length) return "[]";
  const lines = arr.map((obj) => {
    const parts = Object.entries(obj)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
    return `      { ${parts.join(", ")} },`;
  });
  return "[\n" + lines.join("\n") + "\n    ]";
}

function isObjectArray(value) {
  return (
    Array.isArray(value)
    && value.length > 0
    && typeof value[0] === "object"
    && value[0] !== null
    && !Array.isArray(value[0])
  );
}

function findMatching(text, openIdx, openCh, closeCh) {
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i];
    if (ch === openCh) depth++;
    else if (ch === closeCh) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findProductBlock(text, slug) {
  const needle = `slug: "${slug}"`;
  const slugIdx = text.indexOf(needle);
  if (slugIdx === -1) return null;
  const objStart = text.lastIndexOf("{", slugIdx);
  const objEnd = findMatching(text, objStart, "{", "}");
  if (objEnd === -1) return null;
  return { objStart, objEnd: objEnd + 1 };
}

function upsertArrayField(block, key, value) {
  const keyRe = new RegExp(`(\\n    ${key}:\\s*)`);
  const match = keyRe.exec(block);
  const rendered = isObjectArray(value) ? formatObjectArray(value) : formatStringArray(value);

  if (match) {
    const valueStart = match.index + match[0].length;
    const first = block[valueStart];
    let valueEnd;
    if (first === "[") {
      valueEnd = findMatching(block, valueStart, "[", "]") + 1;
    } else if (first === "{") {
      valueEnd = findMatching(block, valueStart, "{", "}") + 1;
    } else {
      valueEnd = block.indexOf("\n", valueStart);
    }
    return block.slice(0, match.index) + `\n    ${key}: ${rendered}` + block.slice(valueEnd);
  }

  const closeIdx = block.lastIndexOf("}");
  let before = block.slice(0, closeIdx).replace(/\s+$/, "");
  if (!before.endsWith(",")) before += ",";
  return `${before}\n    ${key}: ${rendered},\n  }`;
}

let updated = 0;
for (const [slug, fields] of Object.entries(docs)) {
  const loc = findProductBlock(src, slug);
  if (!loc) {
    console.log("SKIP", slug);
    continue;
  }
  let block = src.slice(loc.objStart, loc.objEnd);
  for (const [key, value] of Object.entries(fields)) {
    block = upsertArrayField(block, key, value);
  }
  block = block.replace(/,(\s*),+/g, ",$1");
  block = block.replace(/,(\s*)\}/, "$1}");
  src = src.slice(0, loc.objStart) + block + src.slice(loc.objEnd);
  updated++;
  console.log("OK", slug);
}

fs.writeFileSync(path, src);
console.log("updated", updated, "of", Object.keys(docs).length);

try {
  execSync("npx eslint src/App.jsx", { stdio: "inherit" });
  console.log("lint ok");
} catch {
  process.exit(1);
}
