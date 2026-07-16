import fs from "fs";
import { execSync } from "child_process";

const path = "src/App.jsx";
let src = fs.readFileSync(path, "utf8");

// Pattern: property ending with string/url then orphan `],` before closing object
// e.g. gumroadUrl: "...",\n    ],\n  },
src = src.replace(/(:\s*"[^"]*",)\n    \],\n  \},/g, "$1\n  },");

// Missing commas after arrays before next property
src = src.replace(/(\n    \])\n(    [a-zA-Z]+:)/g, "$1,\n$2");

// Missing commas between product objects
src = src.replace(/(\n  \})\n(  \{)/g, "$1,\n$2");

fs.writeFileSync(path, src);

try {
  execSync("npx eslint src/App.jsx", { stdio: "inherit" });
  console.log("lint ok");
} catch (e) {
  // print context around error line if possible
  const out = String(e.stdout || e.message || e);
  const m = out.match(/(\d+):(\d+)\s+error/);
  if (m) {
    const line = Number(m[1]);
    const lines = fs.readFileSync(path, "utf8").split(/\n/);
    console.log("--- context ---");
    console.log(lines.slice(Math.max(0, line - 6), line + 5).map((l, i) => `${line - 5 + i}: ${l}`).join("\n"));
  }
  process.exit(1);
}
