import fs from "fs";

const src = fs.readFileSync("src/App.jsx", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
console.log("count", slugs.length);
const fields = ["acePermissions", "requirements", "installSteps", "notes", "updateNotes"];
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
  console.log(slug, has);
}
